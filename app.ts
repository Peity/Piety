import express, { Request, Response, NextFunction } from 'express';
import { Api } from './routers/api';


const app = express();
const port = 3000;

let api = new Api();
// api.setRoutes();

app.use('/', api.router)
app.listen(port, () => {
  console.log(`server is running on http://localhost:3000`);
});