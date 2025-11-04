# 🌐 Guide - Héberger les Actualités sur ton Site Web

## 🚀 Avantages de l'hébergement web

- ✅ **Mise à jour instantanée** - Change les actualités sans recompiler le launcher
- ✅ **Accessible partout** - Tous les utilisateurs voient les mêmes actualités
- ✅ **Simple** - Modifie juste un fichier sur ton site
- ✅ **Statut du serveur en temps réel** - Affiche si le serveur est en ligne

## 📝 Étape 1 : Créer le fichier news.json

Crée un fichier `news.json` avec ce contenu :

```json
{
  "news": [
    {
      "id": 1,
      "title": "🎉 Bienvenue sur Hexacity!",
      "content": "Rejoignez notre serveur Minecraft 1.21.1 avec NeoForge 21.1.206.",
      "date": "2025-11-04",
      "important": true
    },
    {
      "id": 2,
      "title": "⚡ Événement du week-end",
      "content": "Participez à notre tournoi PvP ce samedi à 20h !",
      "date": "2025-11-04",
      "important": false
    }
  ],
  "serverStatus": {
    "online": true,
    "players": 15,
    "maxPlayers": 100,
    "motd": "Serveur Hexacity - Venez jouer !"
  }
}
```

## 🌐 Étape 2 : Héberger le fichier

### Option A : Hébergement web classique

1. Connecte-toi à ton hébergeur web (OVH, Hostinger, etc.)
2. Va dans le gestionnaire de fichiers (FTP ou cPanel)
3. Upload `news.json` dans le dossier public (souvent `public_html` ou `www`)
4. Ton fichier sera accessible à : `https://ton-site.com/news.json`

### Option B : GitHub Pages (GRATUIT !)

1. Crée un repository GitHub
2. Upload `news.json` dans le repository
3. Active GitHub Pages dans les settings
4. Ton fichier sera accessible à : `https://ton-username.github.io/repo-name/news.json`

### Option C : Cloudflare Pages (GRATUIT !)

1. Crée un compte sur Cloudflare Pages
2. Upload ton fichier
3. Déploie automatiquement

### Option D : Serveur Discord/Pastebin (Simple)

Tu peux même utiliser :
- **Pastebin Raw** : https://pastebin.com/raw/XXXXX
- **GitHub Gist** : https://gist.githubusercontent.com/...
- **Dropbox Public** : Lien public d'un fichier

## ⚙️ Étape 3 : Configurer le launcher

Dans le fichier `renderer.js`, change cette ligne (ligne ~105) :

```javascript
const NEWS_URL = 'https://ton-site.com/news.json'; // ⬅️ CHANGE ICI
```

Par exemple :
```javascript
const NEWS_URL = 'https://hexacity.fr/launcher/news.json';
```

## 🔄 Étape 4 : Mettre à jour les actualités

### Super simple !

1. Modifie `news.json` sur ton site
2. Sauvegarde
3. **C'EST TOUT !** Le launcher télécharge automatiquement les nouvelles actualités

Le launcher vérifie :
- ✅ Au démarrage
- ✅ Toutes les 5 minutes

## 📊 Statut du serveur en temps réel

Tu peux créer un petit script PHP pour récupérer le statut de ton serveur :

```php
<?php
// status.php - Script pour vérifier le statut du serveur Minecraft

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$server = 'ton-serveur.com';
$port = 25565;

// Fonction pour ping le serveur
function pingServer($host, $port) {
    $socket = @fsockopen($host, $port, $errno, $errstr, 1);
    if ($socket) {
        fclose($socket);
        return true;
    }
    return false;
}

$online = pingServer($server, $port);

// Charger les actualités
$news = json_decode(file_get_contents('news.json'), true);
$news['serverStatus']['online'] = $online;

echo json_encode($news);
?>
```

Puis dans `renderer.js`, change l'URL :
```javascript
const NEWS_URL = 'https://ton-site.com/status.php';
```

## 🎨 Format du fichier news.json

### Structure complète :

```json
{
  "news": [
    {
      "id": 1,
      "title": "Titre (avec emoji)",
      "content": "Contenu de l'actualité",
      "date": "2025-11-04",
      "important": true/false
    }
  ],
  "serverStatus": {
    "online": true/false,
    "players": 15,
    "maxPlayers": 100,
    "motd": "Message du jour"
  }
}
```

