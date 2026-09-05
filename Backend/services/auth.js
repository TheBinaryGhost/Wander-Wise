import { compare } from "bcrypt";
import { generateAccessToken } from "../config/jwt.js";
import { create, getUserByEmail } from "./user.js";
import { UnauthorizedError } from "../errors/unauthorized.js";

export const register = async (data) => {
    const user = await create(data);
    const token = await generateAccessToken({ userId: user._id });
    return { token, user };
}

export const login = async (data) => {
    const user = await getUserByEmail(data.email);
    if (!await compare(data.password, user.password)) {
        throw new UnauthorizedError();
    }
    const token = await generateAccessToken({ userId: user._id });
    const { password, ...userWithoutPassword } = user.toObject();
    return { token, user: userWithoutPassword };
}
