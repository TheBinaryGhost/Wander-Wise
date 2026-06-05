import { Router } from "express";
import BAGGAGE_ROUTER from "./baggage.js";
import USER_ROUTER from "./user.js";
import AUTH_ROUTER from "./auth.js";
import TRIP_ROUTER from "./trip.js";

const HANDLERS = Router();

HANDLERS.use("/users", USER_ROUTER);
HANDLERS.use("/auth", AUTH_ROUTER);
HANDLERS.use("/trips", TRIP_ROUTER);
HANDLERS.use("/:tripId/baggages", BAGGAGE_ROUTER);

export default HANDLERS;
