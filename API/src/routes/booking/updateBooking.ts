import { updateBookingById, getBookingById } from "../../Models/booking";
import { Express, Request, Response } from "express";
import { authMiddleware } from "../../helpers/middleware";

export default (app: Express) => {
  app.put("/booking/",authMiddleware, async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
      const booking = await getBookingById(id);
      if (!booking) {
        return res
          .status(404)
          .json({ message: "Failed", error: "Booking not found" });
      }
      if (req.body.property) {
        booking.property = req.body.property;
      }
      if (req.body.renterEmail) {
        booking.renterEmail = req.body.renterEmail;
      }
      if (req.body.startDate) {
        booking.startDate = req.body.startDate;
      }
      if (req.body.endDate) {
        booking.endDate = req.body.endDate;
      }
      if (req.body.review) {
        booking.review = req.body.review;
      }
      // Mettre à jour l'utilisateur dans la base de données
      await updateBookingById(id, booking);

      return res.status(200).json({ message: "Succeed", booking });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Failed", error: "An error occured" });
    }
  });
};
