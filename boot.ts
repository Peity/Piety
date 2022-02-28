import express from "express";
import mongoose from "mongoose";
import { Api } from "./routers/api";
import { Player } from "./models/player";
import * as bodyParser from 'body-parser';

const HOST = '0.0.0.0';
const PORT = 8080;

var api = new Api();

mongoose.connect('mongodb://developer:123123@localhost:27017/Piety')
  .then(() => {
    console.log("Successfullt connected to mongoDB");
  },
  (err) => {
    console.log(err);
    
  });


  const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/api", api.router);
    app.listen(PORT, HOST);
    console.log(`Running on http://localhost:${PORT}`);

