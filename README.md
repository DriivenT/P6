OpenClassrooms P6 - API backend SoPekocko "Piquante"
6ème projet de la formation de développeur web de OpenClassrooms

Scénario:
Développement d'une application web nommée "Piquante" dans laquelle les utilisateurs pourront ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres utilisateurs.
Le but est de créer le backend de l'application, le frontend étant déjà codé et fourni.

Objectifs du projet et compétences évaluées:
Développement Backend en Javascript:

- Serveur Node.js
- Framework Express
- Base de données MongoDB
- Hébergement sur MongoDB Atlas
- Opérations relatives à la BDD réalisées avec mongoose
- API REST
- Sécurité OWASP et RGPD
- Mesures de sécurité mises en place
- Hashage du mot de passe utilisateur avec bcrypt
- Cryptage des emails utilisateurs dans la base de données avec crypto-js
- Manupulation sécurisée de la base de donnée avec mongoose
- Vérification que l'email utilisateur soit unique dans la base de données avec mongoose-unique-validator
- Utilisation de variables d'environnement pour les données sensibles avec dotenv
- Authentification de l'utilisateur par token avec jsonwebtoken
- Protection des headers avec helmet
- Utilisation de "express rate limit" pour limiter le nombre de tentative de connexion à 3, toutes les 5 minutes.

Pour tester l'application:

⚠️ ATTENTION, node-sass est a installer à part dans le front-end (npm i node-sass@4.14.1)

Cloner le frontend (https://github.com/OpenClassrooms-Student-Center/dwj-projet6) de l'application, et le lancer:
Dans un terminal, accéder au dossier du frontend
Installer les dépendances: npm install
Lancer: ng serve
Cloner ce repository backend actuel ⬇️

Ajouter un fichier de configuration nommé ".env" à la racine du backend. A l'intérieur, 5 variables d'environnement "secrètes" seront définies:

MONGODB_CONNECT = 'mongodb+srv://Moi:moi@p6.h72um.mongodb.net/PiquanteDB?retryWrites=true&w=majority'
CLE_EMAIL = 'Clé_secrète_de_cryptage_d'email'
TOKEN_SECRET = 'Token_secret_aléatoire'
HEADER_AUTORISE = '*'

Lancer le backend
Dans un autre terminal, accéder au dossier du backend
Installer les dépendances: npm install
Lancer node server
Le frontend est accessible à l'adresse http://localhost:4200
Pour des tests spécifiques (avec postman par exemple), le backend répond à l'adresse: http://localhost:3000 (attention: authentification requise pour toutes les routes /api/sauces/)
