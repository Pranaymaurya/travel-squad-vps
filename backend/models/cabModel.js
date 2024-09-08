import mongoose from "mongoose";

const cabSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    kmsIncluded: {
      type: Number,
      required: true,
    },
    extraKmFare: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    cancellation: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviewCount: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      required: true,
    },
    taxes: {
      type: Number,
      required: true,
    },
    travelType: {
      type: String,
      required: true,
    },
    inclusions: [
      {
        type: String,
        required: true,
      },
    ],
    exclusions: [
      {
        type: String,
        required: true,
      },
    ],
    //offers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer' }],
  },
  {
    timestamps: true,
  }
);

const Cab = mongoose.model("Cab", cabSchema);
export default Cab;
