module.exports = function (dbo) {
    const router = require('express').Router();
    const login = require('../controllers/login')(dbo);
    const signup = require('../controllers/signup')(dbo);

    router.post('/login', login);
    router.post('/signup', signup.signupRes);
    return router;
}