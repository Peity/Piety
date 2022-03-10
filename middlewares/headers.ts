import { Request, Response, NextFunction} from 'express';

export function preventCrossSiteScripting(req: Request, res: Response, next: NextFunction): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
  next();
}

