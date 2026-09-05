import jwt from "jsonwebtoken";

export const generateAccessToken = async (data, expiresIn = process.env.JWT_EXPIRES_IN) => { // data => { userId: user._id }
    const token = await jwt.sign({ ...data, type: 'access' }, process.env.JWT_KEY, { expiresIn });
    return token;
}

export const generateInviteToken = async (data, expiresIn = '1h') => {
    const token = await jwt.sign({ ...data, type: 'invite' }, process.env.JWT_KEY, { expiresIn });
    return token;
}

export const verifyAccessToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded.type !== 'access') {
        throw new Error('Invalid token type');
    }
    return decoded.userId;
}

export const verifyInviteToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded.type !== 'invite') {
        throw new Error('Invalid token type');
    }
    return decoded.tripId;
}
