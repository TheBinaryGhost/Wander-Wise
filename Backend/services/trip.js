import Trip from "../models/trip.js";
import { NotFoundError } from "../errors/not-found.js";
import { ConflictError } from "../errors/conflict.js";
import { ValidationError } from "../errors/validation.js";
import { generateInviteToken, verifyInviteToken } from "../config/jwt.js";
import sendMail from "../utils/send-mail.js";

export const create = async (data, userId) => {
  const trip = await Trip.create({ ...data, user: userId });
  return trip;
};

export const getAll = async (userId) => {
  const trips = await Trip.find({
    $or: [{ user: userId }, { collaborators: userId }],
  })
    .populate("collaborators", ["name", "email"])
    .populate("user", "name");
  return trips;
};

export const getOne = async (id, userId) => {
  const trip = await Trip.findOne({
    _id: id,
    $and: [
      {
        $or: [{ user: userId }, { collaborators: userId }],
      },
    ],
  })
  .populate("collaborators", ["name", "email"])
  .populate("user", "name");
  if (!trip) throw new NotFoundError("Trip not found");
  return trip;
};

export const update = async (id, tripData, userId) => {
  const trip = await Trip.findOneAndUpdate(
    { _id: id, $or: [{ user: userId }, { collaborators: userId }] },
    tripData,
    { returnDocument: 'after' }
  );
  if (!trip) throw new NotFoundError("Trip not found");
  return trip;
};

export const destroy = async (id, userId) => {
  const trip = await Trip.findOneAndDelete({ _id: id, user: userId });
  if (!trip) throw new NotFoundError("Trip not found");
  return trip;
};

export const inviteCollaborator = async (id, userId, collaboratorEmails) => {
  const trip = await getOne(id, userId);

  if (!collaboratorEmails || collaboratorEmails.length === 0) {
    throw new ValidationError("At least one collaborator email is required");
  }

  // Prevent owner from inviting themselves
  const ownerEmail = trip.user?.email;
  if (ownerEmail && collaboratorEmails.includes(ownerEmail)) {
    throw new ConflictError("Cannot invite the trip owner as a collaborator");
  }

  if (
    trip.collaborators?.some((collaborator) =>
      collaboratorEmails.includes(collaborator.email)
    )
  ) {
    throw new ConflictError("One or more collaborators already invited");
  }

  const token = await generateInviteToken({ tripId: id }, '1h');

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

export const acceptInvite = async (token, userId) => {
  const tripId = verifyInviteToken(token);
  const trip = await Trip.findOne({ _id: tripId }).populate(
    "collaborators"
  );

  if (!trip) throw new NotFoundError("Trip not found");
  if (
    trip.collaborators.some(
      (collaborator) => collaborator._id.toString() === userId.toString()
    )
  ) {
    throw new ConflictError("User already a collaborator");
  }

  trip.collaborators.push(userId);
  await trip.save();

  return { message: "Invitation accepted successfully" };
}
