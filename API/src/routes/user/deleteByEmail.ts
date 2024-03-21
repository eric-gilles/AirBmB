import { deleteUserByEmail } from "./../../Models/user";
import { Express, Request, Response } from "express";
import { isEmailValidMiddleware } from "../../helpers/middleware";
import { authMiddleware } from "../../helpers/middleware";

export default (app: Express) => {
  app.delete(
    "/user/delete/",
    authMiddleware,
    isEmailValidMiddleware,
    async (req: Request, res: Response) => {
      const { email } = req.body;
      try {
        const user = await deleteUserByEmail(email);
        if (!user)
          return res
            .status(404)
            .json({ message: "Failed", error: "User not found" });
        return res.status(200).json({ message: "Succeed", deleted: user });
      } catch (err) {
        return res.status(500).json({ message: "Failed", error: err });
      }
    },
  );
};
