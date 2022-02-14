import Controller from '../controllers/Controller';
import e from "express";
import {PrismaClient} from "@prisma/client";

export default class MemberController implements Controller {
    prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient({
            errorFormat: "minimal"
        });
    }

    public async create(req: e.Request, res: e.Response): Promise<void> {
        let result: any;
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