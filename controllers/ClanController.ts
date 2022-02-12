import {PrismaClient} from '@prisma/client'
import Controller from "../controllers/Controller";
import express from 'express';
import slugify from 'slugify';

export default class ClanController implements Controller{

    /**
     *
     * @param req
     * @param res
     */
    public async index(req: express.Request, res: express.Response): Promise<Response> {
        let result: any;
        const prismaClient = new PrismaClient();
        let count: number = +req.query.count;
        let offset: number = +req.query.offset;

        prismaClient.$connect();

        if(!count && !offset) {
            result = await prismaClient.clan.findMany();
        } else {
            result = await prismaClient.clan.findMany({
                skip: (offset-1)*count,
                take: count,
            });
        }
        prismaClient.$disconnect();
        return result;
    }

    /**
     *
     * @param req
     * @param res
     */
    public async create(req: express.Request, res: express.Response): Promise<Response> {
        let result: any;
        const prismaClient = new PrismaClient();
        prismaClient.$connect();
        result = await prismaClient.clan.create({
            data: {
                owner: {
                    connect: {
                        id: +req.body.owner_id
                    },  
                },
                name: req.body.name,
                slug: req.body.slug,
                gold: 1000,
                supply: 1000,
                level: 0.0  
            }
        });
        prismaClient.$disconnect();
        return result;
    }

    /**
     *
     * @param slug
     * @param res
     */
    public async show(slug: string, res: express.Response): Promise<Response> {
        let result: any;
        slugify(slug);
        const prismaClient = new PrismaClient();
        prismaClient.$connect();
        result = await prismaClient.clan.findUnique({
            where: {
                slug: slug
            }
        });
        prismaClient.$disconnect();
        return result;
    }

    /**
     *
     * @param slug
     * @param res
     */
    public async delete(slug: string, res: express.Response): Promise<Response> {

        //Control for clan owner

        let result: any;
        slugify(slug);
        const prismaClient = new PrismaClient();
        prismaClient.$connect();
        result = await prismaClient.clan.delete({
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
    update(id: any, req: express.Request, res: express.Response): Promise<Response> {
        return Promise.resolve(undefined);
    }
    
}