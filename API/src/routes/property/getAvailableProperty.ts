import { getPropertyAvailability } from "../../Models/booking";
import { IProperty, getPropertyById } from "../../Models/property";
import { filterPropertiesResearch } from "../../helpers/filterResearch";
import { validateDateMiddleware } from "../../helpers/middleware";
import { Express, Request, Response } from "express";

export default (app: Express) => {
  app.post(
    "/property/:id/available",
    validateDateMiddleware,
    async (req: Request, res: Response) => {
      const { startDate, endDate } = req.body;
      const idProperty = parseInt(req.params.id);
      if (startDate < Date.now())
        return res
          .status(500)
          .json({ message: "Failed", error: "Invalid date" });
      const property: IProperty | null =
        (await getPropertyById(idProperty)) ?? null;
      if (property === null) {
        return res
          .status(404)
          .json({ message: "Failed", details: "Property not found" });
      }
      const isAvailable: Boolean = await getPropertyAvailability(
        idProperty,
        startDate,
        endDate
      );
      const filteredProperties = await filterPropertiesResearch(req.body, [
        property,
      ]);
      if (filteredProperties.length === 0) {
        return res
          .status(404)
          .json({ message: "Failed", details: "Property not available" });
      }
      return res.status(200).json({ message: "Succeed", isAvailable });
    }
  );
};
