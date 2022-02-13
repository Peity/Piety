import {PrismaClient, Prisma} from '@prisma/client'
import Controller from "../controllers/Controller";
import express from 'express';
import slugify from 'slugify';
import {body} from "express-validator";

export default class ClanController implements Controller{

    prismaClient: PrismaClient;

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

        if(!count && !offset) {
            result = await this.prismaClient.clan.findMany();
        } else {
            result = await this.prismaClient.clan.findMany({
                skip: (offset-1)*count,
                take: count,
            });
        }
        this.prismaClient.$disconnect();
        return result;
    }

    /**
     *
     * @param req
     * @param res
     */
    public async create(req: express.Request, res: express.Response): Promise<void> {
        let result: any;
        const slug = slugify(req.body.slug).toLocaleLowerCase();
        this.prismaClient.$connect();
        try {
            result = await this.prismaClient.clan.create({
                data: {
                    owner: {
                        connect: {
                            id: +req.body.owner_id
                        },
                    },
                    name: req.body.name,
                    slug: slug,
                    gold: 1000,
                    supply: 1000,
                    level: 0.0
                }
            });
            this.prismaClient.$disconnect();
            res.send(result);
        }catch (e) {
            if (e.code == "P2014") {
                const message = `{
                    "message": "This user already have another clan."
                }`;
                const json = JSON.parse(message);
                res.status(400).send(json);
                return;
            }
            else{
                const message = `{
                    "message": "${e.message}"
                }`;
                const json = JSON.parse(message);
                res.status(400).send(json);
                return;
            }
        }

    }

    /**
     *
     * @param slug
     * @param res
     */
    public async show(slug: string, res: express.Response): Promise<void> {
        let result: any;
        slugify(slug);
        this.prismaClient.$connect();
        result = await this.prismaClient.clan.findUnique({
            where: {
                slug: slug
            }
        });
        this.prismaClient.$disconnect();
        if(result === null){
            const e = `{
                "message": "404 not found"
            }`;
            const json = JSON.parse(e);
            res.status(404).send(json);
            return;
        }
        res.send(result);
    }

    /**
     *
     * @param slug
     * @param res
     */
    public async delete(slug: string, res: express.Response): Promise<void> {

        //Control for clan owner

        let result: any;
        slugify(slug);
        this.prismaClient.$connect();
        result = await this.prismaClient.clan.delete({
            where:{
                slug: slug
            }
        })
        return result;
    }

    /**
     *
     * @param id
     * @param req
     * @param res
     */
    update(id: any, req: express.Request, res: express.Response): Promise<void> {
        return Promise.resolve(undefined);
    }
    
}