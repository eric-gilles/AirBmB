import { getUserByEmail } from "./../../Models/user";
import { Express, Request, Response } from "express";

export default (app: Express) => {
  app.get("/user", async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        return res
          .status(404)
          .json({ message: "Failed", error: "User not found" });
      }
      return res.status(200).json({ message: "Succeed", user });
    } catch (err) {
      return res.status(500).json({ message: "Failed", error: err });
    }
  });
};
