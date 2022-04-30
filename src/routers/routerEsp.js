const router = require("express").Router();

module.exports = function (dbo) {
    const auth = require('../controllers/auth');
    const controllers = require("../controllers/esp")(dbo);
    router.get("/:what", auth, controllers.getData);
    return router;
};
