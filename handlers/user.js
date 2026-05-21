import { Router } from "express";
import { createUserValidator } from "../validators/user.js";
import { create } from "../services/user.js";

const USER_ROUTER = Router();

USER_ROUTER.post("/", createUserValidator, async (req, res, next) => {
    try {
        const user = await create(req.body);
        res.status(201).json({ data: user });
    } catch (error) {
        next(error);
    }
});

export default USER_ROUTER;
