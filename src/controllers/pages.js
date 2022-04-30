const path = require("path");

function getUriPage() {
  return path.join(__dirname, '../pages');
}

const accueil = function (req, res) { res.sendFile(path.join(`${getUriPage()}/accueil/accueil.html`)); };
const login = function (req, res) { res.sendFile(path.join(`${getUriPage()}/logIn/logIn.html`)); };
const signup = function (req, res) { res.sendFile(path.join(`${getUriPage()}/logIn/signUp.html`)); };
const graphs = function (req, res) { res.sendFile(path.join(`${getUriPage()}/graphs/ui_lucioles.html`)); };
const admin = function (req, res) { res.sendFile(path.join(`${getUriPage()}/admin/tabNewUsers.html`)); };

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
    '/admin': {
      controller: admin,
    }
  };
}