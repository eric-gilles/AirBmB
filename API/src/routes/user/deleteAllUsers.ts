import { IUser, getUsers} from "../../Models/user";
import { Express, Request, Response } from "express";



export default (app: Express) => {
    app.delete('/users', async (req: Request, res: Response) => {
        const users = await getUsers().catch((err) => {
            res.status(500).json({message: 'Failed', error: err});
        });
        if (users) {
            users.forEach(async (user: IUser) => {
                await user.deleteOne();
            });
        }
        res.status(200).json({message: 'Succeed', users});
    });
}