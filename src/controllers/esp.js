module.exports = function (dbo) {
  return {
    getData: function(req, res) {
      const { who } = req.query;
      const { limit } = req.query;
      const { what } = req.params;
      dbo
        .collection(what)
        .find({ who })
        .sort({ _id: -1 })
        .limit(limit ?? 200)
        .toArray(function (err, result) {
          if (err) throw err;
          res.status(200).json(result.reverse());
        });
    },
  };
};
