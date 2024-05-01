import mongoose, { Schema } from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

export interface IComment {
  idComment: number;
  comment: string;
  note: number;
  email: string;
  idProperty: number;
  createdAt?: Date;
}
const CommentSchema: Schema = new Schema({
  idComment: { type: Number, required: true },
  comment: { type: String, required: true },
  note: { type: Number, required: true },
  email: { type: String, ref: "User.email", required: true },
  idProperty: { type: Number, ref: "Property.idProperty", required: true },
  createdAt: { type: Date, default: Date.now },
});

CommentSchema.plugin(AutoIncrement, { inc_field: "idComment" });
const Comment = mongoose.model<IComment>("Comment", CommentSchema);
export default Comment;

export const getComments = async () => Comment.find();

export const getCommentsByProperty = async (idProperty: number) =>
  Comment.find({ idProperty });

export const createComment = async (comment: IComment) => {
  await Comment.create(comment).then((comment) => comment.save());
};
