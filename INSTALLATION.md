# 🚀 Guide de Démarrage Rapide - Hexacity Launcher

## Étape 1: Installer Node.js

1. Téléchargez Node.js depuis: https://nodejs.org/
2. Choisissez la version LTS (recommandée)
3. Installez Node.js en suivant l'assistant d'installation
4. Redémarrez votre ordinateur si nécessaire

Pour vérifier l'installation, ouvrez PowerShell et tapez:
```powershell
node --version
npm --version
```

## Étape 2: Installer les dépendances

1. Ouvrez PowerShell
2. Naviguez vers le dossier du launcher:
```powershell
cd "C:\Users\lucas\Desktop\launcher minecraft"
```

3. Installez les dépendances:
```powershell
npm install
```

Cette étape peut prendre quelques minutes.

## Étape 3: Télécharger NeoForge (Optionnel)

Si votre serveur utilise des mods:

1. Allez sur https://neoforged.net/
2. Sélectionnez Minecraft version **1.21.1**
3. Téléchargez NeoForge version **21.1.206** (format Installer)
4. Placez le fichier dans le dossier `forge/`
5. Renommez-le en: `neoforge-21.1.206-installer.jar`

**Note**: Si vous n'avez pas NeoForge, le launcher fonctionnera en mode vanilla.

## Étape 4: Personnaliser (Optionnel)

### Ajouter votre logo:
1. Créez une image PNG de 24x24px pour `assets/logo.png`
2. Créez une image PNG de 256x256px pour `assets/icon.png`

### Modifier l'adresse du serveur:
Éditez `main.js` ligne 44-47:
```javascript
server: {
  host: 'votre-serveur.com',  // Changez ici
  port: '25565'
}
```

## Étape 5: Lancer le launcher

### Mode développement (pour tester):
```powershell
npm start
```

### Compiler en exécutable:
```powershell
npm run build
```

L'exécutable sera créé dans le dossier `dist/`.

## Étape 6: Utiliser le launcher

1. Lancez le launcher
2. Entrez votre pseudo Minecraft
3. Choisissez la RAM allouée
4. Cliquez sur "LANCER LE JEU"
5. Attendez le téléchargement et l'installation
6. Jouez sur Hexacity! 🎮

## ⚠️ Résolution des problèmes

### "npm n'est pas reconnu"
- Réinstallez Node.js
- Redémarrez votre ordinateur
- Vérifiez que Node.js est dans le PATH

### Erreur lors de npm install
- Exécutez PowerShell en tant qu'administrateur
- Essayez: `npm install --force`

### Le launcher ne se lance pas
- Vérifiez que toutes les dépendances sont installées
- Essayez de supprimer le dossier `node_modules` et réinstaller

### Erreur de téléchargement du jeu
- Vérifiez votre connexion internet
- Désactivez temporairement l'antivirus
- Vérifiez les permissions du dossier

## 📞 Support

Pour toute question, contactez l'administration de Hexacity.

## 🎨 Fonctionnalités

✅ Interface moderne et personnalisée
✅ Installation automatique de Minecraft
✅ Support NeoForge 21.1.206
✅ Gestion de la RAM
✅ Sauvegarde des préférences
✅ Barre de progression
✅ Indicateur de statut du serveur
✅ Section actualités

Bon jeu sur Hexacity! 🎮✨
