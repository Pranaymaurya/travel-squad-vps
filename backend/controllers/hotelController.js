import asyncHandler from "../middleware/asyncHandler.js";
import Hotel from "../models/hotelModel.js";
import {FindAndDeleteImage,DeleteImage} from "../config/DeleteImage.js";

const getHotels = asyncHandler(async (req, res) => {
  // console.log('h');
  const {
    location,
    checkin,
    checkout,
    guests,
    minBudget,
    maxBudget,
    starRating,
    guestRating,
    propertyType,
    amenities,
    facilities,
  } = req.query;
  // Build the query object
  const query = {};
  // Define an array to hold various conditions
  const orConditions = [];
  // Filter by location
  if (location) {
    orConditions.push({ location: { $regex: location, $options: 'i' } }); // Case-insensitive search
  }
  // Check-in and check-out dates logic (assumes availability field)
  if (checkin && checkout) {
    orConditions.push({
      availability: {
        $elemMatch: {
          $or: [
            { startDate: { $lte: new Date(checkin) }, endDate: { $gte: new Date(checkin) } },
            { startDate: { $lte: new Date(checkout) }, endDate: { $gte: new Date(checkout) } },
          ],
        },
      },
    });
  }
  // Filter by number of guests
  if (guests) {
    orConditions.push({ guests: { $gte:Math.floor(  Number(guests)) } });
  }
  // Filter by price range
  if (minBudget || maxBudget) {
    const priceCondition = {};
    if (minBudget) {
      priceCondition.$gte = Number(minBudget);
    }
    if (maxBudget) {
      priceCondition.$lte = Number(maxBudget);
    }
    orConditions.push({ price: priceCondition });
  }
  // Filter by star rating
  if (starRating) {
    orConditions.push({ rating:  { $gte:  Number(starRating)+0.1 ,$lte:Number(starRating)+0.5 } });
  }
  console.log(orConditions);
  
  // Filter by guest rating
  if (guestRating) {
    orConditions.push({ reviewCount: { $gte: Number(guestRating) } });
  }
  // Filter by property type
  if (propertyType) {
    orConditions.push({ type: propertyType.toLowerCase() });
  }
  // Filter by amenities (if any are provided)
  if (amenities && amenities.length > 0) {
    orConditions.push({ amenities: { $all: amenities } }); // All specified amenities must be present
  }
  // Filter by facilities (if any are provided)
  if (facilities && facilities.length > 0) {
    orConditions.push({ facilities: { $all: facilities } }); // All specified facilities must be present
  }
  // Combine all OR conditions into the query
  if (orConditions.length > 1) {
    query.$or = orConditions;
  }
  // Fetch filtered hotels
  console.log('sd',query);
  
  const hotels = await Hotel.find(query);
  // Return the filtered hotels
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
