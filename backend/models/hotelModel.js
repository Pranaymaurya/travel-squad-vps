import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      // required: true,
      default:"N/A"
    }, 
    name: {
      type: String,
      // required: true,
      default:"N/A"
    },
    location: {
      type: String,
      // required: true,
      default:"N/A"
    },
    distance: {
      type: String,
      // required: true,
      default:"N/A"
    },
    category: {
      type: String,
      // required: true,
      default:"N/A"
    },
    rating: {
      type: Number,
      // required: true,
      default:0
    },
    reviewCount: {
      type: Number,
      // required: true,
      default:0
    },
    price: {
      type: Number,
      // required: true,
      default:0
    },
    taxes: {
      type: Number,
      // required: true,
      default:0
    },
    images: [
      {
        type: String,
        // required: true,
        default:"N/A"
      },
    ],
    star: {
      type: Number,
      // required: true,
      default:0
    },
    type: {
      type: String,
      // required: true,
      default:"N/A"
    },
    amenities: [
      {
        type: String,
        // required: true,
        default:"N/A"
      },
    ],
    facilities: [
      {
        type: String,
        // required: true,
        default:"N/A"
      },
    ],
    featured: {
      type: Boolean,
      // required: true,
      default:false
    },
    hotelPriceHighlight: {
      type: String,
      // required: true,
      default:"N/A"
    },
    inclusions: [
      {
        type: String,
        // required: true,
        default:"N/A"
      },
    ],
    foodAndDining: {
      title: {
        type: String,
        // required: true,
        default:"N/A"
      },
      description: [
        {
          type: String,
          // required: true,
          default:"N/A"
        },
      ],
      img: {
        type: String,
        // required: true,
        default:"N/A"
      },
    },
    locationAndSurroundings: {
      title: {
        type: String,
        // required: true,
        default:"N/A"
      },
      description: [
        {
          type: String,
          // required: true,
          default:"N/A"
        },
      ],
      img: {
        type: String,
        // required: true,
        default:"N/A"
      },
    },
    roomDetailsAndAmenities: {
      title: {
        type: String,
        // required: true,
        default:"N/A"
      },
      description: [
        {
          type: String,
          // required: true,
          default:"N/A"
        },
      ],
      img: {
        type: String,
        // required: true,
        default:"N/A"
      },
    },
    activitiesAndNearbyAttractions: {
      title: {
        type: String,
        // required: true,
        default:"N/A"
      },
      description: [
        {
          type: String,
          // required: true,
          default:"N/A"
        },
      ],
      img: {
        type: String,
        // required: true,
        default:"N/A"
      },
    },
    hotelDetails: {
      description: {
        type: String,
        // required: true,
        default:"N/A"
      },
      priceDescription: {
        type: String,
        // required: true,
        default:"N/A"
      },
      priceLocation: {
        type: String,
        // required: true,
        default:"N/A"
      },
      price: {
        type: String,
        // required: true,
        default:"N/A"
      },
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    NumberofRooms:{
      type:Number,
      // required:true,
      default:0
    },
   // offers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer' }],
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
