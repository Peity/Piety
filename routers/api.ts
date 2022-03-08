import express, { response } from 'express';
import * as core from 'express-serve-static-core';
import { PlayerController } from '../controllers/playerController';
import { ClanController } from '../controllers/clanController';
import { MemberController } from '../controllers/memberController';

var playerController = new PlayerController();
var clanController = new ClanController();
var memberController = new MemberController();

export class Api {
    router: core.Router;

    constructor() {
        this.router = express.Router();
        this.initRoutes();
        console.log("Router initiated");
    }

    initRoutes() {
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
        this.router.get("/players", async (req, res) => {
            playerController.index(res);
        });


        /*
        ---------------------------------------------------------
                            Clan Routes
        ---------------------------------------------------------
        */

        // Create Clan
        this.router.post("/clan/create", async (req, res) => {
            clanController.create(req, res);
        });

        // Get Clan ny Slug
        this.router.get("/clan/:slug", async (req, res) => {
            clanController.show(req.params.slug, res);
        });

        // Delete Clans
        this.router.get("/clan/:slug/delete", async (req, res) => {
            clanController.delete(req.params.slug, res);
        });

        // Get All Clans
        this.router.get("/clans", async (req, res) => {
            clanController.index(res);
        });


        /*
        ---------------------------------------------------------
                            Member Routes
        ---------------------------------------------------------
        */

        // Create Member
        this.router.post("/clan/:clanSlug/member/create", async (req, res) => {
            memberController.create(req, res);
        });



        this.router.get("/test/:slug", async (req, res) => {
            playerController.getClan(req.params.slug, res);
        });
    }
}