import User, {createUser} from "../Models/user";
import { Express, Request, Response } from "express";



export default (app: Express) => {
    app.post('/login', async (req : Request, res : Response) => {
        const {email, firstName, lastName, password, phone} = req.body;
        const user = new User({email, firstName, lastName, password, phone})
        const createdUser = await createUser(user).catch((err) => {
            res.status(500).json({message: 'Failed', err});
        });
        res.status(201).json({message: 'Succeed', User: createdUser});
    });
}