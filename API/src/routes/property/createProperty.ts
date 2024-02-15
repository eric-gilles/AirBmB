import { Express, Request, Response } from "express";
import { IProperty, createProperty } from "../../Models/property";


export default (app: Express) => {
    app.post('/property', async (req : Request, res : Response) => {
        const {idLocation, name, description, price, type, mailOwner, city, street, zipCode, numSleeps, numBedrooms, distance } = req.body;
        const property_json : any = {
            idLocation,
            name,
            description,
            price,
            type,
            mailOwner,
            city,
            street,
            zipCode,
            numSleeps,
            numBedrooms,
            distance
        }
        try {
            const property : IProperty = await createProperty(property_json);
            return res.status(201).json({message: 'Succeed', property});
        } catch (err) {
            return res.status(500).json({message: 'Failed', error: 'An error occured'});
        }
    });
}