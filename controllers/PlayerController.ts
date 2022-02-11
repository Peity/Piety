import {PrismaClient} from '@prisma/client'
import Controller from "../controllers/Controller";
import express from 'express';

export default class PlayerCotroller implements Controller {

    index(): JSON {
        throw new Error("Method not implemented.");
    }

    public async show(username: string, res: express.Response): Promise<any> {
        var result: any;
        const prismaClient = new PrismaClient();
        prismaClient.$connect();
        result = await prismaClient.player.findUnique({
            where: {
                username: username
            }
        });

        return result;

    }

    create(req: express.Request, res: express.Response): express.Response {
        throw new Error("Method not implemented.");
    }


}