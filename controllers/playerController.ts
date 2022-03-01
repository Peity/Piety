import { Player } from "../models/player";
import { Request, Response} from "express";
import mongoose from "mongoose";
import { IController, Controller } from "./controller";

export class PlayerController extends Controller implements IController{
    relatedModel: mongoose.Model<any>;
    
    constructor(){
        super();
        this.relatedModel = Player;
    }

    index(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async create(req: Request, res: Response): Promise<void> {

        const player = new this.relatedModel({
            username: req.body.username,
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