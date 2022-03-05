import { Request, Response} from "express";
import mongoose from "mongoose";
 

export interface IController{
    relatedModel: mongoose.Model<any> | undefined;

    index(res: Response): Promise<void>;
    show(id: any, res: Response): void;
    create(req: Request, res: Response): void;
    update(): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
