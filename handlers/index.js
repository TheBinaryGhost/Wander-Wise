import { Router } from "express";
import BAGGAGE_ROUTER from "./baggage.js";
import USER_ROUTER from "./user.js";

const HANDLERS = Router();

HANDLERS.use("/baggages", BAGGAGE_ROUTER);
HANDLERS.use("/users", USER_ROUTER);

export default HANDLERS;
