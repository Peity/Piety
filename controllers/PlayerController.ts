import {PrismaClient} from '@prisma/client'
import Controller from "../controllers/Controller";
import express from 'express';
import bcrypt from 'bcrypt';

export default class PlayerController implements Controller {
    prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient({
            errorFormat: 'minimal'
        });
    }
    public async index(req: express.Request, res: express.Response): Promise<any> {
        let result: any;
        let count: number = +req.query.count;
        let offset: number = +req.query.offset;

        this.prismaClient.$connect();

        if (!count && !offset) {
            result = await this.prismaClient.player.findMany();
        } else {
            result = await this.prismaClient.player.findMany({
                skip: (offset - 1) * count,
                take: count,
            });
        }
        this.prismaClient.$disconnect();
        if (result === null) {
            const e = `{
                "message": "404 not found"
            }`;
            const json = JSON.parse(e);
            res.send(json);
            return;
        }
        res.send(result);
    }

    public async show(username: string, res: express.Response): Promise<any> {
        let result: any;
        this.prismaClient.$connect();
        result = await this.prismaClient.player.findUnique({
            where: {
                username: username
            }
        });
        this.prismaClient.$disconnect();
        return result;
    }

    public async getUserByEmail(email: string, res: express.Response): Promise<any> {
        let result: any;
        this.prismaClient.$connect();
        result = await this.prismaClient.player.findUnique({
            where: {
                email: email
            }
        });
        this.prismaClient.$disconnect();
        return result;
    }

    public async create(req: express.Request, res: express.Response): Promise<Response> {
        let result: any;
        if(await this.getUserByEmail(req.body.email, res)) {
            res.status(400).send('Email must be unique.');
            return;
        }
        else if(await this.show(req.body.username, res)) {
            res.status(400).send('Username must be unique.');
            return;
        }

        this.prismaClient.$connect();
        const pc = this.prismaClient
        await bcrypt.hash(req.body.password, +process.env.SECRET_ROUNDS).then(function (hash) {
            result = pc.player.create({
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
        this.prismaClient.$disconnect();
        return result;

    }

    update(id: any, req: express.Request, res: express.Response<any, Record<string, any>>): Promise<Response> {
        throw new Error('Method not implemented.');
    }

    delete(id: any, res: express.Response<any, Record<string, any>>): Promise<Response> {
        throw new Error('Method not implemented.');
    }
}
