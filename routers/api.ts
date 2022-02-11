import express from 'express';
import * as core from 'express-serve-static-core';
import PlayerController from '../controllers/PlayerController'

export class Api {
    router: core.Router;

    constructor() {
        this.router = express.Router();
        console.log('Router initiated');
        this.initRoutes();
        console.log('All Routes have been initialized');
    }

    initRoutes() {
        this.router.get('/', (req, res) => {
            res.sendStatus(200);
        });

        this.router.get('/player/:username', async (req, res) => {
            const playerController = new PlayerController();
            const username = req.params.username

            const result = await playerController.show(username, res);
            res.send(result);
        })
    }

}