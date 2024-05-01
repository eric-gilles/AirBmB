import { Express, Request, Response } from "express";
import { createProperty } from "../../Models/property";
import {
  createPropertyMiddleware,
  authMiddleware,
} from "../../helpers/middleware";
import { updatePropertyById } from "../../Models/property";
import dotenv from "dotenv";
dotenv.config();

export default (app: Express) => {
  app.post(
    "/property",
    authMiddleware,
    createPropertyMiddleware,
    async (req: Request, res: Response) => {
      const {
        price,
        mailOwner,
        city,
        street,
        zipCode,
        numSleeps,
        numBedrooms,
        distance,
      } = req.body;
      const property_json: any = {
        idProperty: 1,
        price,
        mailOwner,
        city,
        street,
        zipCode,
        numSleeps,
        numBedrooms,
        distance,
        img: "",
      };

      try {
        var property: any = await createProperty(property_json);
        property.img = `http://localhost:${process.env.API_PORT}/img/${property.idProperty}`;
        const property_modified = await updatePropertyById(
          property.idProperty,
          { img: property.img }
        );

        return res
          .status(201)
          .json({ message: "Succeed", property: property_modified });
      } catch (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Failed", error: "An error occured" });
      }
    }
  );
};
