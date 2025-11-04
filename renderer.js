const { ipcRenderer } = require('electron');

// Éléments DOM
const closeBtn = document.getElementById('closeBtn');
const minimizeBtn = document.getElementById('minimizeBtn');
const launchBtn = document.getElementById('launchBtn');
const microsoftBtn = document.getElementById('microsoftBtn');
const offlineBtn = document.getElementById('offlineBtn');
const backBtn = document.getElementById('backBtn');
const logoutBtn = document.getElementById('logoutBtn');
const usernameInput = document.getElementById('username');
const ramSelect = document.getElementById('ramSelect');
const progressContainer = document.getElementById('progressContainer');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const errorMessage = document.getElementById('errorMessage');

const authSection = document.getElementById('authSection');
const offlineSection = document.getElementById('offlineSection');
const userSection = document.getElementById('userSection');

// Données utilisateur
let currentUser = null;
let isOfflineMode = false;

// Vérifier l'authentification au démarrage
ipcRenderer.send('check-auth');

// ===== SYSTÈME DE MISE À JOUR =====
const updateNotification = document.getElementById('updateNotification');
const updateTitle = document.getElementById('updateTitle');
const updateMessage = document.getElementById('updateMessage');
const updateInstallBtn = document.getElementById('updateInstallBtn');
const updateProgressBar = document.getElementById('updateProgressBar');
const updateProgressFill = document.getElementById('updateProgressFill');

// Mise à jour disponible
ipcRenderer.on('update-available', (event, data) => {
  updateNotification.style.display = 'block';
  updateTitle.textContent = `Mise à jour ${data.version} disponible`;
  updateMessage.textContent = 'Téléchargement en cours...';
  updateProgressBar.style.display = 'block';
});

// Progression du téléchargement
ipcRenderer.on('update-progress', (event, data) => {
  updateProgressFill.style.width = data.percent + '%';
  updateMessage.textContent = `Téléchargement: ${data.downloaded}MB / ${data.total}MB (${data.percent}%)`;
});

// Mise à jour téléchargée
ipcRenderer.on('update-downloaded', (event, data) => {
  updateMessage.textContent = `Version ${data.version} prête à installer !`;
  updateProgressBar.style.display = 'none';
  updateInstallBtn.style.display = 'block';
});

// Bouton installer
updateInstallBtn.addEventListener('click', () => {
  ipcRenderer.send('install-update');
});

// Gestion de la fenêtre
closeBtn.addEventListener('click', () => {
  ipcRenderer.send('close-app');
});

minimizeBtn.addEventListener('click', () => {
  ipcRenderer.send('minimize-app');
});

// Bouton connexion Microsoft
microsoftBtn.addEventListener('click', () => {
  microsoftBtn.disabled = true;
  microsoftBtn.innerHTML = '<span class="btn-text">CONNEXION EN COURS...</span>';
  ipcRenderer.send('microsoft-login');
});

// Bouton mode offline
offlineBtn.addEventListener('click', () => {
  authSection.style.display = 'none';
  offlineSection.style.display = 'block';
  launchBtn.style.display = 'block';
  isOfflineMode = true;
});

// Bouton retour
backBtn.addEventListener('click', () => {
  authSection.style.display = 'block';
  offlineSection.style.display = 'none';
  launchBtn.style.display = 'none';
  isOfflineMode = false;
});

// Bouton déconnexion
logoutBtn.addEventListener('click', () => {
  ipcRenderer.send('logout');
});

// Charger le pseudo sauvegardé
const savedUsername = localStorage.getItem('username');
if (savedUsername) {
  usernameInput.value = savedUsername;
}

// Charger la RAM sauvegardée
const savedRam = localStorage.getItem('ram');
if (savedRam) {
  ramSelect.value = savedRam;
}

// Sauvegarder les paramètres
usernameInput.addEventListener('change', () => {
  localStorage.setItem('username', usernameInput.value);
});

ramSelect.addEventListener('change', () => {
  localStorage.setItem('ram', ramSelect.value);
});

// Événements d'authentification
ipcRenderer.on('auth-required', () => {
  authSection.style.display = 'block';
  userSection.style.display = 'none';
  launchBtn.style.display = 'none';
});

ipcRenderer.on('auth-status', (event, data) => {
  const authStatus = document.getElementById('authStatus');
  authStatus.innerHTML = `<p>${data.message}</p>`;
});

