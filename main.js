const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const { Client, Authenticator } = require('minecraft-launcher-core');
const { Authflow, Titles } = require('prismarine-auth');
const { autoUpdater } = require('electron-updater');
const fs = require('fs');

let mainWindow;

// Configuration de l'auto-updater
autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 500,
    resizable: true,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'assets', 'icon.png')
  });

  mainWindow.loadFile('index.html');
  
  // Décommenter pour le dev
  // mainWindow.webContents.openDevTools();
  
  // Vérifier les mises à jour au démarrage
  if (!app.isPackaged) {
    console.log('Mode développement - pas de vérification de mise à jour');
  } else {
    setTimeout(() => {
      autoUpdater.checkForUpdates();
    }, 3000);
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// ===== SYSTÈME DE MISE À JOUR AUTOMATIQUE =====

// Quand une mise à jour est disponible
autoUpdater.on('update-available', (info) => {
  console.log('Mise à jour disponible:', info.version);
  mainWindow.webContents.send('update-available', {
    version: info.version,
    releaseDate: info.releaseDate
  });
});

// Quand aucune mise à jour n'est disponible
autoUpdater.on('update-not-available', (info) => {
  console.log('Launcher à jour');
});

// Progression du téléchargement
autoUpdater.on('download-progress', (progressObj) => {
  console.log(`Téléchargement: ${Math.round(progressObj.percent)}%`);
  mainWindow.webContents.send('update-progress', {
    percent: Math.round(progressObj.percent),
    downloaded: Math.round(progressObj.transferred / 1024 / 1024),
    total: Math.round(progressObj.total / 1024 / 1024)
  });
});

// Quand la mise à jour est téléchargée
autoUpdater.on('update-downloaded', (info) => {
  console.log('Mise à jour téléchargée');
  mainWindow.webContents.send('update-downloaded', {
    version: info.version
  });
});

// Gestion des erreurs
autoUpdater.on('error', (error) => {
  console.error('Erreur de mise à jour:', error);
});

// Installer et redémarrer
ipcMain.on('install-update', () => {
  autoUpdater.quitAndInstall(false, true);
});

// Authentification Microsoft
ipcMain.on('microsoft-login', async (event) => {
  try {
    event.sender.send('auth-status', { 
      status: 'starting', 
      message: 'Initialisation de l\'authentification...' 
    });
    
    const cacheDir = path.join(app.getPath('userData'), 'auth-cache');
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
    
    // Utiliser le flow "sisu" qui fonctionne mieux avec les launchers
    const authflow = new Authflow('hexacity-launcher', cacheDir, {
      authTitle: Titles.MinecraftJava,
      flow: 'sisu',
      deviceType: 'Win32'
    }, (data) => {
      // Callback appelé avec le code d'appareil
      if (data.verification_uri && data.user_code) {
        event.sender.send('auth-status', { 
          status: 'code-ready', 
          message: `Allez sur ${data.verification_uri} et entrez le code` 
        });
        
        shell.openExternal(data.verification_uri);
        
        event.sender.send('auth-code', { 
          code: data.user_code, 
          url: data.verification_uri 
        });
      }
    });
    
    event.sender.send('auth-status', { 
      status: 'waiting', 
      message: 'En attente de connexion Microsoft...' 
    });
    
    // Obtenir le token Minecraft
    const mcProfile = await authflow.getMinecraftJavaToken({ fetchProfile: true });
    
    if (mcProfile && mcProfile.profile) {
      // Sauvegarder les données d'authentification
      const authData = {
        accessToken: mcProfile.token,
        profile: mcProfile.profile,
        expiresAt: Date.now() + (3600 * 1000) // 1 heure
      };
      
      const authFile = path.join(app.getPath('userData'), 'auth.json');
      fs.writeFileSync(authFile, JSON.stringify(authData, null, 2));
      
      event.sender.send('auth-success', {
        username: mcProfile.profile.name,
        uuid: mcProfile.profile.id,
        token: mcProfile.token
      });
    }
  } catch (error) {
    console.error('Auth error:', error);
    event.sender.send('auth-error', error.message || 'Erreur d\'authentification');
  }
});

// Vérifier si l'utilisateur est déjà connecté
ipcMain.on('check-auth', async (event) => {
  try {
    const authFile = path.join(app.getPath('userData'), 'auth.json');
    const cacheDir = path.join(app.getPath('userData'), 'auth-cache');
    
    if (fs.existsSync(authFile)) {
      const authData = JSON.parse(fs.readFileSync(authFile, 'utf8'));
      
      // Vérifier si le token n'est pas expiré
      if (authData.expiresAt && authData.expiresAt > Date.now()) {
        event.sender.send('auth-success', {
          username: authData.profile.name,
          uuid: authData.profile.id,
          token: authData.accessToken
        });
        return;
      }
      
      // Si le token est expiré, essayer de le renouveler avec le cache
      if (fs.existsSync(cacheDir)) {
        try {
          const authflow = new Authflow('hexacity-launcher', cacheDir, {
            authTitle: Titles.MinecraftJava,
            flow: 'sisu'
          });
          
          const mcProfile = await authflow.getMinecraftJavaToken({ fetchProfile: true });
          
          if (mcProfile && mcProfile.profile) {
            const newAuthData = {
              accessToken: mcProfile.token,
              profile: mcProfile.profile,
              expiresAt: Date.now() + (3600 * 1000)
            };
            
            fs.writeFileSync(authFile, JSON.stringify(newAuthData, null, 2));
            
            event.sender.send('auth-success', {
              username: mcProfile.profile.name,
              uuid: mcProfile.profile.id,
              token: mcProfile.token
            });
            return;
          }
        } catch (refreshError) {
          console.log('Token refresh failed:', refreshError);
        }
      }
    }
    
    event.sender.send('auth-required');
  } catch (error) {
    console.error('Check auth error:', error);
    event.sender.send('auth-required');
  }
});

// Déconnexion
ipcMain.on('logout', (event) => {
  try {
    const authFile = path.join(app.getPath('userData'), 'auth.json');
    if (fs.existsSync(authFile)) {
      fs.unlinkSync(authFile);
    }
    event.sender.send('logout-success');
  } catch (error) {
    console.error('Logout error:', error);
  }
});

// Gestion du lancement du jeu
ipcMain.on('launch-game', async (event, credentials) => {
  try {
    const launcher = new Client();
    
    // Utiliser l'authentification Microsoft
    let authorization;
    if (credentials.msAuth) {
      authorization = {
        access_token: credentials.token,
        client_token: credentials.uuid,
        uuid: credentials.uuid,
        name: credentials.username,
        user_properties: JSON.stringify({})
      };
    } else {
      // Fallback sur authentification offline (cracked)
      authorization = Authenticator.getAuth(credentials.username);
    }
    
    const opts = {
      clientPackage: null,
      authorization: authorization,
      root: path.join(app.getPath('userData'), '.minecraft'),
      version: {
        number: '1.21.1',
        type: 'release'
      },
      forge: path.join(__dirname, 'forge', 'neoforge-21.1.206-installer.jar'),
      memory: {
        max: credentials.ram || '4G',
        min: '2G'
      },
      server: {
        host: 'hexacity.server.net',
        port: '25565'
      }
    };

    // Événements de progression
    launcher.on('debug', (e) => event.sender.send('launch-progress', e));
    launcher.on('data', (e) => event.sender.send('launch-log', e));
    launcher.on('progress', (e) => {
      event.sender.send('launch-progress', {
        type: 'download',
        task: e.type,
        total: e.total,
        current: e.current
      });
    });
    launcher.on('close', (code) => {
      event.sender.send('game-closed', code);
    });

    await launcher.launch(opts);
    event.sender.send('game-started');
  } catch (error) {
    event.sender.send('launch-error', error.message);
  }
});

// Gestion de la fermeture de la fenêtre
ipcMain.on('close-app', () => {
  app.quit();
});

ipcMain.on('minimize-app', () => {
  mainWindow.minimize();
});
