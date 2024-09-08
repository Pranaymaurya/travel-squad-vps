import mongoose from "mongoose";

const cabBookingBookingSchema = new mongoose.Schema(
  {
    cab: {
      type: Schema.Types.ObjectId,
      ref: "Cab",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    dropoffLocation: {
      type: String,
      required: true,
    },
    pickupTime: {
      type: Date,
      required: true,
    },
    dropoffTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CabBooking = mongoose.model("CabBooking", cabBookingBookingSchema);
export default CabBooking;
