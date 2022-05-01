const router = require("express").Router();

module.exports = function (dbo) {
    const router_pages =        require('./routerPages')(dbo);
    const router_esp =          require('./routerEsp')(dbo);
    const router_users =        require('./routerUsers')(dbo);
    const router_connexion =    require('./routerConnexion')(dbo);
    const router_admin =        require('./routerAdmin')(dbo);

    router.use('/',             router_pages);
    router.use('/esp',          router_esp);
    router.use('/users',        router_users);
    router.use('/connexion',    router_connexion);
    router.use('/admin',        router_admin);
    return router;
};