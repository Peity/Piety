import { Clan, IClan } from "../models/clan";
import { Player } from "../models/player";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { IController, ControllerHelper } from "./controller";
import slugify from "slugify";

export class ClanController extends ControllerHelper implements IController{
    relatedModel: mongoose.Model<any>;

    constructor(){
        super();
        this.relatedModel = Clan;
    }
    index(res: Response): void {
        this.relatedModel.find({}, (err, clans) => {
            if (!clans) {
                return this.notFound(res);
            }
            let clanMap: (IClan & { _id: any; })[] = [];

            clans.forEach(function (clan) {
                clanMap.push(clan);
            });

            res.send(clanMap);
        }).populate('owner', 'username email');
    }

    async create(req: Request, res: Response): Promise<void>{
        const player = await Player.findOne({ "slug" : req.body.playerSlug});

        if(!player){
            return this.notFound(res);
        }

        const clan = new this.relatedModel({
            name: req.body.name,
            slug: slugify(req.body.slug, { lower: true, }),
            owner: player._id,
        });

        clan.save().then(
            () => {
                res.json({
                    "message": `Successfully created ${clan.name}`
                });
            },
            (err: { message: any; }) => {
                res.status(409).json({
                    "error": err.message
                });
            }
        );
    }

    async show(slug: string, res: Response): Promise<void> {
        this.relatedModel.findOne({ "slug" : slug }).populate('owner', 'username email').then(
            (result) => {
                res.send(result);
            },

            (error) => {
                this.notFound(res);
            }
        );
    }

    update(id: any, req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }

    async delete(slug: string, res: Response): Promise<void> {
        const clan = await this.relatedModel.findOne({ "slug" : slug });
        if(!clan){
            return this.notFound(res);
        }
        clan.remove();
        res.send(`Successfully removed ${clan.name}`);
    }

    async fetchOwner(id: mongoose.Types.ObjectId): Promise<string | null>{
        return await Player.findById(id);
    }
}