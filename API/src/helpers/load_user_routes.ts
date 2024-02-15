import register from "../routes/user/register";
import login from "../routes/user/login";
import getUsers from "../routes/user/getUsers";
import getUserByEmail from "../routes/user/getUserByEmail";
import updateUserByEmail from "../routes/user/updateUserByEmail";
import updateUserById from "../routes/user/updateUserById";
import getUserById from "../routes/user/getUserById";
import deleteAllUsers from "../routes/user/deleteAllUsers";
import deleteById from "../routes/user/deleteById";
import deleteByEmail from "../routes/user/deleteByEmail";


import { Express } from "express";
export default (app: Express) => {
    register(app);
    login(app);
    updateUserByEmail(app);
    updateUserById(app);

    getUsers(app);
    getUserByEmail(app);
    getUserById(app);
    deleteAllUsers(app);
    deleteById(app);
    deleteByEmail(app);
};
