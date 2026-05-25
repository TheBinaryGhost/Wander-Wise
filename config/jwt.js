import jwt from "jsonwebtoken";

export const generateAccessToken = async (data) => {
    const token = await jwt.sign(data, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    return token;
}

export const verifyAccessToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return decoded?.userID;
}