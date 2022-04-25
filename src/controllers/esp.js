let dbo;
(async () => dbo = await require('../core/database/db'))();

function allAdressMax(req, res) {

}

function getData(req, res) {
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
}

module.exports = { getData };
