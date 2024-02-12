import { IUser, getUserByEmail} from "../../Models/user";
import { Express, Request, Response } from "express";



export default (app: Express) => {
    app.post('/login', async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const user: IUser | null = await getUserByEmail(email)
            if (!user) {
                return res.status(404).json({ message: 'Failed', error: 'User not found' });
            }
            if (user.password === password) {
                return res.status(200).json({ message: 'Succeed', User: user });
            } 
            return res.status(401).json({ message: 'Failed', error: 'Invalid password' });
        } catch (err) {
            return res.status(500).json({ message: 'Failed', error: err });
        }
    });
}