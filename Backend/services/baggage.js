import { NotFoundError } from "../errors/not-found.js";
import Baggage from "../models/baggage.js";
import { getOne as getTrip } from "./trip.js";

export const create = async (data, userId, tripId) => { // data => { name: "jacket" }
    /**
     * create(data) => create({ ...data, user: userId })
     * create({ name: "jacket" }) => create({ name: "jacket", user: "6a12bf665286d3767baa8e67" })
     */

    /**
     * Before creating baggage, We need to first check
     * whether or not the trip exists
     */
    await getTrip(tripId, userId);
    const baggage = await Baggage.create({ ...data, user: userId, trip: tripId });
    return baggage;
}

export const getAll = async (userId, tripId) => {
    const baggages = await Baggage.find({ user: userId, trip: tripId });
    return baggages;
}

export const getOne = async (_id, userId, tripId) => {
    const baggage = await Baggage.findOne({
        _id, user: userId, trip: tripId
    });
    if (!baggage) {
        throw new NotFoundError("Baggage not found!");
    }
    return baggage;
}

export const update = async (_id, data, userId, tripId) => {
    const baggage = await Baggage.findOneAndUpdate(
        { _id, user: userId, trip: tripId },
        data,
        { returnDocument: 'after' }
    );
    if (!baggage) throw new NotFoundError("Baggage not found!");
    return baggage;
}

export const destroy = async (_id, userId, tripId) => {
    const baggage = await Baggage.findOneAndDelete({ _id, user: userId, trip: tripId });
    if (!baggage) throw new NotFoundError("Baggage not found!");
    return baggage;
};