import express from 'express';

export default interface controller{
    index(req: express.Request, res: express.Response): Promise<any>;
    show(id: any, res: express.Response): any;
    create(req: express.Request, res: express.Response): Promise<Response>;
}
