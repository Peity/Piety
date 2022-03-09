import { Member, IMember, MemberTypes } from "../models/members";
import { Clan } from "../models/clan";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { IController, ControllerHelper } from "./controller";

export class MemberController extends ControllerHelper implements IController {
    relatedModel:  mongoose.Model<any>;

    constructor(){
        super();
        this.relatedModel = Member;
    }


    async index(res: Response, clanSlug: String): Promise<void> {
        const clan = await Clan.findOne({ 'slug' : clanSlug });
        if(!clan){
            return this.notFound(res);
        }
        const members = await this.relatedModel.find({ 'caln_id' : clan._id });
        res.send(members);

    }

    async show(id: string, res: Response): Promise<void> {

        const member = await this.relatedModel.findById(id).populate('clan_id', 'name');
        if(!member){
            return this.notFound(res);
        }
        res.send(member);
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
                member.updateRelatedClan();
                res.send(member);
            }
        ).catch((err: { message: any; }) => {
            res.status(400).send(`error: ${err.message}`);
        });

    }

    update(id: any, req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }

    async delete(id: string, res: Response): Promise<void> {
        
        const member = await this.relatedModel.findById(id);
        if(!member){
            return this.notFound(res);
        }
        await member.removeRelatedPlayer();
        await member.delete();
        this.success(res);
    }
    
}