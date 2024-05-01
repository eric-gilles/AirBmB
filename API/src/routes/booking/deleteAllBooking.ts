import Booking, { IBooking, getBookings } from "../../Models/booking";
import { Express, Request, Response } from "express";
import { authMiddleware } from "../../helpers/middleware";

export default (app: Express) => {
  app.delete(
    "/bookings",
    authMiddleware,
    async (req: Request, res: Response) => {
      const bookings = await Booking.deleteMany({});
      res.status(200).json({ message: "Succeed", deleted: bookings });
    }
  );
};
