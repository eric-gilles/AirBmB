import mongoose, { Schema, Document } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);


export interface IUser extends Document {
    idUser: {type : Number, unique : true}
    email: {type : string, required : true, unique : true};
    firstName: {type : string, required : true};
    lastName: {type : string, required : true};
    phone: string;
    password: {type : string, required : true, select : false};
}

// Define the schema
const UserSchema: Schema = new Schema({
    idUser: { type: Number, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: {type: String},
    password : { type: String, required: true }
});
UserSchema.plugin(AutoIncrement, {inc_field: 'idUser'});

// Create and export the model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;
type getUsers = () => Promise<IUser[]>;
type getUserByEmail = (email : string) => Promise<IUser>;
type createUser = (user : IUser) => Promise<IUser>;
type deleteUserByEmail = (email : string) => Promise<IUser>;
type deleteUserById = (idUser : number) => Promise<IUser>;

type updateUserByEmail = (email : string, user : IUser) => Promise<IUser>;

export const getUsers = async () => User.find();
export const getUserById = async (idUser : string) => User.findOne({idUser});
export const getUserByEmail = async (email : string) => User.findOne({email});
export const createUser = async (user : IUser) => await User.create(user).then((user) => user.save());
export const deleteUserByEmail = async (email : string) => User.findOneAndDelete({email});
export const deleteUserById = async (idUser : number) => User.findOneAndDelete({idUser});
export const updateUserByEmail = async (email : string, user : IUser) => User.findOneAndUpdate({email}, user);

