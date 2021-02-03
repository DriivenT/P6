const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');

const User = require('../models/User');
require('dotenv').config();

exports.signup = (request, response, next) => {
    bcrypt.hash(request.body.password, 10)
        .then(hash => {
            const user = new User({
                email: cryptojs.HmacSHA256(request.body.email, process.env.CLE_EMAIL).toString(),
                password: hash
            });
            user.save()
                .then(() => response.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => response.status(400).json({ error }));
        })
        .catch(error => response.status(500).json({ error }));
};

exports.login = (request, response, next) => {
    const emailCrypte = cryptojs.HmacSHA256(request.body.email, process.env.CLE_EMAIL).toString();
    User.findOne({ email: emailCrypte })
        .then(user => {
            if (!user) {
                return response.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(request.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return response.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    response.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN_SECRET,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => response.status(500).json({ error }));
        })
        .catch(error => response.status(500).json({ error }));
};