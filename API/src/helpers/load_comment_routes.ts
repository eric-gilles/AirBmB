import { Express } from "express";
import makeComment from "../routes/comment/makeComment";
import getComments from "../routes/comment/getComments";

export default (app: Express) => {
  makeComment(app);
  getComments(app);
};
