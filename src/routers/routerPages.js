const router = require("express").Router();
const controllers = require("../controllers/pages");

Object.entries(controllers).forEach(([key, controller]) => {
    router.get(`/${key}`, controller);
});

module.exports = router;
