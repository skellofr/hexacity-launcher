# 📋 TODO - Déploiement du Launcher Hexacity

## ✅ Terminé

- ✅ Launcher complet avec interface moderne
- ✅ Thème violet/magenta personnalisé
- ✅ Authentification Microsoft (device code)
- ✅ Mode cracked/offline
- ✅ Système d'actualités avec GitHub Gist
- ✅ Fenêtre redimensionnable
- ✅ Système de mise à jour automatique
- ✅ Documentation complète

---

## 🚀 Étapes à suivre pour déployer

### 1️⃣ Créer le repository GitHub (URGENT)

**Pourquoi ?** Le système de mise à jour automatique a besoin du repository pour fonctionner.

**Actions :**
1. Va sur https://github.com/new
2. Nom du repository : `hexacity-launcher`
3. Description : "Launcher Minecraft personnalisé pour Hexacity"
4. Public ou Private selon ton choix
5. Crée le repository
6. **NE PAS** initialiser avec README (on a déjà tout ici)

**Commandes à exécuter dans le dossier du launcher :**
```bash
git init
git add .
git commit -m "Initial commit - Hexacity Launcher v1.0.0"
git branch -M main
git remote add origin https://github.com/skellofr/hexacity-launcher.git
git push -u origin main
```

✅ **Résultat attendu :** Ton code est sur GitHub

---

### 2️⃣ Télécharger NeoForge (IMPORTANT)

**Pourquoi ?** Nécessaire pour lancer Minecraft avec les mods.

**Actions :**
1. Va sur https://neoforged.net/
2. Télécharge **NeoForge 21.1.206** pour Minecraft 1.21.1
3. Renomme le fichier en : `neoforge-21.1.206-installer.jar`
4. Place-le dans le dossier `forge/` du launcher

**Structure attendue :**
```
launcher-minecraft/
├── forge/
│   └── neoforge-21.1.206-installer.jar
├── main.js
├── renderer.js
└── ...
```

✅ **Résultat attendu :** NeoForge est prêt à être installé automatiquement

---

### 3️⃣ Tester le launcher en développement

**Pourquoi ?** Vérifier que tout fonctionne avant de compiler.

**Commandes :**
```bash
npm start
```

**Tests à faire :**
- ✅ Le launcher s'ouvre correctement
- ✅ L'interface est en violet
- ✅ Les actualités se chargent (depuis GitHub Gist)
- ✅ L'authentification Microsoft fonctionne
- ✅ Le mode offline fonctionne
- ✅ La fenêtre est redimensionnable

**Note :** Le système de mise à jour ne fonctionnera PAS en mode développement (normal). Il fonctionnera uniquement après compilation.

✅ **Résultat attendu :** Tout fonctionne en mode dev

---

### 4️⃣ Compiler la première version

**Pourquoi ?** Créer l'exécutable Windows pour distribution.

**Commandes :**
```bash
npm run build
```

**Temps estimé :** 3-10 minutes selon ton PC

**Fichiers créés dans `dist/` :**
- `Hexacity-Launcher-Setup-1.0.0.exe` (installateur)
- `latest.yml` (fichier de configuration pour les mises à jour)

✅ **Résultat attendu :** Fichiers dans le dossier `dist/`

---

### 5️⃣ Créer la première Release sur GitHub

**Pourquoi ?** Permettre aux utilisateurs de télécharger le launcher ET activer les mises à jour automatiques.

**Actions :**
1. Va sur ton repository : https://github.com/skellofr/hexacity-launcher
2. Clique sur **"Releases"** (à droite)
3. Clique sur **"Create a new release"**

**Paramètres de la release :**
- **Tag version :** `v1.0.0`
- **Release title :** `Hexacity Launcher v1.0.0 - Première version`
- **Description :** 
  ```markdown
  ## 🎮 Première version du Hexacity Launcher !
  
  ### ✨ Fonctionnalités
  - 🔐 Authentification Microsoft
  - 🎮 Mode cracked/offline
  - 🔄 Mises à jour automatiques
  - 📰 Actualités dynamiques
  - 💜 Interface moderne violet/magenta
  
  ### 📥 Installation
  1. Télécharge `Hexacity-Launcher-Setup-1.0.0.exe`
  2. Exécute le fichier
  3. Lance le launcher
  4. Profite ! 🎉
  
  ### 📝 Configuration requise
  - Windows 10/11
  - Java 17 ou supérieur
  - 4GB RAM minimum
  ```

**Fichiers à ajouter :**
- Glisse-dépose `Hexacity-Launcher-Setup-1.0.0.exe` depuis `dist/`
- Glisse-dépose `latest.yml` depuis `dist/`

**Important :** ⚠️ **Les DEUX fichiers sont obligatoires** pour que les mises à jour fonctionnent !

5. Clique sur **"Publish release"**

✅ **Résultat attendu :** Les utilisateurs peuvent télécharger le launcher depuis GitHub

---

### 6️⃣ Tester les mises à jour automatiques

**Pourquoi ?** Vérifier que le système de mise à jour fonctionne.

**Actions :**
1. **Installe** le launcher depuis le Setup.exe que tu viens de créer
2. **Lance** le launcher installé
3. Le launcher vérifie automatiquement les mises à jour au démarrage

**Pour tester une vraie mise à jour :**
1. Modifie quelque chose dans le code (par exemple, change une couleur)
2. Change la version dans `package.json` : `1.0.0` → `1.0.1`
3. Compile : `npm run build`
4. Crée une nouvelle release sur GitHub : `v1.0.1`
5. Ajoute les nouveaux fichiers : `Hexacity-Launcher-Setup-1.0.1.exe` et `latest.yml`
6. Ouvre le launcher déjà installé
7. **Une notification doit apparaître** : "Mise à jour disponible !"
8. Clique sur "Installer et redémarrer"
9. Le launcher se ferme, s'installe et redémarre automatiquement

