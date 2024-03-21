import { deleteUserById } from "./../../Models/user";
import { Express, Request, Response } from "express";

export default (app: Express) => {
  app.delete("/user/delete/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
      const user = await deleteUserById(id);
      if (!user)
        return res
          .status(404)
          .json({ message: "Failed", error: "User not found" });
      return res.status(200).json({ message: "Succeed", deleted: user });
    } catch (err) {
      return res.status(500).json({ message: "Failed", error: err });
    }
  });
};
