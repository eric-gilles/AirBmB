import express, {Request , Response} from 'express';
import dotenv from 'dotenv';
import {connectToDatabase} from './db/db_initialiser';
import bodyParser from 'body-parser';
import register from './routes/user/register';
import login from './routes/user/login';
import getUsers from './routes/user/getUsers';
import deleteAllUsers from './routes/user/deleteAllUsers';
import getUserByEmail from './routes/user/getUserByEmail';
import updateUser from './routes/user/updateUser';
import { get } from 'http';
import load_booking_routes from './helpers/load_booking_routes';
// import cors from 'cors';






dotenv.config();

const port = process.env.API_PORT;


const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToDatabase();
app.get('/', (req : Request, res : Response) => {
    res.send('Hello World!');
});


register(app);
login(app);
getUsers(app);
getUserByEmail(app);
deleteAllUsers(app);
updateUser(app);

load_booking_routes(app);

app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`);
});