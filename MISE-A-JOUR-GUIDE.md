# 🚀 Guide - Publier une Mise à Jour du Launcher

## 📦 Système de mise à jour automatique

Ton launcher utilise **electron-updater** - le même système que Discord, Slack, VS Code !

### ✨ Fonctionnalités

- ✅ **Vérification automatique** au démarrage
- ✅ **Téléchargement en arrière-plan**
- ✅ **Notification élégante** dans le launcher
- ✅ **Barre de progression**
- ✅ **Installation en un clic**
- ✅ **Hébergement GRATUIT** sur GitHub

---

## 📝 Étapes pour publier une mise à jour

### 1️⃣ **Modifier la version** dans `package.json`

```json
{
  "name": "hexacity-launcher",
  "version": "1.1.0",  // ⬅️ Change ici (était 1.0.0)
  ...
}
```

**Format de version :**
- `1.0.0` → `1.0.1` : Correction de bugs
- `1.0.0` → `1.1.0` : Nouvelles fonctionnalités
- `1.0.0` → `2.0.0` : Changements majeurs

### 2️⃣ **Compiler le launcher**

```powershell
npm run build
```

Cela crée :
- `dist/Hexacity Launcher Setup 1.1.0.exe` - L'installateur
- `dist/Hexacity Launcher-1.1.0.exe` - L'application
- `dist/latest.yml` - Fichier de mise à jour **IMPORTANT !**

### 3️⃣ **Créer une Release sur GitHub**

**A. Va sur ton repository GitHub**
```
https://github.com/skellofr/hexacity-launcher
```

**B. Clique sur "Releases" → "Create a new release"**

**C. Remplis les informations :**

- **Tag version** : `v1.1.0` (DOIT commencer par `v`)
- **Release title** : `Version 1.1.0 - Nom de la mise à jour`
- **Description** : 
  ```markdown
  ## 🎉 Nouveautés
  - ✨ Nouvelle fonctionnalité X
  - 🐛 Correction du bug Y
  - 💜 Amélioration de Z
  
  ## 📥 Installation
  Téléchargez et installez `Hexacity.Launcher.Setup.1.1.0.exe`
  
  Les utilisateurs avec le launcher déjà installé recevront la mise à jour automatiquement !
  ```

**D. Upload les fichiers :**

