import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  image: { type: String, required: true },
  reviews: { type: Number, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  photos: [{ type: String, required: true }],
  inclusions: [{ type: String, required: true }],
  availableFrom: { type: Date, required: true },
  availableTill: { type: Date, required: true },
  featured: {
    type: Boolean,
    required: true,
  },
  tourPlan: [
    {
      day: { type: Number, required: true },
      description: { type: String, required: true },
      car: [
        {
          destination: { type: String, required: true },
          type: { type: String, required: true },
          model: { type: String, required: true },
          facilities: { type: String, required: true },
          image: { type: String, required: true },
        },
      ],
      sightseeing: [
        {
          name: { type: String, required: true },
          location: { type: String, required: true },
          places: { type: String, required: true },
          duration: { type: String, required: true },
          placesCovered: { type: Number, required: true },
          image: { type: String, required: true },
        },
      ],
      hotels: [
        {
          timming: { type: String, required: true },
          name: { type: String, required: true },
          ratings: { type: String, required: true },
          location: { type: String, required: true },
          stayDate: { type: String, required: true },
          image: { type: String, required: true },
        },
      ],
    },
  ],
  //offers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer' }],
});

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
