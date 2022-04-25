const path = require("path");

function getUriPage() {
  return path.join(__dirname, '../pages');
}

module.exports = {
  '': function (req, res) { res.sendFile(path.join(`${getUriPage()}/ui_lucioles.html`)); },
};