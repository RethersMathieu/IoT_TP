const router = require("express").Router();

module.exports = function (dbo) {
    const router_pages =        require('./routerPages')(dbo);
    const router_esp =          require('./routerEsp')(dbo);
    const router_users =        require('./routerUsers')(dbo);
    const router_connexion =    require('./routerConnexion')(dbo);

    router.use('/', router_pages);
    router.use('/esp', router_esp);
    router.use('/users', router_users);
    router.use('/connexion', router_connexion);
    return router;
};