📎 **OBLIGATOIRE - Ces 2 fichiers :**
1. `Hexacity Launcher Setup 1.1.0.exe` (l'installateur)
2. `latest.yml` (fichier de mise à jour)

📎 **Optionnel :**
- `Hexacity Launcher-1.1.0.exe` (version portable)

**E. Clique sur "Publish release"**

---

## 🎯 Comment ça marche côté utilisateur

### Utilisateur avec launcher **déjà installé** :

1. ✅ Lance le launcher
2. 🔍 Le launcher vérifie automatiquement les mises à jour
3. 📥 Si mise à jour → Téléchargement automatique en arrière-plan
4. 🔔 Notification violette en haut : "Mise à jour X.X.X disponible"
5. 📊 Barre de progression du téléchargement
6. 🎉 Bouton "Installer maintenant" apparaît
7. 🔄 Clic → Installation et redémarrage automatique

### Nouvel utilisateur :

1. 📥 Télécharge `Hexacity Launcher Setup X.X.X.exe` depuis GitHub
2. 🚀 Installe le launcher
3. ✨ Profite !

---

## 📋 Checklist avant publication

Avant de publier une nouvelle version, vérifie :

- [ ] ✅ Version changée dans `package.json`
- [ ] ✅ Code testé avec `npm start`
- [ ] ✅ Compilation réussie avec `npm run build`
- [ ] ✅ Fichier `latest.yml` présent dans `dist/`
- [ ] ✅ Tag GitHub commence par `v` (ex: `v1.1.0`)
- [ ] ✅ Les 2 fichiers uploadés sur GitHub Release

---

## 🔧 Configuration GitHub (À FAIRE UNE FOIS)

### 1. Créer le repository sur GitHub

Si pas encore fait :

1. Va sur https://github.com/new
2. Nom : `hexacity-launcher`
3. Description : `Launcher Minecraft pour Hexacity`
4. Visibilité : **Public** (obligatoire pour les releases gratuites)
5. Clique sur "Create repository"

### 2. Mettre à jour `package.json`

Change le propriétaire et le nom du repo :

```json
"build": {
  "publish": {
    "provider": "github",
    "owner": "TON-USERNAME-GITHUB",  // ⬅️ Change ici
    "repo": "hexacity-launcher"      // ⬅️ Change si différent
  }
}
```

### 3. Générer un token GitHub (optionnel)

Pour publier automatiquement depuis le terminal :

1. Va sur https://github.com/settings/tokens
2. "Generate new token" → "Classic"
3. Nom : `Hexacity Launcher`
4. Coche : `repo` (Full control)
5. Génère et copie le token
6. Dans un terminal :
   ```powershell
   $env:GH_TOKEN="ton_token_ici"
   npm run build
   ```

---

## 📊 Exemples de versions

### Version 1.0.1 - Corrections
```markdown
## 🐛 Corrections
- Correction du bug d'authentification Microsoft
- Amélioration de la stabilité
- Correction de l'affichage des actualités
```

### Version 1.1.0 - Nouvelles fonctionnalités
```markdown
## ✨ Nouveautés
- Ajout du système de mise à jour automatique
- Nouveau thème violet
- Actualités dynamiques depuis le web

## 🐛 Corrections
- Divers bugs corrigés
```

### Version 2.0.0 - Changement majeur
```markdown
## 🎉 Hexacity Launcher 2.0

### 🚀 Nouvelles fonctionnalités majeures
- Support NeoForge 21.1.206
- Interface complètement redessinée
- Système de mods intégré

### ⚠️ Changements importants
- Nécessite une réinstallation complète
- Configuration migrée automatiquement

### 🐛 Corrections
- Plus de 50 bugs corrigés
```

---

## 💡 Astuces

### Publier rapidement
```powershell
# 1. Change la version dans package.json
# 2. Compile
npm run build
# 3. Upload sur GitHub manuellement
```

### Test en local
Le système de mise à jour ne fonctionne QUE sur l'application compilée, pas en mode `npm start`.

Pour tester :
1. Compile : `npm run build`
2. Installe : `dist/Hexacity Launcher Setup X.X.X.exe`
3. Publie une nouvelle version sur GitHub
4. Lance l'app installée
5. La mise à jour devrait être détectée !

### Rollback (annuler une version)

Si une version a un problème :
1. Supprime la release sur GitHub
2. Republie la version précédente avec un numéro supérieur
3. Ex: Version 1.1.0 buggée → Republie 1.0.0 en tant que 1.1.1

---

## ⚠️ Important

### Le fichier `latest.yml`

Ce fichier est **CRUCIAL** ! Sans lui, les mises à jour ne fonctionnent pas.

Il contient :
```yaml
version: 1.1.0
files:
  - url: Hexacity.Launcher.Setup.1.1.0.exe
    sha512: ...
    size: ...
path: Hexacity.Launcher.Setup.1.1.0.exe
sha512: ...
releaseDate: '2025-11-04T...'
```

**TOUJOURS l'uploader avec l'installateur !**

### Noms des fichiers

GitHub est sensible aux noms de fichiers :
- ✅ `Hexacity-Launcher-Setup-1.1.0.exe`
- ✅ `Hexacity Launcher Setup 1.1.0.exe`
- ❌ Ne pas renommer après compilation

---

## 📞 Problèmes fréquents

**Q : La mise à jour n'est pas détectée**
R : Vérifie que `latest.yml` est bien sur GitHub Release

**Q : Erreur de signature**
R : Normal en dev. Les utilisateurs peuvent cliquer sur "Plus d'infos" → "Exécuter quand même"

**Q : Téléchargement bloqué**
R : Vérifie que le repository est public

**Q : Version non détectée**
R : Le tag doit commencer par `v` : `v1.1.0` (pas juste `1.1.0`)

---

## 🎉 C'est tout !

Maintenant tu peux publier des mises à jour en quelques minutes et tous tes joueurs seront automatiquement à jour ! 🚀💜
