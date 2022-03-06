import { Clan, IClan } from "../models/clan";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { IController, ControllerHelper } from "./controller";
import slugify from "slugify";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export class ClanController extends ControllerHelper implements IController{
    relatedModel: mongoose.Model<any>;

    constructor(){
        super();
        this.relatedModel = Clan;
    }
    index(res: Response): void {
        throw new Error("Method not implemented.");
    }

    async create(req: Request, res: Response): Promise<void>{
        const clan = new this.relatedModel({
            name: req.body.name,
            slug: slugify(req.body.slug, { lower: true, }),
        });

        clan.owner.push(req.body.playerSlug);

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

    show(id: any, res: Response): void {
        throw new Error("Method not implemented.");
    }
    update(id: any, req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }
    delete(id: any, res: Response): void {
        throw new Error("Method not implemented.");
    }
}