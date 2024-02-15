import {getBookings} from "../../Models/booking";
import { Express, Request, Response } from "express";



export default (app: Express) => {
    app.get('/bookings', async (req : Request, res : Response) => {
        const bookings = await getBookings().catch((err) => {
            res.status(500).json({message: 'Failed', error: err});
        });
        res.status(200).json({message: 'Succeed',bookings});
    });
}