import { Player, prisma, PrismaClient } from "@prisma/client";
import Controller from "../controllers/Controller";
import {body, validationResult } from 'express-validator';
import express from 'express';
import { ParamsDictionary } from "express-serve-static-core";

export default class PlayerCotroller implements Controller {

    index(): JSON {
        throw new Error("Method not implemented.");
    }

    public async show(username: string, res: express.Response): Promise<JSON> {
        var result: any;
        const prismaClient = new PrismaClient();
        prismaClient.$connect();
        result = await prismaClient.player.findUnique({
            where: {
                username: username
            }
        });

        return JSON.parse(result);
        
    }

    create(req: express.Request, res: express.Response): express.Response {
        throw new Error("Method not implemented.");
    }
    


}