import express, { response } from 'express';
import * as core from 'express-serve-static-core';
import { PlayerController } from '../controllers/controller';

var playerController = new PlayerController();

export class Api {
    router: core.Router;

    constructor(){
        this.router = express.Router();
        this.initRoutes();
        console.log("Router initiated");
    }

    initRoutes(){
        this.router.get("/", (req, res) => {
            res.sendStatus(200);
        });

          /*
        ---------------------------------------------------------
                            Player Routes
        ---------------------------------------------------------
         */

        // Create Players
        this.router.post("/player/create", async (req, res) => {
            playerController.create(req, res);
        })
    }
}