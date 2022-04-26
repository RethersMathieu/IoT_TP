const router = require('express').Router();
const controllers = require('../controllers/login');

router.post('/login', controllers.loginUser);
router.post('/login/admin', controllers.loginAdmin);

module.exports = router;