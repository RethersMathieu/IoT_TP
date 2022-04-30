module.exports = function (dbo) {
    const router = require('express').Router();
    const auth = require('../controllers/auth')(dbo);
    const getAll = require('../controllers/users')(dbo);
    router.get('/all', auth, getAll);
    return router;
}