import { Express, Request, Response } from "express";
import { getProperties } from "../../Models/property";
import { authMiddleware } from "../../helpers/middleware";

export default (app: Express) => {
  app.get("/properties", async (req: Request, res: Response) => {
    try {
      const properties: any = await getProperties();
      if (!properties)
        return res
          .status(404)
          .json({ message: "Failed", error: "Property not found" });
      return res.status(200).json({ message: "Succeed", properties });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Failed", error: "An error occured" });
    }
  });
};
