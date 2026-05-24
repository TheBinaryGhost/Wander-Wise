import {Router} from "express";
import { createUserValidator } from "../validators/user.js"

const AUTH_ROUTER = Router();

AUTH_ROUTER.post("/register", createUserValidator, async (req, res, next)) => {
    try {
        const token = await register(request.body);
        res.status(201).json ( {})
    }
}