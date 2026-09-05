import { body, param } from "express-validator";
import { validate } from "./validate.js";

export const createItineraryValidator = [
  param("tripId")
    .trim()
    .notEmpty()
    .withMessage("Trip is required")
    .isMongoId()
    .withMessage("Trip must be a valid MongoDB ID"),
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().optional(),
  body("date")
    .trim()
    .notEmpty()
    .withMessage("Date is required")
    .custom((value) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error("Date must be a valid date");
      }
      return true;
    }),
  body("activities").isArray().withMessage("Activities must be an array"),
  body("activities.*.name")
    .trim()
    .notEmpty()
    .withMessage("Activity name is required"),
  body("activities.*.time")
    .trim()
    .notEmpty()
    .withMessage("Activity time is required"),
  body("activities.*.notes")
    .optional()
    .isArray()
    .withMessage("Notes must be an array"),
  body("activities.*.notes.*")
    .trim()
    .optional()
    .notEmpty()
    .withMessage("Note is required"),
  validate,
];

export const updateItineraryValidator = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("Itinerary is required")
    .isMongoId()
    .withMessage("Itinerary must be a valid MongoDB ID"),
  body("title").trim().optional(),
  body("description").trim().optional(),
  body("date")
    .trim()
    .optional()
    .custom((value) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error("Date must be a valid date");
      }
      return true;
    }),
  body("activities").isArray().withMessage("Activities must be an array"),
  body("activities.*.name").trim().optional(),
  body("activities.*.time").trim().optional(),
  body("activities.*.notes")
    .optional()
    .isArray()
    .withMessage("Notes must be an array"),
  body("activities.*.notes.*")
    .trim()
    .optional()
    .notEmpty()
    .withMessage("Note is required"),
  validate,
];
