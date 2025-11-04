# 📰 Guide - Gérer les Actualités du Launcher

## 📄 Fichier des actualités

Les actualités sont stockées dans le fichier `news.json` à la racine du launcher.

## ✏️ Comment ajouter/modifier une actualité

1. Ouvre le fichier `news.json` avec un éditeur de texte
2. Modifie le contenu selon le format ci-dessous

### Format d'une actualité :

```json
{
  "id": 1,
  "title": "🎉 Titre de l'actualité",
  "content": "Contenu de l'actualité qui sera affiché",
  "date": "2025-11-04",
  "important": true
}
```

### Propriétés :

- **id** : Numéro unique (1, 2, 3...)
- **title** : Titre de l'actualité (peut contenir des emojis)
- **content** : Texte de l'actualité
- **date** : Date au format YYYY-MM-DD
- **important** : `true` = barre violette à gauche, `false` = actualité normale

## 📝 Exemples d'actualités

### Actualité importante (avec barre violette)
```json
{
  "id": 1,
  "title": "⚠️ Maintenance programmée",
  "content": "Le serveur sera en maintenance ce soir de 20h à 22h.",
  "date": "2025-11-05",
  "important": true
}
```

### Actualité normale
```json
{
  "id": 2,
  "title": "🎮 Nouvel événement",
  "content": "Participez à notre événement PvP ce weekend !",
  "date": "2025-11-05",
  "important": false
}
```

### Nouvelle fonctionnalité
```json
{
  "id": 3,
  "title": "✨ Nouveau plugin",
  "content": "Nous avons ajouté un système de commerce entre joueurs.",
  "date": "2025-11-05",
  "important": false
}
```

## 🔄 Structure complète du fichier news.json

```json
{
  "news": [
    {
      "id": 1,
      "title": "🎉 Titre 1",
      "content": "Contenu 1",
      "date": "2025-11-05",
      "important": true
    },
    {
      "id": 2,
      "title": "⚡ Titre 2",
      "content": "Contenu 2",
      "date": "2025-11-04",
      "important": false
    }
  ],
  "serverStatus": {
    "motd": "Message du jour du serveur",
    "version": "1.21.1",
    "maxPlayers": 100
  }
}
```

## 📋 Conseils

### Emojis recommandés :
- 🎉 Événements spéciaux
- ⚠️ Maintenance / Important
- ✨ Nouvelles fonctionnalités
- 🎮 Jeux / Compétitions
- 🏆 Récompenses / Gagnants
- 📢 Annonces générales
- 🔧 Corrections / Bugs
- 💎 Boutique / Shop
- 🌟 Mises à jour

### Ordre des actualités :
Les actualités sont affichées dans l'ordre du fichier (de haut en bas).
**Les 3 premières** actualités sont affichées dans le launcher.

### Important :
- Respecte bien la syntaxe JSON (virgules, guillemets...)
- N'oublie pas les virgules entre les actualités
- Pas de virgule après la dernière actualité

## 🚀 Mise à jour en temps réel

Le launcher recharge automatiquement les actualités :
- ✅ Au démarrage
- ✅ Toutes les 5 minutes

Tu peux modifier `news.json` même quand le launcher est ouvert !

## ⚡ Publier les actualités

### Méthode 1 : Fichier local
Modifie directement `news.json` dans le dossier du launcher.

### Méthode 2 : Serveur web (avancé)
Tu peux héberger `news.json` sur un serveur web et modifier le code pour le télécharger automatiquement.

Dans `renderer.js`, remplace :
```javascript
const newsFile = path.join(__dirname, 'news.json');
```

Par :
```javascript
// Télécharger depuis une URL
fetch('https://ton-site.com/news.json')
  .then(res => res.json())
  .then(newsData => {
    // Code pour afficher les actualités
  });
```

## 🎨 Personnalisation

Tu peux modifier l'apparence dans `styles.css` :
- Couleur de la barre importante : `.news-item { border-left: 3px solid #d946ef; }`
- Taille du texte : `.news-item { font-size: 14px; }`
- Nombre max d'actualités affichées : Dans `renderer.js`, change `.slice(0, 3)` par `.slice(0, 5)` pour 5 actualités

## 📞 Support

Si tu as des questions sur la gestion des actualités, demande de l'aide !

---

**Bon à savoir :** Le fichier `news.json` est distribué avec le launcher quand tu le compiles en exécutable. Pense à le mettre à jour avant de créer une nouvelle version !
