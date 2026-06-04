import { NotFoundError } from "../errors/not-found.js";
import Baggage from "../models/baggage.js";

export const create = async (data, userID) => { // data => { name: "jacket" }
    const baggage = await Baggage.create({ ...data, user: userID });
    return baggage;
}

export const getAll = async (userID) => {
    const baggages = await Baggage.find();
    return baggages;
}

export const getOne = async (_id, userID) => {
    const baggage = await Baggage.findById({ _id, user: userID });
    if (!baggage) {
        throw new NotFoundError("Baggage not found!");
    }
    return baggage;
}

export const update = async (_id, data, userID) => {
    const baggage = await Baggage.findByIdAndUpdate({ _id, user: userID }, data, { returnDocument: 'after' });
    if (!baggage) throw new NotFoundError("Baggage not found!");
    return baggage;
}

export const destroy = async (_id, userID) => {
    const baggage = await Baggage.findByIdAndDelete({ _id, user: userID });
    if (!baggage) throw new NotFoundError("Baggage not found!");
    return baggage;
};