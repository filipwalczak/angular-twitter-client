'use strict';

const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const inspect = require('util-inspect');
const request = require('request');
const querystring = require('querystring');
const cors = require('cors');

const app = express();

const corsOption = {
  origin: true,
  methods: 'GET,POST',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

const oauthMiddleware = (req, res, next) => {
  req.oauth = {
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    token: req.session.oauth.token,
    token_secret: req.session.oauth.token_secret
  }
  next();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: "ywNiTXWVnCQ59ajo1g6a",
                 resave: false,
                 saveUninitialized: false,
                 cookie: { httpOnly: true }}));

app.get('/login', (req, res) => {
  // OAuth step 1
  let oauth = {
            callback: 'http://127.0.0.1:8080/login/callback',
            consumer_key: consumerKey,
            consumer_secret: consumerSecret
  };
  let tokenUrl = 'https://api.twitter.com/oauth/request_token';

  request.post({url:tokenUrl, oauth:oauth}, (e, r, body) => {
    if (e || r.statusCode !== 200) {
      res.status(500).send({message: "Error getting OAuth request token : " + inspect(e)});
    } else {
      // OAuth step 2
      let tokenData = querystring.parse(body)
      let authUrl = 'https://api.twitter.com/oauth/authenticate'
        + '?' + querystring.stringify({oauth_token: tokenData.oauth_token});
      req.session.oauthRequestToken = tokenData.oauth_token;
      req.session.oauthRequestTokenSecret = tokenData.oauth_token_secret;
      res.send({url: authUrl});
    }
  });
});

app.get('/login/callback', (req, res) => {
  let authData = req.query;
  let oauth =
      {
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        token: authData.oauth_token,
        token_secret: req.session.oauthRequestTokenSecret,
        verifier: authData.oauth_verifier
      };
  let url = 'https://api.twitter.com/oauth/access_token';

  // OAuth step 3
  request.post({url: url, oauth: oauth}, (e, r, body) => {
    let permAuthData = querystring.parse(body);
    req.session.oauth = {};
    req.session.oauth.token = permAuthData.oauth_token;
    req.session.oauth.token_secret = permAuthData.oauth_token_secret;
    req.session.oauth.screen_name = permAuthData.screen_name;
    req.session.oauth.user_id = permAuthData.user_id;
    res.redirect('http://127.0.0.1:4200/profile');
  });
});

app.get('/logout', (req, res) => {
  if (req.session.oauth) {
    req.session.oauth = null;
    res.status(200).send({message: 'User logged out succesfully.'});
  } else {
    res.status(500).send({message: 'User already logged out.'})
  }
});

app.get('/is-logged', (req, res) => {
  if (req.session.oauth) {
    res.status(200).send({logged: true});
  } else {
    res.status(200).send({logged: false});
  }
});

app.get('/user', oauthMiddleware, (req, res) => {
  let url = 'https://api.twitter.com/1.1/account/verify_credentials.json';
  request.get({url: url, oauth: req.oauth}, (e, r, body) => {
    if (e || r.statusCode !== 200) {
      res.status(500).send({message: 'Error getting user data : ' + inspect(e)});
    } else {
      res.status(200).send(body);
    }
  });
});

app.get('/tweets', oauthMiddleware, (req, res) => {
  let url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name='
            + req.session.oauth.screen_name
            + '&count=10';
  request.get({url: url, oauth: req.oauth}, (e, r, body) => {
    if (e || r.statusCode !== 200) {
      res.status(500).send({message: 'Error getting user tweets : ' + inspect(e)});
    } else {
      res.status(200).send(body);
    }
  });
});

app.post('/tweets', oauthMiddleware, (req, res) => {
  let url = 'https://api.twitter.com/1.1/statuses/update.json?'
            + querystring.stringify(req.body);
  request.post({url: url, oauth: req.oauth}, (e, r, body) => {
    if (e || r.statusCode !== 200) {
      res.status(500).send({message: 'Error posting new tweet : ' + inspect(e)});
    } else {
      res.status(200).send(body);
    }
  });
});

app.get('/followers', oauthMiddleware, (req, res) => {
  let url = 'https://api.twitter.com/1.1/followers/list.json?screen_name='
            + req.session.oauth.screen_name
  request.get({url: url, oauth: req.oauth}, (e, r, body) => {
    if (e || r.statusCode !== 200) {
      res.status(500).send({message: 'Error getting followers : ' + inspect(e)});
    } else {
      res.status(200).send(body);
    }
  });
});

app.get('/friends', oauthMiddleware, (req, res) => {
  let url = 'https://api.twitter.com/1.1/friends/list.json?screen_name='
            + req.session.oauth.screen_name
  request.get({url: url, oauth: req.oauth}, (e, r, body) => {
    if (e || r.statusCode !== 200) {
      res.status(500).send({message: 'Error getting friends : ' + inspect(e)})
    } else {
      res.status(200).send(body);
    }
  });
});

app.listen(8080, function() {
  console.log('App running on port 8080!');
});
