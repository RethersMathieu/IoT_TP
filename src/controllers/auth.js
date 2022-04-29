const jwt = require('jsonwebtoken');

function authUser(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const { userId } = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        if (req.body.userId && req.body.userId !== userId) {
            throw new Error('Invalid user ID');
        } else next();
    } catch (e) {
        res.status(401).json({ error: new Error('TOKEN invalid') });
    }
}

module.exports = function (dbo) {
    return function(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const { userId } = jwt.verify(token, 'HS256');
        
    }
};