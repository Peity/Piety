import express from 'express';
import * as core from 'express-serve-static-core';
import PlayerController from '../controllers/PlayerController';
import ClanController from '../controllers/ClanController';
import {body, check, validationResult} from 'express-validator';
import MemberController from "../controllers/MemberController";

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

        /*
        ---------------------------------------------------------
                            Player Routes
        ---------------------------------------------------------
         */

        //Show Players
        this.router.get('/player/:username', async (req, res) => {
            const playerController = new PlayerController();
            const username = req.params.username
            await playerController.show(username, res);
        });

        //Index Players
        this.router.get('/players', async (req, res) => {
            const playerController = new PlayerController();
            await playerController.index(req, res);
        });

        //Crate Player
        this.router.post(
            '/player/create',
            body('username').not().isEmpty().trim().escape(),
            body('email').isEmail(),
            body('password').isLength({min: 6}),
            async (req, res) => {
                try {
                    const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                        return res.status(400).json({errors: errors.array()});
                    }

                    const playerController = new PlayerController();
                    const result = await playerController.create(req, res);
                    res.send(result);
                } catch (e) {
                    res.send(e.message);
                }
            }
        );

        /*
        ---------------------------------------------------------
                            Clan Routes
        ---------------------------------------------------------
         */

        //Show Clan
        this.router.get('/clan/:slug', async (req, res) => {
            const clanController = new ClanController();
            const clanSlug = req.params.slug;
            await clanController.show(clanSlug, res);
        });

        //Index Clans
        this.router.get('/clan/', async (req, res) => {
            const clanController = new ClanController();
            await clanController.index(req, res);
        });

        //Create Clan
        this.router.post(
            '/clan/create',
            body('clan_id').not().isEmpty(),
            body('name').not().isEmpty(),
            async (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).send(errors.array());
                }

                const clanController = new ClanController();
                await clanController.create(req, res);
            });

        /*
        ---------------------------------------------------------
                    Member Routes
        ---------------------------------------------------------
        */
        //Create Member
        this.router.post(
            '/member/create',
            async (req, res) => {
                await check('clan_id').not().isEmpty();
                await check('name').not().isEmpty;
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).send(errors.array());
                }
                const memberController = new MemberController();
                await memberController.create(req, res);
            }
        );
    }
}
