import register from "../routes/user/register";
import login from "../routes/user/login";
import getUsers from "../routes/user/getUsers";
import deleteAllUsers from "../routes/user/deleteAllUsers";
import getUserByEmail from "../routes/user/getUserByEmail";
import updateUser from "../routes/user/updateUser";
import getUserById from "../routes/user/getUserById";
import deleteById from "../routes/user/deleteById";

import { Express } from "express";
import deleteByEmail from "../routes/user/deleteByEmail";
export default (app: Express) => {
    register(app);
    login(app);
    updateUser(app);
    
    getUsers(app);
    getUserByEmail(app);
    getUserById(app);
    deleteAllUsers(app);
    deleteById(app);
    deleteByEmail(app);
};
