import { IUser, getUserByEmail } from "./../../Models/user";
import { Express, Request, Response } from "express";
import { loginMiddleware } from "../../helpers/middleware";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default (app: Express) => {
  app.post("/login", loginMiddleware, async (req: Request, res: Response) => {
    const secretKey = process.env.SECRET_KEY!;
    const { email, password } = req.body;
    try {
      const user: IUser | null = await getUserByEmail(email);
      if (!user) {
        return res
          .status(404)
          .json({ message: "Failed", error: "User not found" });
      }

      if (user.password === password) {
        const token = jwt.sign({ email, admin:user.isAdmin, id: user.idUser }, secretKey, { expiresIn: "1h" });

        return res.status(200).json({ message: "Succeed", User: user, token });
      }
      return res
        .status(401)
        .json({ message: "Failed", error: "Invalid password" });
    } catch (err) {
      return res.status(500).json({ message: "Failed", error: err });
    }
  });
};
