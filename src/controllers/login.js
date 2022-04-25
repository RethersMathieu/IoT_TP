let dbo;
(async () => dbo = await require('../core/database/db'));
const jwt = require('jsonwebtoken');
const bcrypt = undefined;

module.exports = async (req, res, next) => {
    await dbo.collection('user').findOne({  })
}