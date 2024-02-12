import {getUsers} from "../Models/user";
import { Express, Request, Response } from "express";



export default (app: Express) => {
    app.get('/users', async (req : Request, res : Response) => {
        const users = await getUsers().catch((err) => {
            res.status(500).json({message: 'Failed', err});
        });
        res.status(200).json({message: 'Succeed',users});
    });
}