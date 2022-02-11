import express from 'express';
import * as core from 'express-serve-static-core';
import PlayerController from '../controllers/PlayerController'

export class Api{
    router: core.Router;

    constructor(){
        this.router = express.Router();
        console.log('Router initiated');
        this.initRoutes();
        console.log('All Routes have been initialized');
    }

    initRoutes() {
        this.router.get('/', (req, res) => {
            res.sendStatus(200);
        });

        this.router.get('/player/:username', (req, res) => {
            const playerController = new PlayerController();
<<<<<<< HEAD
            playerController.show('Hello', res).then(
                function (result){
                    res.json(result);
                },
                function(error){
                    res.status(400);
                }
            );
        })
=======
            playerController.show('Hello', res);
        });
>>>>>>> 42c2fc4a56034bffeff20018b5b3036f1bc34a29
    }
   
}