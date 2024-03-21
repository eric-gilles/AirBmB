import { getUsers } from "./../../Models/user";
import { Express, Request, Response } from "express";
import { authMiddleware } from "../../helpers/middleware";

export default (app: Express) => {
  app.get("/users",authMiddleware, async (req: Request, res: Response) => {
    const users = await getUsers().catch((err) => {
      res.status(500).json({ message: "Failed", error: err });
    });
    res.status(200).json({ message: "Succeed", users });
  });
};
