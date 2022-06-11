# <b>IoT_TP</b>

Auteur: RETHERS Mathieu, ALCARAZ Yannick

## <b><u>Point forts</u></b>
Durant ce projet, nous avons utilisé un système de tokens. Ce système permet de valider l’accès d’un  à un service Web ou à une page tout en évitant l’enregistrement des informations d’identification en Front-End.

Ce système génère une clé dynamique (également connue sous le nom de token) selon des paramètres d’encodage.
Dans notre cas, le token est encodé sous l’algorithme « HS256 ».

Dans un premier temps, nous avons installé le paquet “jsonwebtoken”. Ce paquet a été développé par l’entreprise Auth0 spécialisée dans la sécurisation de l'authentification.

Vous pouvez trouver la documentation du paquet ici.

JSON Web Token est un standard ouvert défini dans le RFC 7519. Il permet l'échange sécurisé de jetons entre plusieurs parties. Cette sécurité de l’échange se traduit par la vérification de l'intégrité et de l'authenticité des données. Elle s’effectue par l'algorithme HMAC ou RSA.

### <b><u>Installation JsonWebToken pour NodeJS :</u></b>
```
npm install jsonwebtoken
```
### <b><u>Appel du module :</u></b>
```js
const jwt = require('jsonwebtoken');
```
### <b><u>Contrôleur de connexion :</u></b>
De plus, nous avons développé un contrôleur afin que l’utilisateur puisse se connecter à notre application. Lorsque le contrôleur reçoit une requête, il vérifie si le nom d’utilisateur et l’adresse mac envoyé en JSON sont bien enregistrés dans la collection user de notre base de données MongoDB.

Si aucun utilisateur n’est trouvé alors il envoie une erreur 401.

Cependant, si l’utilisateur est trouvé, le contrôleur génère un token en se basant sur l’id de l'utilisateur autogénéré dans la base MongoDB. Ce token est généré grâce au package “jsonwebtoken” sous l’encodage HS256. 

Une fois le token généré, il est envoyé sous format JSON à l’utilisateur. De ce fait, le token de l’utilisateur est stocké dans la sessionStorage.
```js
const jwt = require('jsonwebtoken');

module.exports = function (dbo) {
    return function ({ body }, res) {
        const name = body.name.toLowerCase();
        const mac = body.mac.toUpperCase();
        dbo.collection('user').findOne({ name, mac }, function (err, user) {
            if (err) return res.status(500).json({ error: 'Erreur inatandue.' })
            if (!user) return res.status(401).json({ error: 'Connection non authorisé.' });
            res.status(200).json({ name: user.name, mac: user.mac, isAdmin: user.is_admin || false, token: jwt.sign({ userId: user._id }, 'HS256', { expiresIn: '24h' }) });
        });
    }
};
```
### <b><u>Contrôleur d'authenfication :</u></b>
Lors de l’appel de certains services web, il est attendu dans l’en-tête la propriété “Authorization”.

#### <u>Exemple :</u>
```js
function getAllUsers() {
  const json = sessionStorage.getItem('user');
  const { token } = json ? JSON.parse(json) : {};
  return async_ajax({
    url: location.origin.concat('/users/all'),
    type: 'GET',
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  });
}
```
Nous faisons appel au contrôleur “Auth” pour lancer chacun des autres contrôleurs nécessitant une authentification au sein de l’application. 

Lorsqu’un utilisateur lance l’application, le contrôleur “Auth” vérifie l'existence d’un token et le décrypte afin de récupérer l’id de l’utilisateur.  

En fonction de l’id qui est authentifié, l’utilisateur aura l’autorisation d’accéder à certains services.

Ce système est utile, car il nous a permis de gérer les utilisateurs admin au sein de l’application.

#### <u>Contrôleur d'authentification :</u>
```js
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const lodash = require('lodash');


function authSuccessDefault(_req, _res, next ) {
    next();
}

function authEchecDefault(_req, res) {
    res.status(401).json({ error_auth: 'Authentification invalid.' });
}

module.exports = function (dbo, success = authSuccessDefault, echec = authEchecDefault, for_admin = false) {
    return function (req, res, next) {
        const { authorization } = req.headers;
        const token =  (authorization && authorization.split(' ')[1]);
        if (token === typeof undefined || token === typeof null) {
            echec(req, res, next );
            return;
        }
        const { userId } = jwt.verify(token, 'HS256');
        dbo.collection('user').findOne({ _id: new ObjectId(userId) }, function (err, user) {
            const access = for_admin ? user.is_admin || false : true;
            if (err) return res.status(500).json({ error: 'Erreur inatandue.' })
            if (!lodash.isNil(user) && access) success(req, res, next);
            else if (echec) echec(req, res, next );
        });
    }
};
```
#### <u>Exemple d'utilisation</u>
```js
module.exports = function (dbo) {
    const router = require('express').Router();
    const auth = require('../controllers/auth')(dbo);
    const getAll = require('../controllers/users')(dbo);
    router.get('/all', auth, getAll);
    return router;
}
```

Pour finir, si l’utilisateur se déconnecte, la fonction « disconnect » est appelée.
Elle permet de supprimer l’item “User” contenant le token de l’utilisateur qui est présent au sein de SessionStorage.

```js
function disconnect(){
    sessionStorage.removeItem("user");
    location.href = location.origin.concat('/');
}
```
