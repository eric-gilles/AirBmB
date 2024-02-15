import User, {createUser} from "../../Models/user";
import { Express, Request, Response } from "express";



export default (app: Express) => {
    app.post('/register', async (req : Request, res : Response) => {
        const {email, firstName, lastName, password, phone} = req.body;
        const user = new User({idUser:1,email, firstName, lastName, password, phone})
        try {
            const createdUser = await createUser(user);
            return res.status(201).json({message: 'Succeed', User: createdUser});
        } catch (err) {
            return res.status(500).json({message: 'Failed', error: 'User already exists', err});
        }
    });
}