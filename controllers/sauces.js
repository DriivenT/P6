const Sauce = require('../models/Sauce');
const fs = require('fs');

// Trouver toutes les sauces
exports.trouverToutesSauces = (request, response, next) => {
    Sauce.find()
        .then(
            (sauces) => {
                response.status(200).json(sauces);
            }
        )
        .catch(
            (error) => {
                response.status(400).json({ error: error });
            }
        );
}

// Trouver une seule sauce
exports.trouverUneSauce = (request, response, next) => {
    Sauce.findOne({ _id: request.params.id })
    .then(
        (sauce) => {
            response.status(200).json(sauce);
        }
    )
    .catch(
        (error) => {
            response.status(404).json({ error: error });
        }
    );
}

// Créer une sauce
exports.creerSauce = (request, response, next) => {
    const sauceObject = JSON.parse(request.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`,
        likes: 0,
        dislikes: 0,
    });

    sauce.save()
        .then(() => response.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => response.status(400).json({ error }));
};

// Modifier une sauce
exports.modifierSauce = (request, response, next) => {
    const sauceObject = request.file ?
        {
            ...JSON.parse(request.body.sauce),
            imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`
        } 
        : { ...request.body };

    Sauce.updateOne({ _id: request.params.id }, { ...sauceObject, _id: request.params.id })
        .then(() => response.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => response.status(400).json({ error }));
};

// Supprimer une sauce
exports.supprimerSauce = (request, response, next) => {
    Sauce.findOne({ _id: request.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: request.params.id })
                    .then(() => response.status(200).json({ message: 'Sauce supprimée !' }))
                    .catch(error => response.status(400).json({ error }));
            });
        })
        .catch(error => response.status(500).json({ error }));
};

// Like / Dislike une sauce
exports.likeSauce = (request, response, next) => {
    const userId = request.body.userId;
    Sauce.findOne({ _id: request.params.id })
        .then(sauce => {
            // Création d'une variable objet à modifier
            const avisSauce = {
                usersLiked: sauce.usersLiked,
                usersDisliked: sauce.usersDisliked,
                likes: 0,
                dislikes: 0
            };

            // Gestion des différentes possibilités
            switch (request.body.like){
                // Possibilité 1: Like de la sauce
                case 1:
                    avisSauce.usersLiked.push(userId);
                    break;
                // Possibilité 2: Dislike de la sauce
                case -1:
                    avisSauce.usersDisliked.push(userId);
                    break;
                // Possibilité 3: Annulation du like ou du dislike
                case 0:
                    if (avisSauce.usersLiked.includes(userId)) {
                        // Annulation du like -> Suppression de l'id dans le tableau de like
                        const index = avisSauce.usersLiked.indexOf(userId);
                        avisSauce.usersLiked.splice(index, 1);
                    } else {
                        // Annulation du dislike -> Suppression de l'id dans le tableau de dislike
                        const index = avisSauce.usersDisliked.indexOf(userId);
                        avisSauce.usersDisliked.splice(index, 1);
                    }
                    break;
            };

            // Calcul du nombre de likes / dislikes
            avisSauce.likes = avisSauce.usersLiked.length;
            avisSauce.dislikes = avisSauce.usersDisliked.length;
            
            // Mise à jour de la sauce avec les nouvelles valeurs
            Sauce.updateOne({ _id: request.params.id }, avisSauce)
                .then(() => response.status(200).json({ message: 'Sauce notée !' }))
                .catch(error => response.status(400).json({ error }))
        })
        .catch(error => response.status(500).json({ error }));
};