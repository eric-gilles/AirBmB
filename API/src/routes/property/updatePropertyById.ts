import { Express, Request, Response } from "express";
import { getPropertyById, updatePropertyById } from "../../Models/property";
import { updatePropertyMiddleware } from "../../helpers/middleware";

export default (app: Express) => {
    app.put('/property/:id', updatePropertyMiddleware,async (req : Request, res : Response) => {
        const id = parseInt(req.params.id);
        const { price, mailOwner, city, street, zipCode, numSleeps, numBedrooms, distance } = req.body;
        let property_json : any = {};
        if(price) property_json.price = price;
        if(mailOwner) property_json.mailOwner = mailOwner;
        if(city) property_json.city = city;
        if(street) property_json.street = street;
        if(zipCode) property_json.zipCode = zipCode;
        if(numSleeps) property_json.numSleeps = numSleeps;
        if(numBedrooms) property_json.numBedrooms = numBedrooms;
        if(distance) property_json.distance = distance;
        try {
            const property : any = getPropertyById(id);
            if(!property) return res.status(404).json({message: 'Failed', error: 'Property not found'});
            let updatedProperty : any = await updatePropertyById(id, property_json);
            return res.status(200).json({message: 'Succeed', updated: updatedProperty});
        } catch (err) {
            return res.status(500).json({message: 'Failed', error: 'An error occured'});
        }
    });
}