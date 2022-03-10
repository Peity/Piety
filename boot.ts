import express from "express";
import * as bodyParser from 'body-parser';

import { Api } from "./routers/api";
import endpoint from './endpoints.config'
import { mongo } from "./config/database"; "./config/database";
import {preventCrossSiteScripting} from './middlewares/headers';

const {PORT,HOST} = endpoint;

var api = new Api();

// db connection
mongo;


  const app = express();
    app.use(bodyParser.json());
    app.use(preventCrossSiteScripting);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/api", api.router);
    app.listen(parseInt(PORT), HOST);
    console.log(`Running on http://localhost:${PORT}`);

