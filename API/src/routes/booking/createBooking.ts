import Booking, {createBooking} from "../../Models/booking";
import { Express, Request, Response } from "express";



export default (app: Express) => {
    app.post('/createBooking', async (req : Request, res : Response) => {
        const {idLocation, property, renterEmail, startDate, endDate, review} = req.body;
        const booking = new Booking({idLocation, property, renterEmail, startDate, endDate, review})
        try {
            const createdBooking = await createBooking(booking)
            return res.status(201).json({message: 'Succeed', User: createdBooking});
        } catch (err) {
            return res.status(500).json({message: 'Failed', error: 'Booking already exists'});
        }
    });
}