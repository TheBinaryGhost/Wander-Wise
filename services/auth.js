import { compare } from "bcrypt";
import { generateAccessToken } from "../config/jwt.js";
import {create, getUserByEmail} from "./user.js";
import { UnauthorizedError } from "../errors/unauthorized.js";

export const register = async (data) => {
    const user = await create(data);
    //const accessToken = await JsonWebTokenError.sign({userID: user._id},)
    return generateAccessToken({ userID: user._id});
}

export const login = async (data) => {
    const user = await getUserByEmail(data.email);
    if (!await compare(data.password, user.password)) {
        throw new UnauthorizedError();
    }
    return generateAccessToken({ userID: user._id});
}