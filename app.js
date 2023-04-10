const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
}));

const keycloak = new Keycloak({
    store: new session.MemoryStore()
});

app.use(keycloak.middleware({
    logout: '/logout',
    admin: '/',
}));

app.get('/', keycloak.protect(), (req, res) => {
    res.send(`Access token: ${req.session['keycloak-token']}`);
});

app.get('/login', keycloak.protect(), (req, res) => {
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
