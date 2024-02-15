import register from "../routes/user/register";
import login from "../routes/user/login";
import getUsers from "../routes/user/getUsers";
import deleteAllUsers from "../routes/user/deleteAllUsers";
import getUserByEmail from "../routes/user/getUserByEmail";
import updateUser from "../routes/user/updateUser";

import { Express } from "express";
export default (app: Express) => {
    register(app);
    login(app);
    getUsers(app);
    getUserByEmail(app);
    deleteAllUsers(app);
    updateUser(app);
};
