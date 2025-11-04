# 🎮 Hexacity Launcher

Launcher Minecraft professionnel et personnalisé pour le serveur Hexacity.

![Version](https://img.shields.io/badge/version-1.0.0-purple)
![Minecraft](https://img.shields.io/badge/Minecraft-1.21.1-green)
![NeoForge](https://img.shields.io/badge/NeoForge-21.1.206-orange)

## ✨ Caractéristiques

### 🎯 Fonctionnalités principales
- **🔐 Authentification Microsoft** - Connexion sécurisée avec compte officiel
- **🎮 Mode Cracked** - Support des comptes non-premium
- **🔄 Mise à jour automatique** - Le launcher se met à jour tout seul !
- **📰 Actualités dynamiques** - Chargées depuis GitHub Gist
- **💜 Interface moderne** - Thème violet cyberpunk personnalisé
- **📏 Redimensionnable** - Ajuste la taille comme tu veux

### ⚙️ Technique
- **Version Minecraft**: 1.21.1
- **NeoForge**: 21.1.206
- **Gestion automatique de la RAM**
- **Installation automatique** de Minecraft et NeoForge
- **Sauvegarde des préférences**

## 📥 Installation

### Pour les utilisateurs

1. **Télécharge** la dernière version depuis [Releases](https://github.com/skellofr/hexacity-launcher/releases)
2. **Exécute** `Hexacity-Launcher-Setup.exe`
3. **Lance** le launcher depuis le bureau ou le menu démarrer
4. **Profite** ! 🎮

### Pour les développeurs

Voir [INSTALLATION.md](INSTALLATION.md) pour les instructions détaillées.

```bash
npm install
npm start
```

## 🎯 Utilisation

### 🔐 Authentification Microsoft
1. Clique sur "Se connecter avec Microsoft"
2. Va sur **https://microsoft.com/link** sur ton navigateur
3. Entre le **code affiché** dans le launcher
4. Connecte-toi avec ton compte Microsoft
5. Autorise l'application
6. Profit ! Tu es connecté ✅

### 🎮 Mode Cracked (non-premium)
1. Sélectionne l'onglet **"Mode Offline"**
2. Entre ton pseudo Minecraft
3. Clique sur "Connexion Offline"
4. Lance le jeu normalement

### ⚙️ Configuration
- **RAM** : Ajuste entre 2GB et 12GB selon ton PC
- **Profil** : Ton pseudo et avatar sont sauvegardés
- **Actualités** : Consulte les news du serveur

## 📁 Structure du projet

```
launcher-minecraft/
├── main.js           # Processus principal Electron
├── renderer.js       # Logique de l'interface
├── index.html        # Interface utilisateur
├── styles.css        # Styles personnalisés
├── news.json         # Actualités (backup local)
├── forge/            # Installeur NeoForge (à télécharger)
└── docs/
    ├── INSTALLATION.md         # Guide installation développeur
    ├── ACTUALITES.md           # Gestion des actualités
    ├── HEBERGEMENT-NEWS.md     # Héberger les news
    ├── GITHUB-GIST-GUIDE.md    # Utiliser GitHub Gist
    └── MISE-A-JOUR-GUIDE.md    # Publier des mises à jour
```

## 🛠️ Développement

### Commandes disponibles
```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm start

# Compiler pour Windows
npm run build
```

### 🔧 Technologies utilisées
- **Electron** ^28.0.0 - Framework desktop
- **minecraft-launcher-core** - Lancement de Minecraft
- **prismarine-auth** - Authentification Microsoft
- **electron-updater** - Mises à jour automatiques
- **electron-builder** - Compilation

## 📰 Gestion des actualités

Les actualités sont hébergées sur **GitHub Gist** et chargées automatiquement au démarrage du launcher.

**URL actuelle** : https://gist.github.com/skellofr/4a9b4c0e2d95a34a684b88ca8a10b7c4

Pour mettre à jour les news :
1. Va sur ton Gist
2. Modifie le fichier `news.json`
3. Clique sur "Update public gist"
4. Les utilisateurs verront les nouvelles actualités au prochain démarrage ! 🚀

📖 **Guide complet** : [ACTUALITES.md](ACTUALITES.md) et [GITHUB-GIST-GUIDE.md](GITHUB-GIST-GUIDE.md)

## 🔄 Publier une mise à jour

Le launcher se met à jour **automatiquement** ! Les utilisateurs reçoivent les nouvelles versions sans rien faire.

### Pour publier une mise à jour :
1. Modifie le code
2. Change la version dans `package.json` (ex: 1.0.1)
3. Compile : `npm run build`
4. Crée une **Release** sur GitHub avec :
   - `Hexacity-Launcher-Setup-1.0.1.exe`
   - `latest.yml`
5. Les utilisateurs reçoivent la mise à jour automatiquement ! ✨

📖 **Guide complet** : [MISE-A-JOUR-GUIDE.md](MISE-A-JOUR-GUIDE.md)

## 🚀 Déploiement

### Prérequis
1. Créer le repository GitHub : `github.com/skellofr/hexacity-launcher`
2. Télécharger NeoForge 21.1.206 installer dans `forge/`
3. Compiler le launcher : `npm run build`
4. Créer la première Release (v1.0.0) sur GitHub

### Première Release
1. Va sur GitHub → Releases → "Create a new release"
2. Tag : `v1.0.0`
3. Upload les fichiers depuis `dist/` :
   - `Hexacity-Launcher-Setup-1.0.0.exe`
   - `latest.yml`
4. Publie la release
5. Les utilisateurs peuvent maintenant télécharger le launcher ! 🎉

## 📝 Configuration serveur

**Serveur Hexacity**
- IP : `hexacity.server.net:25565`
- Version : Minecraft 1.21.1
- Mods : NeoForge 21.1.206

Pour changer ces paramètres, modifie `renderer.js` :
```javascript
const SERVER_IP = 'hexacity.server.net';
const SERVER_PORT = 25565;
const MINECRAFT_VERSION = '1.21.1';
const NEOFORGE_VERSION = '21.1.206';
```

## ❓ FAQ

### Le launcher ne se lance pas
- Vérifie que Java est installé
- Réinstalle le launcher
- Vérifie l'antivirus

### L'authentification Microsoft ne fonctionne pas
- Vérifie ta connexion internet
- Utilise le mode offline en attendant
- Essaie de te déconnecter puis reconnecter

### Le jeu ne se lance pas
- Vérifie que NeoForge est bien installé dans `forge/`
- Augmente la RAM allouée
- Vérifie les logs dans le launcher

### Les actualités ne se chargent pas
- Le launcher utilise le backup local automatiquement
- Vérifie que l'URL du Gist est correcte
- Les news se rechargeront au prochain démarrage

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésite pas à :
- 🐛 Reporter des bugs
- 💡 Proposer des améliorations
- 🔧 Soumettre des pull requests

## 📄 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

**skellofr**
- GitHub: [@skellofr](https://github.com/skellofr)
- Serveur Hexacity: `hexacity.server.net`

## 🌟 Remerciements

- **minecraft-launcher-core** pour le lancement de Minecraft
- **prismarine-auth** pour l'authentification Microsoft
- **electron-updater** pour les mises à jour automatiques
- La communauté Hexacity ! 💜

---

💜 **Fait avec passion pour la communauté Hexacity** 💜
