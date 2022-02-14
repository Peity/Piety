import {PrismaClient} from '@prisma/client'
import Controller from "../controllers/Controller";
import express from 'express';
import bcrypt from 'bcrypt';

export default class PlayerController implements Controller {
    prismaClient: PrismaClient;
    // Database fields selection
    select = {
        id: true,
        username: true,
        email: true,
        created_at: true
    };

    constructor() {
        this.prismaClient = new PrismaClient({
            errorFormat: 'minimal'
        });
    }

    /**
     *
     * @param req
     * @param res
     */
    public async index(req: express.Request, res: express.Response): Promise<void> {
        let result: any;
        let count: number = +req.query.count;
        let offset: number = +req.query.offset;

        this.prismaClient.$connect();

        if (!count && !offset) {
            result = await this.prismaClient.player.findMany({
                select: this.select
            });
        } else {
            result = await this.prismaClient.player.findMany({
                skip: (offset - 1) * count,
                take: count,
                select: this.select
            });
        }
        this.prismaClient.$disconnect();
        if (result.length === 0) {
            const e = `{
                "message": "no user found"
            }`;
            result = JSON.parse(e);
            res.status(404);
        }
        res.send(result);
    }
    
    /**
     *
     * @param req
     * @param res
     */
     public async create(req: express.Request, res: express.Response): Promise<void> {
        let result: any;
        if(await this.prismaClient.player.findUnique({where: {email: req.body.email}})) {
            const e = `{
                "message": "email must be unique"
            }`;
            result = JSON.parse(e);
            res.status(400);
        }
        else if(await this.prismaClient.player.findUnique({where: {username: req.body.username}})) {
            const e = `{
                "message": "username must be unique"
            }`;
            result = JSON.parse(e);
            res.status(400);
        }
        else {
            this.prismaClient.$connect();
            const pc = this.prismaClient
            await bcrypt.hash(req.body.password, +process.env.SECRET_ROUNDS).then(function (hash) {
                result = pc.player.create({
                    data: {
                        username: req.body.username,
                        email: req.body.email,
                        password: hash
                    },
                    select: this.select
                });
            });
            this.prismaClient.$disconnect();
        }
        res.send(result);
    }

    /**
     *
     * @param username
     * @param res
     */
    public async show(username: string, res: express.Response): Promise<void> {
        let result: any;
        this.prismaClient.$connect();
        result = await this.prismaClient.player.findUnique({
            where: {
                username: username
            },
            select: this.select
        });
        this.prismaClient.$disconnect();
        if(result === null){
            const e = `{
                "message": "404 not found"
            }`;
            result = JSON.parse(e);
            res.status(404);
        }
        res.send(result);
    }

    /**
     *
     * @param id
     * @param res
     */
     delete(id: any, res: express.Response): Promise<void> {
        throw new Error('Method not implemented.');
    }

    /**
     *
     * @param id
     * @param req
     * @param res
     */
    update(id: any, req: express.Request, res: express.Response): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
