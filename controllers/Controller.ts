import { Player } from "../models/player";
import { Request, Response} from "express";
 

interface Controller{
    index(): Promise<void>;
    create(req: Request, res: Response): void;
    update(): Promise<void>;
    delete(): Promise<void>;
}


export class PlayerController implements Controller{
    
    index(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async create(req: Request, res: Response): Promise<void> {

        const player = new Player({
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
          (err) => { console.log(err);}
        );

    }
    update(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}