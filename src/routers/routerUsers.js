module.exports = function (dbo) {
    const router = require('express').Router();
    const getAll = require('../controllers/users')(dbo);
    router.get('/all', getAll);
    return router;
}