const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../pages')))
module.exports = function (dbo) {
    const router = express.Router();
    const controllers = require("../controllers/pages")(dbo);

    Object.entries(controllers).forEach(([key, { controller }]) => {
        router.get(key, controller);
    });

    return router;
};
