import { Member, IMember } from "../models/members";
import { Clan } from "../models/clan";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { IController, ControllerHelper } from "./controller";
import { Task } from '../models/task';

export class MemberController extends ControllerHelper implements IController {
    relatedModel: mongoose.Model<any>;

    constructor() {
        super();
        this.relatedModel = Member;
    }


    async index(res: Response, clanSlug: String): Promise<void> {
        const clan = await Clan.findOne({ 'slug': clanSlug });
        if (!clan) {
            return this.notFound(res);
        }
        const members = await this.relatedModel.find({ 'caln_id': clan._id });
        res.send(members);

    }

    async show(id: string, res: Response): Promise<void> {

        const member = await this.relatedModel.findById(id).populate('clan_id', 'name');
        if (!member) {
            return this.notFound(res);
        }
        res.send(member);
    }

    async create(req: Request, res: Response): Promise<void> {
        const clan = await Clan.findOne({ 'slug': req.params.clanSlug });

        if (!clan) {
            return this.notFound(res);
        }

        if (clan.gold >= 1000) {
            clan.gold -= 1000;
            const name = Member.generateName();

            const member = new this.relatedModel({
                clan_id: clan._id,
                name: name
            });

            member.save().then(
                () => {
                    //TODO: duplicate on clan.save() fix this ASAP
                    member.updateRelatedClan();
                    clan.save();
                    res.send(member);
                }
            ).catch((err: { message: any; }) => {
                res.status(400).send(`error: ${err.message}`);
            });
        }
        else{
            res.status(400).send(`Insufficent gold for making new member`);
        }

    }

    //TODO: Update function missing.
    update(id: any, req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }

    async delete(id: string, res: Response): Promise<void> {

        const member = await this.relatedModel.findById(id);
        if (!member) {
            return this.notFound(res);
        }
        await member.removefromRelatedClan();
        await member.delete();
        this.success(res);
    }


    async calculateRevenue(id: string, res: Response): Promise<void> {

        const member = await Member.findById(id);

        if (!member) {
            return this.notFound(res);
        }

        let task: Task = new Task(0);
        task.clone(member.task);
        const revenue = task.getGoldRevenue();

        member.task = task;

        await member.save();

        res.send(`Current revenue of member "${member.id} : ${member.name}" is ${revenue} gold`);
    }

    async changeTask(id: string, task: number, res: Response): Promise<void> {

        const member = await this.relatedModel.findById(id);

        if (!member) {
            return this.notFound(res);
        }

        member.changeTask(task);

        this.success(res);
    }

    async cashMember(id: string, res: Response): Promise<void> {
        const member = await this.relatedModel.findById(id);

        if (!member) {
            return this.notFound(res);
        }

        const task = new Task(0);
        task.clone(member.task);

        const income = task.cashRevenue();
        member.task = task;

        const clan = await Clan.findById(member.clan_id);

        if (!clan) {
            return this.notFound(res);
        }

        clan.gold += income;

        await member.save();
        await clan.save();

        res.send(`Successfully added ${income} to clan: ${clan.name}.`);

    }

}