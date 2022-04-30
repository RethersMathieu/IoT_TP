const path = require("path");

function getUriPage() {
  return path.join(__dirname, '../pages');
}

module.exports = {
  '/': function (req, res) { res.sendFile(path.join(`${getUriPage()}/accueil/accueil.html`)); },
  '/login': function (req, res) { res.sendFile(path.join(`${getUriPage()}/logIn/logIn.html`)); },
  '/signUp': function (req, res) { res.sendFile(path.join(`${getUriPage()}/logIn/signUp.html`)); },
  '/graphs': function (req, res) { res.sendFile(path.join(`${getUriPage()}/graphs/ui_lucioles.html`)); }
};