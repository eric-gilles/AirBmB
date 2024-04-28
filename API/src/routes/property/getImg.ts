import { Request, Response, Express } from "express";
import fs from "fs";
import path from "path";
export default (app: Express) => {
  app.get("/img/:propertyId", async (req: Request, res: Response) => {
    const imageName = req.params.propertyId;

    for (const format of ["png", "jpg", "jpeg"]) {
      const img = path.join(
        __dirname,
        "../../../assets/img/" + imageName + "." + format
      );
      fs.existsSync(img);
      if (fs.existsSync(img)) {
        return res.status(200).sendFile(img);
      }
    }
    return res.status(404).json({ message: "Failed" });
  });
};
