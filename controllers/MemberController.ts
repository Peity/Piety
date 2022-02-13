import Controller from '../controllers/Controller';
import express from 'express'
import e from "express";
import slugify from "slugify";
import {PrismaClient} from "@prisma/client";

export default class MemberController implements Controller {
    prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient({
            errorFormat: "minimal"
        });
    }

    public async create(req: e.Request, res: e.Response): Promise<void> {
        console.log("MemberController.create() called ");
        let result: any;
        console.log("Trying to Insert data to member table");
        this.prismaClient.$connect();
        try {
            result = await this.prismaClient.member.create({
                data: {
                    Clan: {
                        connect: {
                            id: +req.body.clan_id
                        },
                    },
                    name: req.body.name,
                    type: 0,
                    revenue: 0
                }
            });
            this.prismaClient.$disconnect();
            console.log("Successfully inserted");
            res.send(result);
        } catch (e) {
            const message = `{
                    "message": "${e.message}"
                }`;
            const json = JSON.parse(message);
            res.status(400).send(json);
            return;
        }
    }

    delete(id: any, res: e.Response): void {
    }

    index(req: e.Request, res: e.Response): void {
    }

    show(id: any, res: e.Response): void {
    }

    update(id: any, req: e.Request, res: e.Response): void {
    }

}