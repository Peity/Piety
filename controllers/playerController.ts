import { IPlayer, Player } from "../models/player";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { IController, ControllerHelper } from "./controller";
import slugify from "slugify";

export class PlayerController extends ControllerHelper implements IController {
    relatedModel: mongoose.Model<any>;

    constructor() {
        super();
        this.relatedModel = Player;
    }

    async show(slug: string, res: Response): Promise<void> {

        this.findBySlug(slug).then(
            (player) => {
                if (player === null) {
                    return this.notFound(res);
                }

                res.send(player);
            }
        );

    }

    async index(res: Response): Promise<void> {
        this.relatedModel.find({}, (err, players) => {
            if (!players) {
                return this.notFound(res);
            }
            let playerMap: (IPlayer & { _id: any; })[] = [];

            players.forEach(function (player) {
                playerMap.push(player);
            });

            res.send(playerMap);
        });
    }

    async create(req: Request, res: Response): Promise<void> {

        const player = new this.relatedModel({
            username: req.body.username,
            slug: slugify(req.body.slug, { lower: true, }),
            email: req.body.email,
            password: req.body.password
        });

        player.save().then(
            () => {
                res.json({
                    "message": `Successfully created ${player.username}`
                });
            },
            (err: { message: any; }) => {
                res.status(409).json({
                    "error": err.message
                });
            }
        );

    }

    update(slug: string, req: Request, res: Response): void {
        this.findBySlug(slug).then(
            (player) => {
                if (player === null)
                    return this.notFound(res);

                player.overwrite({
                    username: req.body.username,
                    slug: slugify(req.body.slug, { lower: true, }),
                    email: req.body.email,
                    password: req.body.password
                });
                player.save().then(
                    () => {
                        res.send(`Successfully updated player: ${player.username}`);
                    }
                ).catch((err) => {
                    res.send(err.message);
                });

            }
        );
    }

    delete(slug: string, res: Response): void {
        this.findBySlug(slug).then(
            (player) => {
                if (player === null)
                    return this.notFound(res);
                player.remove();
                res.send(`Successfully deleted player: ${player.username}`);
            }
        );
    }

    /**
     * Avoid extra coding for find method.
     * 
     * @param slug 
     * @returns Promise <IPlayer | null>
     * 
     * Tried alot to change the return type to Models<IPlayer>, but couldn't get specific fields.
     */
    async findBySlug(slug: string): Promise<IPlayer | null> {
        return this.relatedModel.findOne({ 'slug': slug }).select(['_id', 'username', 'slug', 'email']).then(
            (player: IPlayer) => {
                if (!player) {
                    return null;
                }
                return player;
            }
        );
    }

    async getClan(slug: string, res: Response): Promise<void> {
        const player = await this.relatedModel.findOne({ 'slug' : slug }).populate({
            path: 'clan',
            select: 'username email'
        });
        res.send(player);
    }
}