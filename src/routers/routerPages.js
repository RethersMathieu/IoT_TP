const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const controllers = require("../controllers/pages");

app.use(express.static(path.join(__dirname, '../pages')))

Object.entries(controllers).forEach(([key, controller]) => {
    router.get(`/${key}`, controller);
});

module.exports = router;
