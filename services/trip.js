import Trip from "../models/trip.js";
import { NotFoundError } from "../errors/not-found.js";
import { ConflictError } from "../errors/conflict.js";
import { generateAccessToken } from "../config/jwt.js";
import sendMail from "../utils/send-mail.js";

export const create = async (data, userID) => {
  const trip = await Trip.create({ ...data, user: userID });
  return trip;
};

export const getAll = async (userID) => {
  const trips = await Trip.find({ user: userID });
  return trips;
};

export const getOne = async (id, userID) => {
  const trip = await Trip.findOne({
    _id: id,
    user: userID,
  })
  if (!trip) throw new NotFoundError("Trip not found");
  return trip;
};

export const update = async (id, tripData, userID) => {
  const trip = await Trip.findOneAndUpdate(
    { _id: id, user: userID },
    tripData,
    { returnDocument: 'after' }
  );
  if (!trip) throw new NotFoundError("Trip not found");
  return trip;
};

export const destroy = async (id, userID) => {
  const trip = await Trip.findOneAndDelete({ _id: id, user: userID });
  if (!trip)throw new NotFoundError("Trip not found");
  return trip;
};

export const inviteCollaborator = async (id, userID, collaboratorEmails) => {
  const trip = await getOne(id, userID);

  if (
    trip.collaborators?.some((collaborator) =>
      collaboratorEmails.includes(collaborator.email)
    )
  ) {
    throw new ConflictError("Collaborator already invited");
  }

  const token = await generateAccessToken({ tripId: id }, '1h');

  const invitationLink = `${process.env.BASE_URL}/trips/${id}/invite/accept?token=${token}`;

  await sendMail(collaboratorEmails.join(","), "Invitation to join a trip", {
    link: invitationLink,
    title: trip.title,
    startDate: trip.startDate.toDateString(),
    endDate: trip.endDate.toDateString(),
    name: trip.user.name,
  });

  return { message: "Collaborators invited successfully" };
}