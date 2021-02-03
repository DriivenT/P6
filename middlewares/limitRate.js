const rateLimit = require("express-rate-limit");

exports.limiteConnexion = rateLimit({
    windowMs: 300000, // 5 minutes
    max: 3 // Bloque après 3 essaies.
});

