import Itinerary from "../models/itinerary";
import { getOne as getTrip } from "./trip.js";
import { ValidationError } from "../errors/validation.js";

export const create = async (data, tripId, userId) => {
    const trip = await getTrip(tripId, userID);

    if (
        new Date(data.date) > new Date(trip.startDate) ||
        new Date(data.date) > new Date(trip.endDate)
    ) {
        throw new ValidationError("Itinerary date must be withtin the trip date");
    }

    const itinerary = await Itinerary.create(date);
    return itinerary;
};