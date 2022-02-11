import express from 'express';

export default interface controller{
    index(): JSON;
    show(id: any, res: express.Response): any;
    create(req: express.Request, res: express.Response): express.Response;
}