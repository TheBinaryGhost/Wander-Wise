import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  update,
  destroy,
} from "../services/itinerary.js";
import {
  createItineraryValidator,
  updateItineraryValidator,
} from "../validators/itinerary.js";

const ITINERARY_ROUTER = Router({ mergeParams: true });

ITINERARY_ROUTER.post(
  "/",
  createItineraryValidator,
  async (req, res, next) => {
    try {
      const itinerary = await create(
        req.body,
        req.params.tripId,
        req.user,
      );
      res.status(201).json(itinerary);
    } catch (error) {
      next(error);
    }
  }
);

ITINERARY_ROUTER.get("/", async (req, res, next) => {
  try {
    const itineraries = await getAll(
      req.params.tripId,
      req.user.userId
    );
    res.json(itineraries);
  } catch (error) {
    next(error);
  }
});

ITINERARY_ROUTER.get("/:id", async (req, res, next) => {
  try {
    const itinerary = await getOne(
      req.params.id,
      req.user,
      req.params.tripId
    );
    res.json(itinerary);
  } catch (error) {
    next(error);
  }
});

ITINERARY_ROUTER.patch(
  "/:id",
  updateItineraryValidator,
  async (req, res, next) => {
    try {
      const itinerary = await update(
        req.params.id,
        req.user,
        req.params.tripId,
        req.body,
      );
      res.json(itinerary);
    } catch (error) {
      next(error);
    }
  }
);

ITINERARY_ROUTER.delete("/:id", async (req, res, next) => {
  try {
    const itinerary = await destroy(
      req.params.id,
      req.user,
      req.params.tripId,
    );
    res.json(itinerary);
  } catch (error) {
    next(error);
  }
});

export default ITINERARY_ROUTER;
