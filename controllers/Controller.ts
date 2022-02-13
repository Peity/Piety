import express from 'express';

export default interface controller{
    index(req: express.Request, res: express.Response): void;
    show(id: any, res: express.Response): void;
    create(req: express.Request, res: express.Response): void;
    update(id: any, req:express.Request, res: express.Response): void;
    delete(id: any, res:express.Response): void;
}
