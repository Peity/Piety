import {PrismaClient} from '@prisma/client'
import Controller from "../controllers/Controller";
import express from 'express';
import slugify from 'slugify';

class ClanController implements Controller{
    index(req: express.Request, res: express.Response): Promise<Response> {
        return Promise.resolve(undefined);
    }

    public async create(req: express.Request, res: express.Response): Promise<Response> {
        let result: any;
        const prismaClient = new PrismaClient();
        prismaClient.$connect();
        result = await prismaClient.clan.create({
            data: {
                owner_id: req.body.owner_id,
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

    update(id: any, req: express.Request, res: express.Response): Promise<Response> {
        return Promise.resolve(undefined);
    }
    
}