import express from "express";
import mongoose from "mongoose";
import { Api } from "./routers/api";
import { Player } from "./models/player";
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();


var api = new Api();

mongoose.connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("Successfully connected to mongoDB");
  },
  (err) => {
    console.log(err);
    
  });


  const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/api", api.router);
    app.listen(parseInt(process.env.PORT as string), process.env.HOST as string);
    console.log(`Running on http://localhost:${process.env.PORT}`);

