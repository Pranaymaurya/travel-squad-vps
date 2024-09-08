import mongoose from "mongoose";

const tourCategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TourCategory = mongoose.model("TourCategory", tourCategorySchema);

export default TourCategory;
