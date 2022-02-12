import {PrismaClient} from '@prisma/client'
import Controller from "../controllers/Controller";
import express from 'express';

export default class PlayerCotroller implements Controller {
    index(): JSON {
        throw new Error("Method not implemented.");
    }

    public async show(username: string, res: express.Response): Promise<any> {
        let result: any;
        const prismaClient = new PrismaClient();
        prismaClient.$connect();
        result = await prismaClient.player.findUnique({
            where: {
                username: username
            }
        });
        return result;
    }

    public async create(req: express.Request, res: express.Response): Promise<Response> {
        let result: any;
        const prismaClient = new PrismaClient();
        prismaClient.$connect();
        result = await prismaClient.player.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
        });
        return result;
    }
}
