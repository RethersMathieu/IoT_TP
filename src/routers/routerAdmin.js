module.exports = function (dbo) {
    const controllers = require('../controllers/admin')(dbo);
    const auth = require('../controllers/auth')(dbo, undefined, undefined, true);
    const router =  require('express').Router();

    router.post('/all_in_wainting', auth, controllers.getAllInWaiting);
    router.post('/accept_new_user', auth, controllers.acceptNewUser);
    router.delete('/in_waiting', auth, controllers.declineNewUser);

    return router;
}