import Itinerary from "../models/itinerary.js";
import { getOne as getTrip } from "./trip.js";
import { ValidationError } from "../errors/validation.js";
import { NotFoundError } from "../errors/not-found.js";

export const create = async (data, tripId, userId) => {
  const trip = await getTrip(tripId, userId);

  if (
    new Date(data.date) > new Date(trip.startDate) ||
    new Date(data.date) < new Date(trip.endDate)
  ) {
    throw new ValidationError("Itinerary date must be within the trip dates");
  }

  const itinerary = await Itinerary.create(data);
  return itinerary;
};

export const getAll = async (tripId, userId) => {
  await getTrip(tripId, userId);
  const itineraries = await Itinerary.find({ trip: tripId });
  return itineraries;
};

export const getOne = async (id, userId, tripId) => {
  await getTrip(tripId, userId);
  const itinerary = await Itinerary.findById(id);
  if (!itinerary) {
    throw new NotFoundError("Itinerary not found");
  }
  return itinerary;
};

export const update = async (id, userId, tripId, data) => {
  await getTrip(tripId, userId);

  if (
    new Date(itineraryData.date) > new Date(trip.startDate) ||
    new Date(itineraryData.date) < new Date(trip.endDate)
  ) {
    throw new ValidationError("Itinerary date must be within the trip dates");
  }

  const itinerary = await Itinerary.findOneAndUpdate(
    { _id: id, trip: tripId },
    data,
    {
      returnDocument: 'after',
    }
  );

  if (!itinerary) {
    throw new NotFoundError("Itinerary not found");
  }

  return itinerary;
};

export const destroy = async (id, userId, tripId) => {
  await getTrip(tripId, userId);
  const itinerary = await Itinerary.findOneAndDelete({ _id: id, trip: tripId });
  if (!itinerary) {
    throw new NotFoundError("Itinerary not found");
  }
  return itinerary;
};
