function signup(dbo, callback) {
    return function ({ body }, res, next) {
        const newUser = { name: body.name, mac: body.mac };
        dbo.collection('user').findOne(newUser, function (err, user) {
            if (err) return res.status(500).json({ error: 'Erreur inatandue.' });
            if (user) return res.status(401).json({ error: 'L\'utilisateur est déjà exitant.' });
            dbo.collection('in-waiting').insertOne(newUser, function (err, reponse) {
                if (err || !reponse) return res.status(500).json({ error: 'Erreur inatandue.' })
                callback(newUser, { res, next });
            });
        });
    }
}

module.exports = function (dbo) {
    return {
        signupNext: signup(dbo, (user, { next }) => next()),
        signupRes: signup(dbo, ({ name }, { res }) => res.status(200).json({ message: `L'utilisateur ${name} a fais la demande.` }))
    }
}