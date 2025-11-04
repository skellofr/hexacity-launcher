# 🚀 Guide Rapide - Héberger sur GitHub Gist (GRATUIT)

## ⚡ La méthode la plus SIMPLE et RAPIDE

GitHub Gist est **PARFAIT** pour héberger ton fichier `news.json` :
- ✅ **GRATUIT** à vie
- ✅ **Aucune inscription** requise (si tu as déjà GitHub)
- ✅ **Instantané** - en ligne en 30 secondes
- ✅ **Modifiable** facilement
- ✅ **Fiable** - hébergé par GitHub
- ✅ **CORS activé** par défaut

## 📝 Étape 1 : Créer le Gist (30 secondes)

1. Va sur **https://gist.github.com**
2. Connecte-toi avec ton compte GitHub (ou crée-en un gratuitement)
3. Dans "Filename including extension", tape : **`news.json`**
4. Colle ce contenu :

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
    },
    {
      "id": 3,
      "title": "💎 Boutique ouverte",
      "content": "Découvrez notre boutique avec des grades et cosmétiques !",
      "date": "2025-11-03",
      "important": false
    }
  ],
  "serverStatus": {
    "online": true,
    "players": 12,
    "maxPlayers": 100,
    "motd": "Serveur Hexacity - Venez jouer !"
  }
}
```

5. Clique sur **"Create public gist"**

## 🔗 Étape 2 : Récupérer l'URL

1. Une fois le Gist créé, clique sur le bouton **"Raw"** (en haut à droite)
2. Copie l'URL dans la barre d'adresse
3. L'URL ressemble à : 
   ```
   https://gist.githubusercontent.com/username/123abc456def/raw/news.json
   ```

## ⚙️ Étape 3 : Configurer le launcher

1. Ouvre le fichier **`renderer.js`** dans le launcher
2. Trouve la ligne (environ ligne 105) :
   ```javascript
   const NEWS_URL = 'https://ton-site.com/news.json'; // ⬅️ CHANGE ICI
   ```
3. Remplace par ton URL GitHub Gist :
   ```javascript
   const NEWS_URL = 'https://gist.githubusercontent.com/username/123abc456def/raw/news.json';
   ```
4. Sauvegarde le fichier

## 🎉 C'EST FINI !

Relance le launcher et tes actualités seront chargées depuis GitHub !

## 🔄 Modifier les actualités

Pour changer les actualités :

1. Va sur ton Gist : https://gist.github.com
2. Clique sur ton Gist `news.json`
3. Clique sur **"Edit"** (crayon en haut à droite)
4. Modifie le contenu
5. Clique sur **"Update public gist"**

**Les changements sont INSTANTANÉS !** ⚡

Tous les launchers verront les nouvelles actualités dans les 5 minutes (ou au redémarrage).

## 💡 Exemple d'URL

Voici à quoi ressemble une vraie URL GitHub Gist :

```
https://gist.githubusercontent.com/lucashexacity/7a8b9c0d1e2f3g4h5i6j/raw/news.json
```

## ✅ Vérifier que ça marche

1. Ouvre ton navigateur
2. Colle ton URL GitHub Gist
3. Tu dois voir le contenu JSON s'afficher

## 🎨 Idées d'actualités

### Maintenance
```json
{
  "id": 1,
  "title": "⚠️ Maintenance programmée",
  "content": "Le serveur sera en maintenance ce soir de 20h à 22h pour installer de nouveaux plugins.",
  "date": "2025-11-05",
  "important": true
}
```

### Événement
```json
{
  "id": 2,
  "title": "🎮 Tournoi PvP",
  "content": "Grand tournoi PvP samedi 20h ! Récompenses : Grade VIP, 10000$ in-game et items exclusifs.",
  "date": "2025-11-05",
  "important": true
}
```

### Mise à jour
```json
{
  "id": 3,
  "title": "✨ Nouveautés",
  "content": "Nouveau plugin d'économie, jobs, et système de quêtes ajoutés au serveur !",
  "date": "2025-11-04",
  "important": false
}
```

### Annonce Discord
```json
{
  "id": 4,
  "title": "💬 Rejoignez le Discord",
  "content": "Rejoignez notre Discord pour participer aux événements : discord.gg/hexacity",
  "date": "2025-11-04",
  "important": false
}
```

## 🔥 Astuce Pro

Garde le lien de ton Gist dans tes favoris pour y accéder rapidement !

Tu peux même le modifier depuis ton téléphone ! 📱

## 📊 Statut du serveur

Si tu changes `"online": false`, le launcher affichera "Hors ligne" en rouge.

Si tu mets `"players": 25`, ça affichera "En ligne (25/100)".

## ❓ Questions

**Q : C'est vraiment gratuit pour toujours ?**
R : OUI ! GitHub Gist est gratuit et sans limite.

**Q : Combien de personnes peuvent télécharger le fichier ?**
R : ILLIMITÉ ! GitHub a des serveurs ultra puissants.

**Q : Puis-je avoir plusieurs fichiers ?**
R : Oui, mais un seul `news.json` suffit pour le launcher.

**Q : Est-ce que mes actualités resteront en ligne si je ne fais rien ?**
R : OUI ! Elles restent en ligne pour toujours.

---

**C'EST LA MÉTHODE LA PLUS SIMPLE !** 🎉

Aucun hébergement web, aucune configuration compliquée, juste GitHub Gist ! 🚀
