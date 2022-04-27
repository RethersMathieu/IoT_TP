const router = require("express").Router();

module.exports = function (dbo) {
    const controllers = require("../controllers/esp")(dbo);
    router.get("/:what", controllers.getData);
    return router;
};
