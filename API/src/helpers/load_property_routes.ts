import createProperty from "../routes/property/createProperty";
import deleteAll from "../routes/property/deleteAll";
import updatePropertyById from "../routes/property/updatePropertyById";
import getProperty from "../routes/property/getProperty";
import getProperties from "../routes/property/getProperties";

import { Express } from "express";
export default (app: Express) => {
  createProperty(app);
  deleteAll(app);
  updatePropertyById(app);
  getProperty(app);
  getProperties(app);
};
