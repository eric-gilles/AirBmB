import { IBooking, getBookings} from "../../Models/booking";
import { Express, Request, Response } from "express";



export default (app: Express) => {
    app.delete('/booking', async (req: Request, res: Response) => {
        const booking = await getBookings().catch((err) => {
            res.status(500).json({message: 'Failed', error: err});
        });
        if (booking) {
            booking.forEach(async (booking: IBooking) => {
                await booking.deleteOne();
            });
        }
        res.status(200).json({message: 'Succeed', booking});
    });
}