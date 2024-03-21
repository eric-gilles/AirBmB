import { getUserById } from "./../../Models/user";
import { Express, Request, Response } from "express";

export default (app: Express) => {
  app.get("/user/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = await getUserById(id).catch((err) => {
      return res.status(500).json({ message: "Failed", error: err });
    });
    if (!user)
      return res
        .status(404)
        .json({ message: "Failed", error: "User not found" });

    return res.status(200).json({ message: "Succeed", user });
  });
};
