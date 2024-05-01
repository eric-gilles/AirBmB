import { Express, Request, Response } from "express";
import { IProperty, getProperties } from "../../Models/property";
import { validateDateMiddleware } from "../../helpers/middleware";
import { getPropertyAvailability } from "../../Models/booking";
import { filterPropertiesResearch } from "../../helpers/filterResearch";

export default (app: Express) => {
  app.post(
    "/properties/available",
    validateDateMiddleware,
    async (req: Request, res: Response) => {
      const { startDate, endDate } = req.body;
      if (startDate < Date.now())
        return res
          .status(500)
          .json({ message: "Failed", error: "Invalid date" });
      const properties: IProperty[] = await getProperties();
      const availableProperties = properties.filter(async (property: any) => {
        const isAvailable: Boolean = await getPropertyAvailability(
          property.idProperty,
          startDate,
          endDate
        );
        if (isAvailable) return property;
      });
      const filteredProperties = await filterPropertiesResearch(
        req.body,
        availableProperties
      );
      return res
        .status(200)
        .json({ message: "Succeed", properties: filteredProperties });
    }
  );
};
