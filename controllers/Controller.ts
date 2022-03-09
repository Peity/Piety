import { Request, Response} from "express";
import mongoose from "mongoose";
 

export interface IController{
    relatedModel: mongoose.Model<any> | undefined;

    index(res: Response, query?: any): void;
    show(id: any, res: Response): void;
    create(req: Request, res: Response): void;
    update(id: any, req: Request, res: Response): void;
    delete(id: any, res: Response): void;
}

export class ControllerHelper{

    notFound(res: Response){
        res.status(404).send("404 Not Found!");
    }

    success(res: Response){
        res.status(200).send(`Operation Successful`);
    }
}