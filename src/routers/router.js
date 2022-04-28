const router = require("express").Router();

module.exports = function (dbo) {
    const router_esp = require('./routerEsp')(dbo);
    const router_pages = require('./routerPages');

    router.use('/', router_pages);
    router.use('/esp', router_esp);
    return router;
};