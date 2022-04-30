module.exports = function (dbo) {
    return function (req, res) {
        dbo
          .collection('user')
          .find({})
          .map(({ name, mac }) => ({ name, mac }))
          .toArray(function (err, result) {
            if (err) return res.status(500).json({ error: 'Erreur inatandue.' });
            res.status(200).json(result);
          });
      }
}