import { Express, Request, Response } from "express";
import { authMiddleware } from "../../helpers/middleware";
import { IComment, createComment } from "../../Models/comment";

export default (app: Express) => {
  app.post(
    "/comment/:idProperty",
    authMiddleware,
    async (req: Request, res: Response) => {
      const { idProperty } = req.params;
      const { comment, note, loggedUserEmail } = req.body;
      const newComment: IComment = {
        comment,
        note,
        email: loggedUserEmail,
        idProperty: parseInt(idProperty),
        idComment: 0,
      };

      try {
        const comment = await createComment(newComment);
        return res.status(201).json({ message: "Succeed" });
      } catch (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Failed", error: "An error occured" });
      }
    }
  );
};
