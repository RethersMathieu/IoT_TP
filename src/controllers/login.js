const jwt = require('jsonwebtoken');

module.exports = function (dbo) {
    return function ({ body }, res) {
        const name = body.name.toLowerCase();
        const mac = body.mac.toUpperCase();
        dbo.collection('user').findOne({ name, mac }, function (err, user) {
            if (err) return res.status(500).json({ error: 'Erreur inatandue.' })
            if (!user) return res.status(401).json({ error: 'Connection non authorisé.' });
            res.status(200).json({ name: user.name, mac: user.mac, token: jwt.sign({ userId: user._id }, 'HS256', { expiresIn: '24h' }) });
        });
    }
};