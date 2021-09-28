import admin from 'firebase-admin';
import http from 'http';
import express from 'express';
import Router from './config/Router';

import { DB_URL, STORAGE_URL, PORT } from './config/environment';

//Start firebase admin config
const serviceAccount = require('./config/cert-dev.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: DB_URL,
    storageBucket: STORAGE_URL
})

const APP: express.Express = express();

new Router(APP);

http.createServer(APP).listen(process.env.PORT || PORT, () => {
    console.log(`Server is Running on port ${process.env.PORT || PORT}`);
});
