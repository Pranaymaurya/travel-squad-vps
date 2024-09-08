import asyncHandler from "../middleware/asyncHandler.js";
import Cab from "../models/cabModel.js";

const getCabs = asyncHandler(async (req, res) => {
    const cabs = await Cab.find({});
    res.json(cabs);
  });

  const getCabsById = asyncHandler(async (req, res) => {
    const cab = await Cab.findById(req.params.id);
  
    if (cab) {
      return res.json(cab);
    } else { 
      res.status(404);
      throw new Error("Cab not found");
    }
  });

  const deleteCab = asyncHandler(async (req, res) => {
    const cab = await Cab.findById(req.params.id);
  
    if (cab) {
      await Cab.deleteOne({ _id: cab._id });
      res.json({ message: "Cab removed" });
    } else {
      res.status(404);
      throw new Error("Cab not found");
    }
  });

  const updateCab = asyncHandler(async (req, res) => {
    const {
      imageUrl,
      model,
      type,
      seats,
      kmsIncluded,
      extraKmFare,
      fuelType,
      cancellation,
      rating,
      reviewCount,
      originalPrice,
      discountedPrice,
      taxes,
      travelType,
      inclusions,
      exclusions,
    } = req.body;
  
    try {
      // Find the Tour document containing the package with the specified _id
      const cab = await Cab.findById(req.params.id);
  
      if (!cab) {
        res.status(404).json({ message: "Cab not found" });
        return;
      }
  
      const formattedImagePath = imageUrl.replace(/\\/g, "/");
  
      // Update tour properties
      cab.imageUrl = formattedImagePath;
      cab.model = model; 
      cab.type = type;
      cab.seats = seats;
      cab.kmsIncluded = kmsIncluded;
      cab.extraKmFare = extraKmFare;
      cab.fuelType = fuelType;
      cab.cancellation = cancellation;
      cab.rating = rating;
      cab.reviewCount = reviewCount;
      cab.originalPrice = originalPrice;
      cab.discountedPrice = discountedPrice;
      cab.taxes = taxes;
      cab.travelType = travelType;
      cab.inclusions = inclusions;
      cab.exclusions = exclusions;
  
      // Save the updated Tour document
      const updatedCab = await cab.save();
      res.json(updatedCab);
    } catch (error) {
      console.error("Error updating cab:", error); // Log the error
      res.status(500).json({ message: "Server error", error });
    }
  });
  

  const createCab = asyncHandler(async (req, res) => {
    const {
      imageUrl,
      model,
      type,
      seats,
      kmsIncluded,
      extraKmFare,
      fuelType,
      cancellation,
      rating,
      reviewCount,
      originalPrice,
      discountedPrice,
      taxes,
      travelType,
      inclusions,
      exclusions,
    } = req.body;
  
    if (
     ! imageUrl ||
     ! model ||
     ! type ||
     ! seats ||
     ! kmsIncluded ||
     ! extraKmFare ||
     ! fuelType ||
     ! cancellation ||
     ! rating ||
     ! reviewCount ||
     ! originalPrice ||
     ! discountedPrice ||
     ! taxes ||
     ! travelType ||
     ! inclusions ||
     ! exclusions
    ) {
      res.status(400);
      throw new Error("All fields are required");
    }
  
    const formattedImagePath = imageUrl.replace(/\\/g, "/");
  
    const cab = await Cab.create({
      imageUrl: formattedImagePath,
      model,
      type,
      seats,
      kmsIncluded,
      extraKmFare,
      fuelType,
      cancellation,
      rating,
      reviewCount,
      originalPrice,
      discountedPrice,
      taxes,
      travelType,
      inclusions,
      exclusions,
    });
  
    if (cab) {
      res.status(201).json(cab);
    } else {
      res.status(400);
      throw new Error("Invalid cab data");
    }
  });
  
  
  
export {getCabs, getCabsById, deleteCab, updateCab, createCab}; 