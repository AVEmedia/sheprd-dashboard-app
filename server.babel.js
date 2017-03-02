import path from 'path';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import routes from './src/routes';
import { renderHTMLString } from '@sketchpixy/rubix/lib/node/router';
import RubixAssetMiddleware from '@sketchpixy/rubix/lib/node/RubixAssetMiddleware';

import Horizon from '@horizon/server';

const fs = require('fs');
const http = require('http');
const https = require('https');

const options = {
    key: fs.readFileSync('../localhost.key'),
    cert: fs.readFileSync('../localhost.crt')
};

const port = process.env.PORT || 8081;
//const port = process.env.PORT || 8443;

let app = express();
app.use(compression());
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'pug');

function renderHTML(req, res) {
  renderHTMLString(routes, req, (error, redirectLocation, html) => {
    if (error) {
      if (error.message === 'Not found') {
        res.status(404).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else {
      res.render('index', {
        content: html
      });
    }
  });
}

app.get('*', RubixAssetMiddleware('ltr'), (req, res, next) => {
  renderHTML(req, res);
});

app.listen(port, () => {
  console.log(`Node.js app is running at http://localhost:${port}/`);
});

/*
const httpsServer = https.createServer(options, app);

httpsServer.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`Node.js app is running at https://localhost:${port}/`);
    }
});
*/

// Start Horizon server
/*
const PORT = process.env.PORT || 4443;

const hzServer = https.createServer(options, app);

hzServer.listen(PORT, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`Horizon server is running at https://localhost:${PORT}/`);
    }
});

const tokenSecret = 'BcCXw8RKwovyuqAz9aBJJxjmVC/lRyahXjSmr8BKlGzkpKNqm4/k0Xl0Xh0BGHtZ81PUp1rqTSv77dy8uVUa7Q==';

const horizonOptions = {
    project_name: 'SheprdHorizon',
    auto_create_collection: false,
    auto_create_index: false,
    permissions: true,
    rdb_host: process.env.RDB_HOST || 'localhost',
    rdb_port: process.env.RDB_PORT || 28015,
    secure: true,
    auth: {
      token_secret: tokenSecret,
      duration: '1m',
      success_redirect: '/',
      failure_redirect: '/login'
    }
}

const horizonServer = Horizon(hzServer, horizonOptions);
const r = Horizon.r;

horizonServer._reql_conn._ready_promise.then((reql_conn) => {
    var doc = r.db('SheprdHorizon').table('users').getAll().run(reql_conn.connection());
});

horizonServer.add_auth_provider(Horizon.auth.auth0, {
  host: 'sheprd.auth0.com',
  id: 'nuURrdGcQA46xiUUKpFXyl4ZA3CfOGx0',
  secret: 'G-HnenB3xJEP0nkjlOjaLnuy8SvyO15rAvYhwF8Nj42AAL6p0hVjXs51TnoLeuee',
  path: 'auth0'
});
*/
