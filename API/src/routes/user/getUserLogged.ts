import { getUserByEmail } from "../../Models/user";
import { Express, Request, Response } from "express";
import { authMiddleware } from "../../helpers/middleware";

export default (app: Express) => {
  app.get("/user", authMiddleware, async (req: Request, res: Response) => {
    const { loggedUserEmail } = req.body;
    try {
      const user = await getUserByEmail(loggedUserEmail);
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
