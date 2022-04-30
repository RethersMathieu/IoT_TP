const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const lodash = require('lodash');


function authSuccessDefault(_req, _res, next ) {
    next();
}

function authEchecDefault(_req, res) {
    res.status(401).json({ error_auth: 'Authentification invalid.' });
}

module.exports = function (dbo, success = authSuccessDefault, echec = authEchecDefault) {
    return function (req, res, next) {
        console.log(req.headers);
        const { authorization } = req.headers;
        const token =  authorization && authorization.split(' ')[1];
        console.log(token, !token);
        if (!token) {
            echec(req, res, next );
            return;
        };
        const { userId } = jwt.verify(token, 'HS256');
        console.log('User id : ', userId)
        dbo.collection('user').findOne({ _id: new ObjectId(userId) }, function (err, user) {
            console.log(user);
            if (err) return res.status(500).json({ error: 'Erreur inatandue.' })
            if (!lodash.isNil(user)) success(req, res, next);
            else if (echec) echec(req, res, next );
        });
    }
};