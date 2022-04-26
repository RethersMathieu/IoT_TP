let dboPromise = require('../core/database/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

async function loginUser(req, res)  {
    const dbo = await dboPromise;
    await dbo.collection('user').findOne({ name: req.body.name })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Introuvable !' });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrecte' });
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' })
            });
        }).catch(error => res.status(500).json({ error }));
    }).catch(error => res.status(500).json({ error }));
}

async function loginAdmin(req, res)  {
    const dbo = await dboPromise;
    await dbo.collection('admin').findOne({ name: req.body.name })
    .then(admin => {
        if (!admin) {
            return res.status(401).json({ error: 'Introuvable !' });
        }
        bcrypt.compare(req.body.password, admin.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrecte' });
            }
            res.status(200).json({
                adminId: admin._id,
                token: jwt.sign({ adminId: admin._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' })
            });
        }).catch(error => res.status(500).json({ error }));
    }).catch(error => res.status(500).json({ error }));
}

module.exports = {loginUser, loginAdmin};