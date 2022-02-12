import {PrismaClient} from '@prisma/client'
import Controller from "../controllers/Controller";
import express from 'express';

export default class PlayerController implements Controller {
    public async index(req: express.Request, res: express.Response): Promise<Response> {
        let result: any;
        const prismaClient = new PrismaClient();
        let count: number = +req.query.count;
        let offset: number = +req.query.offset;

        prismaClient.$connect();

        if(!count && !offset) {
            result = await prismaClient.player.findMany();
        } else {
            result = await prismaClient.player.findMany({
                skip: (offset-1)*count,
                take: count,
            });
        }
        prismaClient.$disconnect();
        return result;
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
        prismaClient.$disconnect();
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
        prismaClient.$disconnect();
        return result;
    }

    update(id: any, req: express.Request, res: express.Response<any, Record<string, any>>): Promise<Response> {
        throw new Error('Method not implemented.');
    }

    delete(id: any, res: express.Response<any, Record<string, any>>): Promise<Response> {
        throw new Error('Method not implemented.');
    }
}
