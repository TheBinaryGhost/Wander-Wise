import { generateAccessToken } from "../config/jwt.js";
import {create} from "./user.js";

export const register = async (data) => {
    const user = await create(data);
    //const accessToken = await JsonWebTokenError.sign({userID: user._id},)
    return generateAccessToken({ userID: user._id});
}