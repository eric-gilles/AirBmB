import Booking, {
  createBooking,
  getBookingByPropertyId,
} from "../../Models/booking";
import { Express, Request, Response } from "express";
import {
  authMiddleware,
  createBookingMiddleware,
  validateDateMiddleware,
} from "../../helpers/middleware";
import { getPropertyById } from "../../Models/property";

export default (app: Express) => {
  app.post(
    "/book",
    authMiddleware,
    createBookingMiddleware,
    validateDateMiddleware,
    async (req: Request, res: Response) => {
      const { idProperty, nbGuests, renterEmail, startDate, endDate, review } =
        req.body;
      if (startDate < Date.now())
        return res
          .status(500)
          .json({ message: "Failed", error: "Invalid date" });
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
        const property = await getPropertyById(idProperty);
        if (!property) {
          return res
            .status(500)
            .json({ message: "Failed", error: "Property does not exist" });
        }
        if (nbGuests > property.numSleeps)
          return res
            .status(500)
            .json({ message: "Failed", error: "Too many guests" });

        const bookingExists = await getBookingByPropertyId(idProperty);
        for (const booked of bookingExists) {
          if (booked.startDate >= startDate && booked.endDate <= endDate){
            return res
              .status(500)
              .json({ message: "Failed", error: "Booking already exists" });
          }
        }

        const createdBooking = await createBooking(booking);
        return res
          .status(201)
          .json({ message: "Succeed", User: createdBooking });
      } catch (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Failed", error: "Booking already exists" });
      }
    }
  );
};
