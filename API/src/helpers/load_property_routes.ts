import createProperty from "../routes/property/createProperty";

import { Express } from "express";

export default (app: Express) => {
    createProperty(app);
};