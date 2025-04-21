import mongoose from "mongoose";

const cabBookingSchema = new mongoose.Schema(
  {
    cab: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cab",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
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
      type: String,
      required: true,
    },
    dropoffTime: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    amount: {
      type: Number,
      required: true,
    },
    taxRate: {
      type: Number, // Percentage (e.g., 10 for 10%)
      default: 0,
      required: true,
    },
    totalAmount: {
      type: Number,
      
    },
  },
  {
    timestamps: true,
  }
);

// Auto-calculate totalAmount before saving
cabBookingSchema.pre("save", function (next) {
  this.totalAmount = this.amount + (this.amount * this.taxRate / 100);
  next();
});

const CabBooking = mongoose.model("CabBooking", cabBookingSchema);
export default CabBooking;
