import { Schema, model } from "mongoose";

const BaggageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Baggage = model("Baggage", BaggageSchema);

export default Baggage;