ipcRenderer.on('auth-code', (event, data) => {
  const authStatus = document.getElementById('authStatus');
  authStatus.innerHTML = `
    <div style="text-align: center; padding: 20px; background: rgba(217, 70, 239, 0.1); border: 2px solid #d946ef; border-radius: 10px; margin: 20px 0;">
      <p style="margin-bottom: 10px;">Allez sur:</p>
      <p style="font-size: 16px; color: #d946ef; margin-bottom: 15px;"><strong>${data.url}</strong></p>
      <p style="margin-bottom: 10px;">Et entrez le code:</p>
      <p style="font-size: 32px; font-weight: bold; color: #d946ef; letter-spacing: 3px; text-shadow: 0 0 20px rgba(217, 70, 239, 0.8);">${data.code}</p>
      <p style="font-size: 12px; color: #888; margin-top: 15px;">Le navigateur s'est ouvert automatiquement</p>
    </div>
  `;
});

ipcRenderer.on('auth-success', (event, data) => {
  currentUser = data;
  isOfflineMode = false;
  
  // Afficher les infos utilisateur
  authSection.style.display = 'none';
  offlineSection.style.display = 'none';
  userSection.style.display = 'block';
  launchBtn.style.display = 'block';
  
  document.getElementById('userUsername').textContent = data.username;
  document.getElementById('userUuid').textContent = `UUID: ${data.uuid.substr(0, 8)}...`;
  document.getElementById('userAvatar').style.backgroundImage = 
    `url(https://crafatar.com/avatars/${data.uuid}?overlay)`;
  
  microsoftBtn.disabled = false;
  microsoftBtn.innerHTML = '<span class="btn-icon">🎮</span><span class="btn-text">SE CONNECTER AVEC MICROSOFT</span>';
});

ipcRenderer.on('auth-error', (event, error) => {
  showError('Erreur d\'authentification: ' + error);
  microsoftBtn.disabled = false;
  microsoftBtn.innerHTML = '<span class="btn-icon">🎮</span><span class="btn-text">SE CONNECTER AVEC MICROSOFT</span>';
});

ipcRenderer.on('logout-success', () => {
  currentUser = null;
  authSection.style.display = 'block';
  userSection.style.display = 'none';
  offlineSection.style.display = 'none';
  launchBtn.style.display = 'none';
});

// Lancement du jeu
launchBtn.addEventListener('click', async () => {
  let credentials;
  
  if (isOfflineMode) {
    const username = usernameInput.value.trim();
    
    if (!username) {
      showError('Veuillez entrer un pseudo Minecraft');
      return;
    }

    if (username.length < 3 || username.length > 16) {
      showError('Le pseudo doit contenir entre 3 et 16 caractères');
      return;
    }
    
    credentials = {
      username: username,
      ram: ramSelect.value,
      msAuth: false
    };
    
    localStorage.setItem('username', username);
  } else if (currentUser) {
    credentials = {
      username: currentUser.username,
      uuid: currentUser.uuid,
      token: currentUser.token,
      ram: ramSelect.value,
      msAuth: true
    };
  } else {
    showError('Veuillez vous connecter d\'abord');
    return;
  }

  // Désactiver le bouton et afficher la progression
  launchBtn.disabled = true;
  progressContainer.style.display = 'block';
  errorMessage.style.display = 'none';
  
  localStorage.setItem('ram', ramSelect.value);

  // Envoyer la demande de lancement
  ipcRenderer.send('launch-game', credentials);
});

// Gestion des événements de progression
ipcRenderer.on('launch-progress', (event, data) => {
  if (data.type === 'download') {
    const percent = Math.round((data.current / data.total) * 100);
    progressFill.style.width = percent + '%';
    progressText.textContent = `Téléchargement: ${data.task} (${percent}%)`;
  } else {
    progressText.textContent = data.message || 'Préparation...';
  }
});

ipcRenderer.on('launch-log', (event, data) => {
  console.log('Launcher log:', data);
});

ipcRenderer.on('game-started', () => {
  progressFill.style.width = '100%';
  progressText.textContent = 'Jeu lancé ! Bon jeu sur Hexacity !';
  
  // Réactiver le bouton après 3 secondes
  setTimeout(() => {
    resetLauncher();
  }, 3000);
});

ipcRenderer.on('game-closed', (event, code) => {
  console.log('Game closed with code:', code);
  resetLauncher();
});

