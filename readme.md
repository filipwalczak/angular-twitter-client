# Angular Twitter Client
Very basic Twitter client built with Angular and Node.js.
Features: authenticate to Twitter account via OAuth; view profile info, latest tweets, followers and following lists; post new tweets.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.5.

## Twitter API Keys
This application requires Twitter API Consumer Key and Secret to run. You can get them [here](https://apps.twitter.com/). Add them to the `server/.env` file.
```
CONSUMER_KEY=YOUR_KEY
CONSUMER_SECRET=YOUR_SECRET
```

## Run backend development server

Navigate to `server` directory.
```
npm install
node server
```

## Run client development server

Navigate to `client` directory.
```
npm install
ng serve
```
Navigate in the browser to `http://localhost:4200/`.
