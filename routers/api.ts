import express from 'express';
import * as core from 'express-serve-static-core';
import PlayerController from '../controllers/PlayerController';
import {body, validationResult} from 'express-validator';

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
        });

        this.router.post(
            '/player',
            body('username').not().isEmpty().trim().escape(),
            body('email').isEmail(),
            body('password').isLength({ min: 6 }),
            async (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }

                const playerController = new PlayerController();
                const result = await playerController.create(req, res);
                res.send(result);
            }
        );
    }

}
