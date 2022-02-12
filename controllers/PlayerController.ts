import {PrismaClient} from '@prisma/client'
import Controller from "../controllers/Controller";
import express from 'express';
import bcrypt from 'bcrypt';
import { env } from 'process';

export default class PlayerController implements Controller {
    public async index(req: express.Request, res: express.Response): Promise<any> {
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
        return res.json(result);
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

    public async getUserByEmail(email: string, res: express.Response): Promise<any> {
        let result: any;
        const prismaClient = new PrismaClient();
        prismaClient.$connect();
        result = await prismaClient.player.findUnique({
            where: {
                email: email
            }
        });
        prismaClient.$disconnect();
        return result;
    }

    public async create(req: express.Request, res: express.Response): Promise<Response> {
        let result: any;
        if(this.getUserByEmail(req.body.email, res)) {
            res.status(400).send('Email must be unique.');
            return;
        }
        else if(this.show(req.body.username, res)) {
            res.status(400).send('Username must be unique.');
            return;
        }
        const prismaClient = new PrismaClient();
        prismaClient.$connect();
        await bcrypt.hash(req.body.password, +process.env.SECRET_ROUNDS).then(function(hash) {
            result = prismaClient.player.create({
                data: {
                    username: req.body.username,
                    email: req.body.email,
                    password: hash
                },
                select: {
                    username: true,
                    email: true,
                    created_at: true,
                },
            });
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
