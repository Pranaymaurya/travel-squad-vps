import mongoose from "mongoose";

const cabSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
      default:'N/A'
    },
    model: {
      type: String,
      required: true,
      default:'N/A'
    },
    type: {
      type: String,
      required: true,
      default:'N/A'
    },
    seats: {
      type: Number,
      required: true,
      default:0
    },
    kmsIncluded: {
      type: Number,
      required: true,
      default:0
    },
    extraKmFare: {
      type: Number,
      required: true,
      default:0
    },
    fuelType: {
      type: String,
      required: true,
      default:'N/A'
    },
    cancellation: {
      type: String,
      required: true,
      default:'N/A'
    },
    rating: {
      type: Number,
      required: true,
      default:0
    },
    reviewCount: {
      type: Number,
      required: true,
      default:0
    },
    originalPrice: {
      type: Number,
      required: true,
      default:0
    },
    discountedPrice: {
      type: Number,
      required: true,
      default:function() {
        return this.originalPrice; // Set default to originalPrice
    }
    },
    taxes: {
      type: Number,
      required: true,
      default:0
    },
    travelType: {
      type: String,
      required: true,
      default:'N/A'
    },
    inclusions: [
      {
        type: String,
        required: true,
        default:'N/A'
      },
    ],
    exclusions: [
      {
        type: String,
        required: true,
        
        default:'N/A'
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    //offers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer' }],
  },
  {
    timestamps: true,
  }
);

cabSchema.pre('save', function(next) {
  if (!this.discountedPrice) {
      this.discountedPrice = this.originalPrice;
  }
  next();
});

const Cab = mongoose.model("Cab", cabSchema);
export default Cab;
