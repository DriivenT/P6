const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config()

const sauceRoutes = require('./routes/sauces');
const authRoutes = require('./routes/auth');
const path = require('path');

// Connexion à la base de donnée
mongoose.connect(process.env.MONGODB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Autorisation des headers
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', process.env.HEADER_AUTORISE);
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Parse req.body en JSON
app.use(bodyParser.json());

// Sécurise les headers
app.use(helmet());


// Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;