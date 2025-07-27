# 📚 Application de Révision - Mémoire à Long Terme

Une application de gestion des révisions utilisant la technique de répétition espacée pour optimiser l'apprentissage et développer la mémoire à long terme.

## 🎯 Objectif

Cette application vous aide à organiser efficacement vos révisions en appliquant un système de répétition espacée. Elle calcule automatiquement les dates optimales de révision pour chaque élément appris, maximisant ainsi la rétention en mémoire à long terme.

## ✨ Fonctionnalités

### 📝 Onglet 1 : Saisie des Items du Jour
- **Enregistrement quotidien** : Ajoutez facilement les points que vous avez appris dans la journée
- **Organisation par titres** : Chaque élément est représenté par un titre clair et descriptif
- **Groupement par date** : Tous les items sont automatiquement associés à la date d'apprentissage
- **Interface intuitive** : Saisie rapide et efficace des nouveaux éléments

### 🔄 Onglet 2 : Révisions du Jour
- **Planning automatique** : Affichage des éléments à réviser selon le calendrier calculé
- **Suivi des révisions** : Marquez les révisions comme effectuées
- **Vue d'ensemble** : Visualisez votre charge de révision quotidienne

## 🧠 Système de Répétition Espacée

L'application utilise un algorithme de répétition espacée optimisé :

```
Jour d'apprentissage (J) → Première révision (J+1) → Deuxième révision (J+3) → Troisième révision (J+7) → etc.
```

**Principe** : Les intervalles entre les révisions augmentent progressivement, renforçant la mémorisation à long terme tout en optimisant le temps d'étude.

## 🚀 Installation

### Prérequis
- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (installé localement ou accès à MongoDB Atlas)

### Étapes d'installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/votre-username/revision-app.git
   cd revision-app
   ```

2. **Installer les dépendances du serveur**
   ```bash
   cd server
   npm install
   ```

3. **Installer les dépendances du client**
   ```bash
   cd ../client
   npm install
   ```

4. **Configuration de la base de données**
   ```bash
   # Créer le fichier .env à la racine du projet
   echo "MONGODB_URI=mongodb://localhost:27017/revision-app" > ../.env
   echo "PORT=5000" >> ../.env
   ```

5. **Lancer le serveur backend**
   ```bash
   cd ../server
   npm start
   ```

6. **Lancer le client frontend** (dans un nouveau terminal)
   ```bash
   cd client
   npm start
   ```

7. **Accéder à l'application**
   - Frontend : `http://localhost:3000`
   - API Backend : `http://localhost:5000`

## 📱 Utilisation

### Ajouter des éléments d'apprentissage

1. Rendez-vous sur l'onglet **"Items du Jour"**
2. Saisissez le titre de l'élément appris
3. Cliquez sur **"Ajouter"**
4. L'application calcule automatiquement les dates de révision

### Effectuer vos révisions

1. Consultez l'onglet **"Révisions du Jour"**
2. Révisez chaque élément affiché
3. Marquez les révisions comme terminées
4. L'application programme automatiquement la prochaine révision

## 🗂️ Structure du Projet

```
revision-app/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   ├── ItemsInput.js      # Composant de saisie des items
│   │   │   ├── ReviewsList.js     # Composant d'affichage des révisions
│   │   │   └── Navigation.js      # Navigation entre onglets
│   │   ├── services/
│   │   │   ├── api.js             # Appels API vers le backend
│   │   │   └── spaceRepetition.js # Logique de répétition espacée
│   │   ├── utils/
│   │   │   └── dateHelpers.js     # Utilitaires de gestion des dates
│   │   └── App.js                 # Composant principal
│   ├── public/
│   └── package.json
├── server/                    # Backend Express
│   ├── controllers/
│   │   ├── itemsController.js     # Logique métier des items
│   │   └── reviewsController.js   # Logique métier des révisions
│   ├── models/
│   │   ├── Item.js                # Modèle MongoDB pour les items
│   │   └── Review.js              # Modèle MongoDB pour les révisions
│   ├── routes/
│   │   ├── items.js               # Routes API pour les items
│   │   └── reviews.js             # Routes API pour les révisions
│   ├── config/
│   │   └── database.js            # Configuration MongoDB
│   ├── middleware/
│   │   └── auth.js                # Middleware d'authentification
│   ├── server.js                  # Point d'entrée du serveur
│   └── package.json
├── .env                       # Variables d'environnement
└── README.md
```

## 🛠️ Technologies Utilisées

- **Frontend** : React.js
- **Backend** : Node.js + Express.js
- **Base de données** : MongoDB
- **Styling** : Tailwind CSS
- **Build** : Create React App

## 📊 Algorithme de Répétition

L'application implémente l'algorithme suivant :

| Révision | Intervalle | Description |
|----------|------------|-------------|
| 1ère | J+1 | Révision le lendemain |
| 2ème | J+3 | Révision 3 jours après l'apprentissage |
| 3ème | J+7 | Révision 1 semaine après |
| 4ème | J+15 | Révision 2 semaines après |
| 5ème | J+30 | Révision 1 mois après |
| Suivantes | Intervalles croissants | Espacements progressifs |

---

**Bonne révision ! 🎓**