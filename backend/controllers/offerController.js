import asyncHandler from "../middleware/asyncHandler.js";
import Offer from "../models/offerModel.js";


const getOffers = asyncHandler(async (req, res) => {
  const offers = await Offer.find({});
  res.json(offers);
});

const getOfferById = asyncHandler(async (req, res) => {
  const offer = await Offer.findById(req.params.id);

  if (offer) {
    return res.json(offer);
  } else { 
    res.status(404);
    throw new Error("offer not found");
  }
});

const deleteOffer = asyncHandler(async (req, res) => {
  const offer = await Offer.findById(req.params.id);

  if (offer) {
    await Offer.deleteOne({ _id: offer._id });
    res.json({ message: "Offer removed" });
  } else {
    res.status(404);
    throw new Error("Offer not found");
  }
});

export { getOffers, getOfferById, deleteOffer }; 