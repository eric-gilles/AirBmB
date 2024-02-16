import { Express, Request, Response } from "express";
import { deletePropertyById } from "../../Models/property";



export default (app: Express) => {
    app.delete('/user/delete/:id', async (req : Request, res : Response) => {
        const id = parseInt(req.params.id);
        try {
            const property = await deletePropertyById(id);
            if(!property) return res.status(404).json({message: 'Failed', error: 'Property not found'});
            return res.status(200).json({message: 'Succeed', deleted:property});
        }
        catch (err) {
            return res.status(500).json({message: 'Failed', error: err});
        }
    });
}