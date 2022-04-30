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

const accueil = function (req, res) { res.sendFile(path.join(`${getUriPage()}/accueil/accueil.html`)); };
const login = function (req, res) { res.sendFile(path.join(`${getUriPage()}/logIn/logIn.html`)); };
const signup = function (req, res) { res.sendFile(path.join(`${getUriPage()}/logIn/signUp.html`)); };
const graphs = function (req, res) { res.sendFile(path.join(`${getUriPage()}/graphs/ui_lucioles.html`)); }

module.exports =  function (dbo) {
  const auth = require('./auth');
  return {
    '/': {
      controller: accueil,
    },
    '/login': {
      controller: login,
    },
    '/signup': {
      controller: signup,
    },
    '/graphs': {
      controller: graphs,
    },
  };
}