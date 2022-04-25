const router = require("express").Router();
const controllers = require("../controllers/esp");

router.get("/:what", controllers.getData);

module.exports = router;
