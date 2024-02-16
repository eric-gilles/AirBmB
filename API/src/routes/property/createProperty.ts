import { Express, Request, Response } from "express";
import { IProperty, createProperty } from "../../Models/property";


export default (app: Express) => {
    app.post('/property', async (req : Request, res : Response) => {
        const { name, description, price, type, mailOwner, city, street, zipCode, numSleeps, numBedrooms, distance } = req.body;
        const property_json : any = {
            idProperty: 1,
            price,
            mailOwner,
            city,
            street,
            zipCode,
            numSleeps,
            numBedrooms,
            distance
        }
        if(!price) return res.status(400).json({message: 'Failed', error: 'Price is required'});
        if(!mailOwner) return res.status(400).json({message: 'Failed', error: "Owner's mail is required"});
        if(!city) return res.status(400).json({message: 'Failed', error: 'City is required'});
        if(!street) return res.status(400).json({message: 'Failed', error: 'Street is required'});
        if(!zipCode) return res.status(400).json({message: 'Failed', error: 'ZipCode is required'});
        if(!numSleeps) return res.status(400).json({message: 'Failed', error: 'The number of people who can sleep is required'});
        if(!numBedrooms) return res.status(400).json({message: 'Failed', error: 'The number of bedrooms is required'});
        if(!distance) return res.status(400).json({message: 'Failed', error: 'Distance is required'});
        try {
            const property : IProperty = await createProperty(property_json);
            return res.status(201).json({message: 'Succeed', property});
        } catch (err) {
            console.log(err);
            return res.status(500).json({message: 'Failed', error: 'An error occured'});
        }
    });
}