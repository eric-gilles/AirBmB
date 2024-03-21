import { getBookings } from "../../Models/booking";
import { Express, Request, Response } from "express";
import { authMiddleware } from "../../helpers/middleware";

export default (app: Express) => {
  app.get("/bookings",authMiddleware, async (req: Request, res: Response) => {
    const bookings = await getBookings().catch((err) => {
      res.status(500).json({ message: "Failed", error: err });
    });
    res.status(200).json({ message: "Succeed", bookings });
  });
};
