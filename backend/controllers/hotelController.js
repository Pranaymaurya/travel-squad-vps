import asyncHandler from "../middleware/asyncHandler.js";
import Hotel from "../models/hotelModel.js";
import {FindAndDeleteImage,DeleteImage} from "../config/DeleteImage.js";

const getHotels = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find({});
  res.json(hotels);
});



const getHotelsById = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);

  if (hotel) {
    return res.json(hotel);
  } else {
    res.status(404);
    throw new Error("Hotel not found");
  }
});

const deleteHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);

  if (hotel) {
    DeleteImage(hotel.imageUrl);
    DeleteImage(hotel.foodAndDining.img);
    DeleteImage(hotel.locationAndSurroundings.img);
    DeleteImage(hotel.roomDetailsAndAmenities.img);
    DeleteImage(hotel.activitiesAndNearbyAttractions.img);
    for (let i of hotel.images) {
      DeleteImage(i);
    }
    await Hotel.deleteOne({ _id: hotel._id });
    res.json({ message: "Hotel removed" });
  } else {
    res.status(404);
    throw new Error("Hotel not found");
  }
});

const updateHotel = asyncHandler(async (req, res) => {
  const {
    imageUrl,
    name,
    location,
    distance,
    category,
    rating,
    reviewCount,
    price,
    taxes,
    images,
    star,
    type,
    featured,
    hotelPriceHighlight,
    inclusions,
    amenities,
    facilities,
    foodAndDining,
    locationAndSurroundings,
    roomDetailsAndAmenities,
    activitiesAndNearbyAttractions,
    hotelDetails,
    NumberOfRooms,
  } = req.body;

  try {
    // Find the Tour document containing the package with the specified _id
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      res.status(404).json({ message: "Hotel not found" });
      return;
    }

    const formattedImagePath = imageUrl.replace(/\\/g, "/");

    console.log(req.body);
   const getHotelImageurl= FindAndDeleteImage(hotel.imageUrl, formattedImagePath);
   FindAndDeleteImage(hotel.foodAndDining.img,foodAndDining.img)
   FindAndDeleteImage(hotel.locationAndSurroundings.img,locationAndSurroundings.img)
   FindAndDeleteImage(hotel.roomDetailsAndAmenities.img,roomDetailsAndAmenities.img)
   FindAndDeleteImage(hotel.activitiesAndNearbyAttractions.img,activitiesAndNearbyAttractions.img);
    for (let i of hotel.images) {
      if (!images.includes(i)) {
        DeleteImage(i);
      }
     }
    
    // Update tour properties
    hotel.imageUrl = formattedImagePath;
    hotel.name = name;
    hotel.location = location;
    hotel.distance = distance;
    hotel.category = category;
    hotel.rating = rating;
    hotel.reviewCount = reviewCount;
    hotel.price = price;
    hotel.taxes = taxes;
    hotel.images = images;
    hotel.star = star;
    hotel.type = type;
    hotel.featured = featured;
    hotel.hotelPriceHighlight = hotelPriceHighlight;
    hotel.inclusions = inclusions;
    hotel.amenities = amenities;
    hotel.facilities = facilities;
    hotel.foodAndDining = foodAndDining;
    hotel.locationAndSurroundings = locationAndSurroundings;
    hotel.roomDetailsAndAmenities = roomDetailsAndAmenities;
    hotel.activitiesAndNearbyAttractions = activitiesAndNearbyAttractions;
    hotel.hotelDetails = hotelDetails;
    hotel.NumberofRooms  = NumberOfRooms;

    // Save the updated Tour document
    const updatedHotel = await hotel.save();
    res.json(updatedHotel);
  } catch (error) {
    console.error("Error updating hotel:", error); // Log the error
    res.status(500).json({ message: "Server error", error });
  }
});

const createHotel = asyncHandler(async (req, res) => {
  const {
    imageUrl,
    name,
    location,
    distance,
    category,
    rating,
    reviewCount,
    price,
    taxes,
    images,
    star,
    type,
    featured,
    hotelPriceHighlight,
    inclusions,
    amenities,
    facilities,
    foodAndDining,
    locationAndSurroundings,
    roomDetailsAndAmenities,
    activitiesAndNearbyAttractions,
    hotelDetails,
  } = req.body;
console.log(req.body);

  if (
    !imageUrl ||
    !name ||
    !location ||
    !distance ||
    !category ||
    !rating ||
    !reviewCount ||
    !price ||
    !taxes ||
    !images ||
    !star ||
    !type ||
    !featured ===''||
    !hotelPriceHighlight ||
    !inclusions ||
    !amenities ||
    !facilities ||
    !foodAndDining ||
    !locationAndSurroundings ||
    !roomDetailsAndAmenities ||
    !activitiesAndNearbyAttractions ||
    !hotelDetails
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const formattedImagePath = imageUrl.replace(/\\/g, "/");

  const hotel = await Hotel.create({
    imageUrl: formattedImagePath,
    name,
    location,
    distance,
    category,
    rating,
    reviewCount,
    price,
    taxes,
    images,
    star,
    type,
    featured,
    hotelPriceHighlight,
    inclusions,
    amenities,
    facilities,
    foodAndDining,
    locationAndSurroundings,
    roomDetailsAndAmenities,
    activitiesAndNearbyAttractions,
    hotelDetails,
  });

  if (hotel) {
    res.status(201).json(hotel);
  } else {
    res.status(400);
    throw new Error("Invalid hotel data");
  }
});

const UpdateRoom=async(req,res)=>{
  try {
    const {id}=req.params;
    const {NumberOfRooms}=req.body;
    const hotel=await Hotel.findOne({_id:id,user:req.user._id});
    if(!hotel) return res.status(404).json({success:false,message:"Hotel Not Found"})
    hotel.NumberofRooms =NumberOfRooms;
    await hotel.save();
    res.status(200).json({success:true
    ,message:hotel})
  } catch (error) {
    res.status(500).json({success:false,message:"Internal Server Error"})
  }
}

const GetHotelByUserId=async (req,res)=>{
  try {
    const hotel=await Hotel.findOne({user:req.params.id})
    if(hotel) return res.status(200).json(hotel)
      res.status(400).json({success:false,message:"user Not Found"})
  } catch (error) {
    res.status(500).json({success:false,message:"Internal Server Error"})
  }
}

export { getHotels, getHotelsById, deleteHotel, updateHotel, createHotel,UpdateRoom,GetHotelByUserId };