ipcRenderer.on('launch-error', (event, error) => {
  console.error('Launch error:', error);
  showError('Erreur lors du lancement: ' + error);
  resetLauncher();
});

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
}

function resetLauncher() {
  launchBtn.disabled = false;
  progressContainer.style.display = 'none';
  progressFill.style.width = '0%';
  progressText.textContent = 'Préparation...';
}

// URL de ton site web où tu hébergeras news.json
// Change cette URL par l'adresse de ton site !
const NEWS_URL = 'https://gist.githubusercontent.com/skellofr/4a9b4c0e2d95a34a684b88ca8a10b7c4/raw/news.json'; // ⬅️ Toujours la dernière version

// Charger les actualités depuis Internet
async function loadNewsFromWeb() {
  try {
    const response = await fetch(NEWS_URL);
    if (!response.ok) {
      throw new Error('Impossible de charger les actualités');
    }
    const newsData = await response.json();
    displayNews(newsData);
  } catch (error) {
    console.error('Erreur lors du téléchargement des actualités:', error);
    // Si le téléchargement échoue, charger le fichier local
    loadNewsFromFile();
  }
}

// Charger les actualités depuis le fichier local (backup)
function loadNewsFromFile() {
  try {
    const fs = require('fs');
    const path = require('path');
    const newsFile = path.join(__dirname, 'news.json');
    
    if (fs.existsSync(newsFile)) {
      const newsData = JSON.parse(fs.readFileSync(newsFile, 'utf8'));
      displayNews(newsData);
    } else {
      // Afficher un message par défaut
      document.getElementById('newsList').innerHTML = `
        <div class="news-item">
          <p><strong>🎉 Bienvenue sur Hexacity!</strong></p>
          <p>Rejoignez notre serveur Minecraft 1.21.1</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Erreur lors du chargement des actualités locales:', error);
  }
}

// Afficher les actualités
function displayNews(newsData) {
  const newsList = document.getElementById('newsList');
  
  if (newsData.news && newsData.news.length > 0) {
    newsList.innerHTML = '';
    
    // Afficher les 3 dernières actualités
    newsData.news.slice(0, 3).forEach(item => {
      const newsItem = document.createElement('div');
      newsItem.className = 'news-item';
      if (item.important) {
        newsItem.style.borderLeft = '3px solid #d946ef';
        newsItem.style.paddingLeft = '10px';
      }
      
      newsItem.innerHTML = `
        <p><strong>${item.title}</strong></p>
        <p>${item.content}</p>
        <p style="font-size: 11px; color: #666; margin-top: 5px;">${item.date}</p>
      `;
      
      newsList.appendChild(newsItem);
    });
  }
  
  // Mettre à jour le statut du serveur si disponible
  if (newsData.serverStatus) {
    if (newsData.serverStatus.online !== undefined) {
      const statusDot = document.querySelector('.status-dot');
      const statusText = document.getElementById('serverStatus');
      
      if (newsData.serverStatus.online) {
        statusDot.style.background = '#d946ef';
        statusDot.style.boxShadow = '0 0 15px #d946ef';
        statusText.textContent = 'En ligne';
        
        // Afficher le nombre de joueurs si disponible
        if (newsData.serverStatus.players !== undefined) {
          statusText.textContent = `En ligne (${newsData.serverStatus.players}/${newsData.serverStatus.maxPlayers})`;
        }
      } else {
        statusDot.style.background = '#e74c3c';
        statusDot.style.boxShadow = '0 0 15px #e74c3c';
        statusText.textContent = 'Hors ligne';
      }
    }
  }
}

// Fonction principale pour charger les actualités
function loadNews() {
  // Essayer de charger depuis Internet d'abord
  loadNewsFromWeb();
}

// Vérifier le statut du serveur (simulation)
function checkServerStatus() {
  // Ici tu peux ajouter une vraie vérification du serveur
  // Pour l'instant, on simule un serveur en ligne
  const statusDot = document.querySelector('.status-dot');
  const statusText = document.getElementById('serverStatus');
  
  // Simulation: serveur toujours en ligne
  statusDot.classList.add('online');
  statusText.textContent = 'En ligne';
}

// Charger les actualités au démarrage
loadNews();

// Vérifier le statut au démarrage
checkServerStatus();

// Recharger les actualités toutes les 5 minutes
setInterval(loadNews, 5 * 60 * 1000);

// Vérifier le statut toutes les 30 secondes
setInterval(checkServerStatus, 30000);
