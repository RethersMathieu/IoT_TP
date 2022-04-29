const jwt = require('jsonwebtoken');

module.exports = function (dbo) {
    return function ({ body }, res) {
        const { name, mac } = body;
        dbo.collection('user').findOne({ name, mac }, function (err, user) {
            if (err) return res.status(500).json({ error: 'Erreur inatandue.' })
            if (!user) return res.status(401).json({ error: 'Connection non authorisé.' });
            const objectUser = { userId: user._id, isAdmin: user.is_admin, };
            res.status(200).json({ ...objectUser, token: jwt.sign(objectUser, 'HS256', { expiresIn: '24h' }) });
        });
    }
};