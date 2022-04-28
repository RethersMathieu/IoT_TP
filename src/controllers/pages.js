const path = require("path");

function getUriPage() {
  return path.join(__dirname, '../pages');
}

module.exports = {
  '/': function (req, res) { res.sendFile(path.join(`${getUriPage()}/accueil/ui_lucioles.html`)); },
  '/login': function (req, res) { res.sendFile(path.join(`${getUriPage()}/logIn/logIn.html`)); },
  '/signUp': function (req, res) { res.sendFile(path.join(`${getUriPage()}/logIn/signUp.html`)); },
};