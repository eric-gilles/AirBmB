import Property from "../../Models/property";
import { Express, Request, Response } from "express";

export default (app: Express) => {
  app.delete("/properties/", async (req: Request, res: Response) => {
    try {
      const properties = await Property.deleteMany({});
      return res.status(200).json({ message: "Succeed", deleted: properties });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Failed", error: "An error occured" });
    }
  });
};
