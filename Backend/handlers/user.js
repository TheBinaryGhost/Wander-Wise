import { Router } from "express";
import { createUserValidator, updateUserValidator } from "../validators/user.js";
import { create, destroy, getAll, getOne, getByIds, update } from "../services/user.js";

const USER_ROUTER = Router();

USER_ROUTER.post("/", createUserValidator, async (req, res, next) => {
    try {
        const user = await create(req.body);
        res.status(201).json({ data: user });
    } catch (error) {
        next(error);
    }
});

USER_ROUTER.get("/", async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const users = await getAll();
        res.status(200).json({ data: users });
    } catch (error) {
        next(error);
    }
});

USER_ROUTER.get("/batch", async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { ids } = req.query;
        if (!ids) {
            return res.status(400).json({ message: "ids query parameter is required" });
        }
        const idArray = ids.split(",").filter(Boolean);
        const users = await getByIds(idArray);
        res.status(200).json({ data: users });
    } catch (error) {
        next(error);
    }
});

USER_ROUTER.get("/:id", async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await getOne(req.params.id);
        res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
});

USER_ROUTER.patch("/:id", updateUserValidator, async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (req.user !== req.params.id) {
            return res.status(403).json({ message: "You can only update your own profile" });
        }
        const user = await update(req.params.id, req.body);
        res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
});

USER_ROUTER.delete("/:id", async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (req.user !== req.params.id) {
            return res.status(403).json({ message: "You can only delete your own account" });
        }
        const user = await destroy(req.params.id);
        res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
});

export default USER_ROUTER;
