import { parse } from "path";
import { getBookingById } from "../../Models/booking";
import { Express, Request, Response } from "express";

export default (app: Express) => {
  app.get("/booking/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const booking = await getBookingById(parseInt(id));
      if (!booking) {
        return res
          .status(404)
          .json({ message: "Failed", error: "Booking not found" });
      }
      return res.status(200).json({ message: "Succeed", booking });
    } catch (err) {
      return res.status(500).json({ message: "Failed", error: err });
    }
  });
};
