import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    image: {
        type: String,
        required: true,
      },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    relatedTo: {
      type: String,
      enum: ['Blog', 'Cab', 'Hotel', 'Tour'],
      required: true,
    },
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'relatedTo',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;