### Propriétés serverStatus :

- **online** : `true` = serveur en ligne, `false` = hors ligne
- **players** : Nombre de joueurs connectés (optionnel)
- **maxPlayers** : Nombre max de joueurs (optionnel)
- **motd** : Message du jour (optionnel)

## 🔒 Sécurité CORS

Si tu as des erreurs CORS, ajoute un fichier `.htaccess` dans le même dossier :

```apache
<FilesMatch "\.(json)$">
    Header set Access-Control-Allow-Origin "*"
</FilesMatch>
```

Ou sur Nginx, dans la config :

```nginx
location ~ \.json$ {
    add_header Access-Control-Allow-Origin *;
}
```

## 📱 Tester ton fichier

1. Ouvre ton navigateur
2. Va sur `https://ton-site.com/news.json`
3. Tu dois voir le contenu JSON

## 💡 Astuces

### Actualités urgentes
```json
{
  "id": 1,
  "title": "⚠️ MAINTENANCE",
  "content": "Serveur en maintenance pendant 1h",
  "date": "2025-11-04",
  "important": true
}
```

### Événements
```json
{
  "id": 2,
  "title": "🎮 Tournoi PvP",
  "content": "Samedi 20h - Récompenses à gagner !",
  "date": "2025-11-04",
  "important": false
}
```

### Mises à jour
```json
{
  "id": 3,
  "title": "✨ Nouveau plugin",
  "content": "Système d'économie ajouté au serveur",
  "date": "2025-11-04",
  "important": false
}
```

## 🎯 Exemple complet

Voici un exemple réel que tu peux copier-coller :

```json
{
  "news": [
    {
      "id": 1,
      "title": "🎉 Serveur Hexacity lancé !",
      "content": "Bienvenue sur notre nouveau serveur Minecraft 1.21.1 avec NeoForge. Rejoignez-nous dès maintenant !",
      "date": "2025-11-04",
      "important": true
    },
    {
      "id": 2,
      "title": "🎮 Événement d'ouverture",
      "content": "Participez à notre événement d'ouverture ce week-end pour gagner des récompenses exclusives !",
      "date": "2025-11-04",
      "important": true
    },
    {
      "id": 3,
      "title": "💎 Boutique ouverte",
      "content": "La boutique du serveur est maintenant disponible avec des grades et des cosmétiques.",
      "date": "2025-11-03",
      "important": false
    },
    {
      "id": 4,
      "title": "📢 Discord disponible",
      "content": "Rejoignez notre serveur Discord pour ne rien manquer : discord.gg/hexacity",
      "date": "2025-11-03",
      "important": false
    }
  ],
  "serverStatus": {
    "online": true,
    "players": 25,
    "maxPlayers": 100,
    "motd": "Serveur Hexacity - Version 1.21.1 - Venez jouer !"
  }
}
```

## 🚀 Déploiement rapide

Si tu n'as pas de site web, utilise **GitHub Gist** :

1. Va sur https://gist.github.com
2. Crée un nouveau Gist
3. Nomme-le `news.json`
4. Colle le contenu
5. Clique sur "Create public gist"
6. Clique sur "Raw"
7. Copie l'URL (elle ressemble à : `https://gist.githubusercontent.com/...`)
8. Colle cette URL dans `renderer.js`

**C'EST GRATUIT ET INSTANTANÉ !** 🎉

## ❓ Questions fréquentes

**Q : Combien de temps pour que les joueurs voient les nouvelles actualités ?**
R : Maximum 5 minutes (ou au prochain redémarrage du launcher)

**Q : Puis-je utiliser un lien Discord ?**
R : Non, Discord bloque les requêtes externes. Utilise GitHub Gist à la place.

**Q : Le fichier local sert encore ?**
R : Oui ! Si le téléchargement échoue (pas d'internet), le launcher charge le fichier local.

**Q : Combien d'actualités puis-je avoir ?**
R : Autant que tu veux ! Seules les 3 premières seront affichées.

---

**Besoin d'aide ?** Demande-moi ! 😊
