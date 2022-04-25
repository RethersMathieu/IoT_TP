const router = require("express").Router();
const router_esp = require('./routerEsp');
const router_pages = require('./routerPages');

router.use('/', router_pages);
router.use('/esp', router_esp);

module.exports = router;