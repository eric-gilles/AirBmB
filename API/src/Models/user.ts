import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: {type : string, required : true, unique : true};
    firstName: {type : string, required : true};
    lastName: {type : string, required : true};
    phone: {type : string, required : true};
    password: {type : string, required : true, select : false};
}

// Define the schema
const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password : { type: String, required: true }
});

// Create and export the model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;
type getUsers = () => Promise<IUser[]>;
type getUserByEmail = (email : string) => Promise<IUser>;
type createUser = (user : IUser) => Promise<IUser>;
type deleteUserByEmail = (email : string) => Promise<IUser>;
type updateUserByEmail = (email : string, user : IUser) => Promise<IUser>;

export const getUsers = async () => User.find();
export const getUserById = async (id : string) => User.findById(id);
export const getUserByEmail = async (email : string) => User.findOne({email});
export const createUser = async (user : IUser) => await User.create(user).then((user) => user.save());
export const deleteUserByEmail = async (email : string) => User.findByIdAndDelete(email);
export const updateUserByEmail = async (email : string, user : IUser) => User.findOneAndUpdate({email}, user);
