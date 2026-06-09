import { Router } from "express";
import { create, destroy, getAll, getOne, update } from "../services/baggage.js";
import { createOrUpdateBaggageValidator } from "../validators/baggage.js";

const BAGGAGE_ROUTER = Router({ mergeParams: true });

BAGGAGE_ROUTER.post("/", createOrUpdateBaggageValidator, async (req, res, next) => {
    try {
        const baggage = await create(req.body, req.user, req.params.tripId); // create({ name: "jacket" })
        res.status(201).json({ data: baggage });
    } catch (error) {
        next(error);
    }
});

BAGGAGE_ROUTER.get("/", async (req, res, next) => {
    try {
        const baggages = await getAll(req.user, req.params.tripId);
        res.status(200).json({ data: baggages });
    } catch (error) {
        next(error);
    }
});

BAGGAGE_ROUTER.get("/:id", async (req, res, next) => {
    try {
        const baggage = await getOne(req.params.id, req.user, req.params.tripId);
        res.status(200).json({ data: baggage });
    } catch (error) {
    }
});

BAGGAGE_ROUTER.patch("/:id", createOrUpdateBaggageValidator, async (req, res, next) => {
    try {
        const baggage = await update(req.params.id, req.body, req.user, req.params.tripId);
        res.status(200).json({ data: baggage });
    } catch (error) {
        next(error);
    }
});

BAGGAGE_ROUTER.delete("/:id", async (req, res, next) => {
    try {
        const baggage = await destroy(req.params.id, req.user, req.params.tripId);
        res.status(200).json({ data: baggage });
    } catch (error) {
        next(error);
    }
});

export default BAGGAGE_ROUTER;
