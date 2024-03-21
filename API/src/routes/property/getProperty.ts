import { Express, Request, Response } from "express";
import { getPropertyById } from "../../Models/property";

export default (app: Express) => {
  app.get("/property/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
      const property: any = await getPropertyById(id);
      if (!property)
        return res
          .status(404)
          .json({ message: "Failed", error: "Property not found" });
      return res.status(200).json({ message: "Succeed", property });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Failed", error: "An error occured" });
    }
  });
};
