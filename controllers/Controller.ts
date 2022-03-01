import { Request, Response} from "express";
import mongoose from "mongoose";
 

export interface IController{
    relatedModel: mongoose.Model<any> | undefined;

    index(): Promise<void>;
    show(req: Request, res: Response): void;
    create(req: Request, res: Response): void;
    update(): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}


export class Controller implements IController{
    relatedModel: mongoose.Model<any> | undefined;

    show(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }

    index(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async create(req: Request, res: Response): Promise<void> {
        throw new Error("Method not implemented.");

    }
    update(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(req: Request, res: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }


}