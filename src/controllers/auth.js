const jwt = require('jsonwebtoken');
module.exports = function (dbo, success, echec) {
    return function (req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        const { userId } = jwt.verify(token, 'HS256');
        dbo.collection('user').findOne({ _id: userId }, function (err, user) {
            if (err) return res.status(500).json({ error: 'Erreur inatandue.' })
            if (user && success) success({ res, next });
            else if (echec) echec({ res, next });
        });
    }
};