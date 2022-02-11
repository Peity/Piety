import { PrismaClient } from "@prisma/client";
import Controller from "../controllers/Controller";
import {body, validationResult } from 'express-validator';
import express from 'express';
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export default class PlayerCotroller implements Controller {
    index(): JSON {
        throw new Error("Method not implemented.");
    }
    public show(username: string, res: express.Response<any, Record<string, any>>): express.Response<any, Record<string, any>> {
        // var player: JSON; 
        // const prismaClient = new PrismaClient();
        // prismaClient.$connect();
        // prismaClient.player.findUnique({
        //     where: {
        //         username: username
        //     }
        // }).then(
        //     function(result){
                
        //     }
        // );
 
        return res.send('Hello World!');
    }
    create(req: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: express.Response<any, Record<string, any>>): express.Response<any, Record<string, any>> {
        throw new Error("Method not implemented.");
    }
    


}