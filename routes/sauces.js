const express = require('express');
const router = express.Router();

const autorisation = require('../middlewares/autorisation');
const multer = require('../middlewares/multer-config');

const saucesCtrl = require('../controllers/sauces');

router.get('/', autorisation, saucesCtrl.trouverToutesSauces);
router.get('/:id', autorisation, saucesCtrl.trouverUneSauce);
router.post('/', autorisation, multer, saucesCtrl.creerSauce);
router.put('/:id', autorisation, multer, saucesCtrl.modifierSauce);
router.delete('/:id', autorisation, saucesCtrl.supprimerSauce);
router.post('/:id/like', autorisation, saucesCtrl.likeSauce);

module.exports = router;