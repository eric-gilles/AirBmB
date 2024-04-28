import { updateUserByEmail, getUserByEmail } from "./../../Models/user";
import { Express, Request, Response } from "express";
import { isEmailValidMiddleware } from "../../helpers/middleware";
import { authMiddleware } from "../../helpers/middleware";

export default (app: Express) => {
  app.put(
    "/user/",
    authMiddleware,
    isEmailValidMiddleware,
    async (req: Request, res: Response) => {
      const { email } = req.body;

      try {
        const user = await getUserByEmail(email);
        if (!user) {
          return res
            .status(404)
            .json({ message: "Failed", error: "User not found" });
        }
        if (req.body.firstName) {
          user.firstname = req.body.firstname;
        }
        if (req.body.lastName) {
          user.lastname = req.body.lastname;
        }
        if (req.body.phone) {
          user.phone = req.body.phone;
        }
        if (req.body.password) {
          user.password = req.body.password;
        }
        // Mettre à jour l'utilisateur dans la base de données
        await updateUserByEmail(email, user);

        return res.status(200).json({ message: "Success", updated: user });
      } catch (err) {
        return res
          .status(500)
          .json({ message: "Failed", error: "An error occured" });
      }
    },
  );
};
