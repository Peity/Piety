import express, { Request, Response, NextFunction } from 'express';
import { Api } from './routers/api';
import bodyParser from 'body-parser';


const app = express();
const port = 3000;

let api = new Api();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', api.router);
app.listen(port, () => {
  console.log(`server is running on http://localhost:3000`);
});
