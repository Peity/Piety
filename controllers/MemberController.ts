import Controller from '../controllers/Controller';
import e from "express";
import {PrismaClient} from "@prisma/client";
import prisma from "prisma";
import ReadFile from "../helper/ReadFile";

export default class MemberController implements Controller {
    prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient({
            errorFormat: "minimal"
        });
    }

    public async create(req: e.Request, res: e.Response): Promise<void> {
        const name = MemberController.createName();
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
                    name: name,
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

    public async show(id: number, res: e.Response): Promise<void> {
        let result: prisma.Member;
        this.prismaClient.$connect();
        result = await this.prismaClient.member.findUnique({
            where: {
                id: id
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

    update(id: any, req: e.Request, res: e.Response): void {
        let result: any;

    }

    private async quickUpdate(member: prisma.member): Promise<void>{

    }

    private static createName(): string {
        const readFile = new ReadFile();
        const names = readFile.readTextFile('name.txt');
        const family = readFile.readTextFile('family.txt');
        const nameIndex = Math.floor(Math.random() * names.length);
        const familyIndex = Math.floor(Math.random() * family.length);

        return names[nameIndex] + " " + family[familyIndex];
    }

    private calcuateRevenue(member: prisma.member): number{
        member.name = "Hello";
        return 0;
    }
}