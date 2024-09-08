import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    }, 
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    category: {
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
    price: {
      type: Number,
      required: true,
    },
    taxes: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    star: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    amenities: [
      {
        type: String,
        required: true,
      },
    ],
    facilities: [
      {
        type: String,
        required: true,
      },
    ],
    featured: {
      type: Boolean,
      required: true,
    },
    hotelPriceHighlight: {
      type: String,
      required: true,
    },
    inclusions: [
      {
        type: String,
        required: true,
      },
    ],
    foodAndDining: {
      title: {
        type: String,
        required: true,
      },
      description: [
        {
          type: String,
          required: true,
        },
      ],
      img: {
        type: String,
        required: true,
      },
    },
    locationAndSurroundings: {
      title: {
        type: String,
        required: true,
      },
      description: [
        {
          type: String,
          required: true,
        },
      ],
      img: {
        type: String,
        required: true,
      },
    },
    roomDetailsAndAmenities: {
      title: {
        type: String,
        required: true,
      },
      description: [
        {
          type: String,
          required: true,
        },
      ],
      img: {
        type: String,
        required: true,
      },
    },
    activitiesAndNearbyAttractions: {
      title: {
        type: String,
        required: true,
      },
      description: [
        {
          type: String,
          required: true,
        },
      ],
      img: {
        type: String,
        required: true,
      },
    },
    hotelDetails: {
      description: {
        type: String,
        required: true,
      },
      priceDescription: {
        type: String,
        required: true,
      },
      priceLocation: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
    },
   // offers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer' }],
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
