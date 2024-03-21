import Booking, { createBooking } from "../../Models/booking";
import { Express, Request, Response } from "express";
import { createBookingMiddleware, validateDateMiddleware } from "../../helpers/middleware";

export default (app: Express) => {
  app.post("/book", createBookingMiddleware, validateDateMiddleware, async (req: Request, res: Response) => {
    
    const { idProperty, nbGuests, renterEmail, startDate, endDate, review } =
      req.body;
    
    const booking = new Booking({
      idBooking: 1,
      idProperty: parseInt(idProperty),
      renterEmail,
      startDate,
      endDate,
      nbGuests,
      review,
    });
    try {
      const createdBooking = await createBooking(booking);
      return res.status(201).json({ message: "Succeed", User: createdBooking });
    } catch (err) {
      console.log(err)
      return res
        .status(500)
        .json({ message: "Failed", error: "Booking already exists" });
    }
    
  });
};
