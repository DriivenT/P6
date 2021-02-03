const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/auth');

const limitRate = require('../middlewares/limitRate');

router.post('/signup', userCtrl.signup);
router.post('/login', limitRate.limiteConnexion, userCtrl.login);

module.exports = router;