import express, { response } from 'express';
import * as core from 'express-serve-static-core';
import { PlayerController } from '../controllers/playerController';

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
        });

        // Get Player by slug
        this.router.get("/player/:slug", async (req, res) => {
            playerController.show(req.params.slug, res);
        })
        
        // Delete Player
        this.router.get("/player/:slug/delete", async (req, res) => {
            playerController.delete(req.params.slug, res);
        })

        // update Players
        this.router.post("/player/:slug/update", async (req, res) => {
            playerController.update(req.params.slug, req, res);
        });

        // Get All Players
        this.router.get("/players" , async (req, res) => {
            playerController.index(res);
        });

    }
}