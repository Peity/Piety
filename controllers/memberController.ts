import { Member, IMember, MemberTypes } from "../models/members";
import { Clan } from "../models/clan";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { IController, ControllerHelper } from "./controller";

export class MemberController extends ControllerHelper implements IController {
    relatedModel:  mongoose.Model<IMember>;

    constructor(){
        super();
        this.relatedModel = Member;
    }


    index(res: Response): void {
        throw new Error("Method not implemented.");
    }
    show(id: any, res: Response): void {
        throw new Error("Method not implemented.");
    }
    async create(req: Request, res: Response): Promise<void> {
        const clan = await Clan.findOne( {'slug' : req.params.clanSlug} );

        if (!clan){
            return this.notFound(res);
        }

        const name = Member.generateName();

        const member = new this.relatedModel({
            clan_id: clan._id,
            name: name
        });

        member.save().then(
            () => {
                res.send(`The member: ${member.name} generated successfully!`);
            }
        ).catch((err: { message: any; }) => {
            res.status(400).send(`error: ${err.message}`);
        });

    }
    update(id: any, req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }
    delete(id: any, res: Response): void {
        throw new Error("Method not implemented.");
    }
    
}