✅ **Résultat attendu :** Le launcher se met à jour tout seul !

---

### 7️⃣ Distribuer le launcher

**Méthodes de distribution :**

#### Option 1 : GitHub Releases (Recommandé)
- Envoie le lien : https://github.com/skellofr/hexacity-launcher/releases
- Les utilisateurs téléchargent le Setup.exe
- **Avantages :** Gratuit, professionnel, mises à jour automatiques

#### Option 2 : Discord
- Upload le Setup.exe sur ton Discord
- Partage le lien de téléchargement
- **Inconvénient :** Pas de mises à jour automatiques si tu changes le lien

#### Option 3 : Site web
- Héberge le Setup.exe sur ton site
- Ajoute un bouton de téléchargement
- **Inconvénient :** Tu dois uploader manuellement les nouvelles versions

**Recommandation :** Utilise GitHub Releases, c'est la meilleure solution !

✅ **Résultat attendu :** Les joueurs peuvent télécharger et utiliser le launcher

---

## 📰 Gérer les actualités

**Pour mettre à jour les news :**
1. Va sur ton Gist : https://gist.github.com/skellofr/4a9b4c0e2d95a34a684b88ca8a10b7c4
2. Clique sur **"Edit"**
3. Modifie le fichier `news.json` :
   ```json
   {
     "news": [
       {
         "id": 1,
         "title": "Nouvelle actualité",
         "content": "Description de l'actualité",
         "date": "2024-01-15",
         "important": false
       }
     ],
     "serverStatus": {
       "online": true,
       "players": 42,
       "maxPlayers": 100,
       "motd": "Serveur Hexacity - Bienvenue !"
     }
   }
   ```
4. Clique sur **"Update public gist"**
5. Les joueurs verront les nouvelles news au prochain démarrage du launcher ! 🚀

📖 **Guide complet :** [GITHUB-GIST-GUIDE.md](GITHUB-GIST-GUIDE.md)

---

## 🔄 Publier des mises à jour

**Quand publier une mise à jour ?**
- 🐛 Correction de bugs
- ✨ Nouvelles fonctionnalités
- 🎨 Changements visuels
- ⚙️ Améliorations de performance

**Processus simplifié :**
1. Modifie le code
2. Change la version dans `package.json` (1.0.0 → 1.0.1 → 1.0.2, etc.)
3. Compile : `npm run build`
4. Crée une nouvelle Release sur GitHub avec les fichiers du dossier `dist/`
5. Les utilisateurs reçoivent la mise à jour automatiquement ! ✨

📖 **Guide complet :** [MISE-A-JOUR-GUIDE.md](MISE-A-JOUR-GUIDE.md)

---

## 🎨 Personnalisation (Optionnel)

### Logo et icône personnalisés
1. Crée un logo carré (512x512px recommandé)
2. Crée une icône Windows (.ico)
3. Place-les dans un dossier `assets/`
4. Modifie `package.json` dans la section `build` :
   ```json
   "win": {
     "icon": "assets/icon.ico"
   }
   ```
5. Recompile avec `npm run build`

### Changer les couleurs
Modifie `styles.css` :
```css
:root {
  --primary-color: #d946ef;  /* Couleur principale */
  --secondary-color: #a855f7; /* Couleur secondaire */
}
```

---

## 📞 Support

Si tu as des questions ou des problèmes :

1. 📖 Lis la documentation dans les fichiers :
   - `README.md` - Vue d'ensemble
   - `INSTALLATION.md` - Installation développeur
   - `MISE-A-JOUR-GUIDE.md` - Mises à jour
   - `GITHUB-GIST-GUIDE.md` - Actualités

2. 🐛 Vérifie les problèmes connus dans le README (section FAQ)

3. 💬 Contacte le support sur Discord ou GitHub

---

## 🎉 Checklist finale

Avant de considérer le launcher comme "production ready" :

- [ ] Repository GitHub créé
- [ ] Code poussé sur GitHub
- [ ] NeoForge téléchargé et placé dans `forge/`
- [ ] Launcher testé en mode développement
- [ ] Compilation réussie (`npm run build`)
- [ ] Première Release créée sur GitHub (v1.0.0)
- [ ] Setup.exe et latest.yml uploadés sur GitHub
- [ ] Launcher installé et testé depuis le Setup.exe
- [ ] Mise à jour automatique testée (v1.0.0 → v1.0.1)
- [ ] Actualités fonctionnelles depuis GitHub Gist
- [ ] Authentification Microsoft testée
- [ ] Mode offline testé
- [ ] Lancement de Minecraft testé avec NeoForge
- [ ] Documentation lue et comprise
- [ ] Launcher distribué aux premiers testeurs

---

## 🚀 Prochaines étapes suggérées

Une fois le launcher en production, tu peux :

1. **Améliorer l'interface**
   - Ajouter des animations
   - Personnaliser davantage le thème
   - Ajouter des statistiques de joueurs

2. **Ajouter des fonctionnalités**
   - Liste des mods installés
   - Screenshots dans le launcher
   - Chat intégré
   - Store de mods/resourcepacks

3. **Optimiser**
   - Réduire la taille du Setup.exe
   - Améliorer les performances
   - Ajouter un cache pour les news

4. **Communauté**
   - Créer un Discord
   - Faire un trailer vidéo
   - Créer une page web

---

💜 **Bon courage pour le déploiement !** 💜

*Si tu as des questions, n'hésite pas à demander de l'aide !*
