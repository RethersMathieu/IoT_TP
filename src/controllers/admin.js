const { ObjectId } = require("mongodb");

module.exports = function (dbo) {
    return {
        getAllInWaiting: (req, res) => {
            dbo
                .collection('in_waiting')
                .find()
                .toArray(function (err, result) {
                    if (err) return res.status(500).json({ error: 'Erreur inatandue.' });
                    res.status(200).json(result);
                });
        },
        acceptNewUser: (req, res) => {
            const { user_id } = req.body;
            const collectionInWaiting = dbo.collection('in_waiting');
            collectionInWaiting.findOne({ _id: new ObjectId(user_id) }, function (err, newUser) {
                if (err) return res.status(500).json({ error: 'Erreur inatandue.' });
                if (!newUser) return res.status(401).json({ error: 'Utilisateur introuvable dans les demandeurs.' })

                const { name, mac } = newUser;
                dbo.collection('user').insertOne({ name, mac }, function (err, { name }) {
                    if (err) return res.status(500).json({ error: 'Erreur inatandue.' });
                    collectionInWaiting.deleteOne({ _id: new ObjectId(user_id) });
                    res.status(200).json({ message: `Nouveau utilisateur ajouté. NAME: ${name}` });
                });
            });
        },
        declineNewUser: (req, res) => {
            const { user_id } = req.body;
            dbo.collection('in_waiting').deleteOne({ _id: new ObjectId(user_id) }, function (err, userDeleted) {
                if (err) return res.status(500).json({ error: 'Erreur inatandue.' });
                if (!userDeleted) return res.status(401).json({ error: 'Utilisateur introuvable dans les demandeurs.' })
                res.status(200).json({ message: `L'utilisateur ${userDeleted.name} a été décliné.` })
            });
        },
    };
};