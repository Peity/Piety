import express from 'express';

export default interface controller{
    index(req: express.Request, res: express.Response): Promise<Response>;
    show(id: any, res: express.Response): Promise<Response>;
    create(req: express.Request, res: express.Response): Promise<Response>;
    update(id: any, req:express.Request, res: express.Response): Promise<Response>;
    delete(id: any, res:express.Response): Promise<Response>;
}
