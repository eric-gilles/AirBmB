import { getCommentsByProperty } from "../../Models/comment";
import { Express, Request, Response } from "express";
import { getUserByEmail } from "../../Models/user";

export default (app: Express) => {
  app.get(
    "/property/:idProperty/comments",
    async (req: Request, res: Response) => {
      const { idProperty } = req.params;
      try {
        const comments = await getCommentsByProperty(parseInt(idProperty));
        var output = [];
        for (const comment of comments) {
          const user = await getUserByEmail(comment.email);
          if (!user) {
            output.push({
              comment: comment.comment,
              note: comment.note,
              user: {
                firstname: "Deleted",
                lastname: "user",
              },
              createdAt: comment.createdAt,
            });
          } else {
            output.push({
              comment: comment.comment,
              note: comment.note,
              user: {
                firstname: user!.firstname,
                lastname: user!.lastname,
              },
              createdAt: comment.createdAt,
            });
          }
        }
        return res.status(200).json({ message: "Succeed", comments: output });
      } catch (err) {
        return res
          .status(500)
          .json({ message: "Failed", error: "An error occured" });
      }
    }
  );
};
