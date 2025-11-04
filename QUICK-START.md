# ⚡ Guide Express - Mise en production

## 🎯 5 étapes pour lancer ton launcher

### 1. GitHub (2 min)
```bash
# Crée le repo sur GitHub : skellofr/hexacity-launcher
cd "c:\Users\lucas\Desktop\launcher minecraft"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/skellofr/hexacity-launcher.git
git push -u origin main
```

### 2. NeoForge (1 min)
- Télécharge : https://neoforged.net/
- Version : **21.1.206** pour Minecraft 1.21.1
- Place `neoforge-21.1.206-installer.jar` dans le dossier `forge/`

### 3. Compile (5 min)
```bash
npm run build
```
→ Fichiers créés dans `dist/`

### 4. Première Release (3 min)
1. GitHub → Releases → "Create a new release"
2. Tag : `v1.0.0`
3. Upload `Hexacity-Launcher-Setup-1.0.0.exe` + `latest.yml` depuis `dist/`
4. Publie !

### 5. Distribue (1 min)
Envoie le lien à tes joueurs : 
```
https://github.com/skellofr/hexacity-launcher/releases
```

---

## 🔄 Mettre à jour le launcher (après)

```bash
# 1. Modifie le code
# 2. Change la version dans package.json (1.0.0 → 1.0.1)
npm run build
# 3. Crée une nouvelle Release sur GitHub avec les nouveaux fichiers
```
→ Les joueurs reçoivent la mise à jour automatiquement ! ✨

---

## 📰 Mettre à jour les actualités

1. Va sur : https://gist.github.com/skellofr/4a9b4c0e2d95a34a684b88ca8a10b7c4
2. Clique "Edit"
3. Modifie `news.json`
4. Clique "Update public gist"
→ Les joueurs voient les news au prochain lancement ! 🚀

---

## ❓ Problèmes fréquents

**Le launcher ne compile pas**
→ Vérifie que Node.js est installé : `node --version`
→ Réinstalle les dépendances : `npm install`

**Les mises à jour ne fonctionnent pas**
→ Vérifie que tu as bien uploadé `latest.yml` ET le Setup.exe
→ Le système de mise à jour ne fonctionne QUE dans la version compilée (pas en `npm start`)

**NeoForge ne se lance pas**
→ Vérifie que le fichier est bien dans `forge/neoforge-21.1.206-installer.jar`
→ Vérifie la version exacte : 21.1.206

---

## 📚 Documentation complète

- 📋 **TODO-DEPLOIEMENT.md** - Guide détaillé étape par étape
- 📖 **README.md** - Vue d'ensemble du projet
- 🔄 **MISE-A-JOUR-GUIDE.md** - Publier des mises à jour
- 📰 **GITHUB-GIST-GUIDE.md** - Gérer les actualités

---

**Temps total estimé : 15 minutes** ⏱️

💜 **C'est parti !** 💜
