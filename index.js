const path = require('path');
const cors = require('cors');
const jwt = require('express-jwt');
const express = require('express');
const compression = require('compression');

const api = require('./lib/api.js');
const lib = require('./lib/helpers.js');

const app = express();

app.use(compression());
app.use(cors({ credentials: true, origin: true }));

// serve React app
const clientPath = path.join(__dirname, '/client/build');
app.use('/', express.static(clientPath));
app.use('/static', express.static(clientPath + '/static'));

// handle GitHub authentication
app.get('/auth/github/:code', lib.handleAuth);

// serve jwt-authed API
//app.all('/api/*', jwt({ secret: process.env.SECRET }), lib.validateUser);
app.get('/api/item/:id', api.getItem);
app.get('/api/stories/:cat/:page', api.getStories);
app.get('/api/comments/:id', api.getComments);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running at http://localhost:${port}...`);
});
