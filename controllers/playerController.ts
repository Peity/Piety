import { IPlayer, Player } from "../models/player";
import { Request, Response} from "express";
import mongoose from "mongoose";
import { IController } from "./controller";
import slugify from "slugify";

export class PlayerController implements IController{
    relatedModel: mongoose.Model<any>;
    
    constructor(){
        this.relatedModel = Player;
    }

    async show(slug: string, res: Response): Promise<void> {
        Player.findOne({'slug' : slug})
            .then(
                (result) => {
                    if (!result){
                        return res.status(404).send("404 Not Found!");
                    }
                    res.send(result);
                },
                (err: { message: any}) => {
                    res.send(err.message);
                }
            );

    }

    async index(res: Response): Promise<void> {
        Player.find({}, (err, players) => {
            let playerMap: (IPlayer & { _id: any; })[] = [];

            players.forEach(function(player){
                playerMap.push(player);
            });
            
            res.send(playerMap);
        });
    }

    async create(req: Request, res: Response): Promise<void> {

        const player = new this.relatedModel({
            username: req.body.username,
            slug: slugify(req.body.slug, {lower: true, }),
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

    update(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(req: Request, res: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }
}