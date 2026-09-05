import { NotFoundError } from "../errors/not-found.js";
import Baggage from "../models/baggage.js";
import { getOne as getTrip } from "./trip.js";

export const create = async (data, userId, tripId) => {
    await getTrip(tripId, userId);
    const baggage = await Baggage.create({ ...data, user: userId, trip: tripId });
    return baggage;
}

export const getAll = async (userId, tripId) => {
    await getTrip(tripId, userId);
    const baggages = await Baggage.find({ trip: tripId });
    return baggages;
}

export const getOne = async (_id, userId, tripId) => {
    await getTrip(tripId, userId);
    const baggage = await Baggage.findOne({ _id, trip: tripId });
    if (!baggage) {
        throw new NotFoundError("Baggage not found!");
    }
    return baggage;
}

export const update = async (_id, data, userId, tripId) => {
    await getTrip(tripId, userId);
    const allowedFields = {
      name: data.name,
      quantity: data.quantity,
      packed: data.packed,
      category: data.category,
    };
    const baggage = await Baggage.findOneAndUpdate(
        { _id, trip: tripId },
        allowedFields,
        { returnDocument: 'after' }
    );
    if (!baggage) throw new NotFoundError("Baggage not found!");
    return baggage;
}

export const destroy = async (_id, userId, tripId) => {
    await getTrip(tripId, userId);
    const baggage = await Baggage.findOneAndDelete({ _id, trip: tripId });
    if (!baggage) throw new NotFoundError("Baggage not found!");
    return baggage;
};

export const addItem = async (_id, itemData, userId, tripId) => {
    await getTrip(tripId, userId);
    const baggage = await Baggage.findOneAndUpdate(
        { _id, trip: tripId },
        { $push: { items: itemData } },
        { returnDocument: 'after' }
    );
    if (!baggage) throw new NotFoundError("Baggage not found!");
    return baggage;
};

export const removeItem = async (_id, itemId, userId, tripId) => {
    await getTrip(tripId, userId);
    const baggage = await Baggage.findOneAndUpdate(
        { _id, trip: tripId },
        { $pull: { items: { _id: itemId } } },
        { returnDocument: 'after' }
    );
    if (!baggage) throw new NotFoundError("Baggage not found!");
    return baggage;
};