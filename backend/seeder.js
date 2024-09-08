import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import blogs from "./data/blogs.js";
import User from "./models/userModel.js";
import Blog from "./models/blogModel.js";
import connectDB from "./config/db.js";
import Tour from "./models/tourModel.js";
import tours from "./data/tour.js";
import TourCategory from "./models/tourCategoryModel.js";
import tourCategoryData from "./data/tourCategory.js";
import hotels from "./data/hotels.js";
import Hotel from "./models/hotelModel.js";
import Cab from "./models/cabModel.js";
import cabs from "./data/cabs.js";
import offersData from "./data/offers.js"
import Offer from "./models/offerModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Blog.deleteMany();
    await User.deleteMany();
    await Tour.deleteMany();
    await TourCategory.deleteMany();
    await Hotel.deleteMany();
    await Cab.deleteMany();
    await Offer.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleBlogs = blogs.map((blog) => {
      return { ...blog };
    });

    const sampleTours = tours.map((tour) => {
      return { ...tour };
    });

    const sampleTourCategory = tourCategoryData.map((category) => {
      return { ...category };
    });

    const sampleHotels = hotels.map((hotel) => {
      return { ...hotel };
    });

    const sampleCabs = cabs.map((cab) => {
      return { ...cab };
    });

   

       // Import Blogs
       await Blog.insertMany(blogs);

       // Import Tours
       const createdTours = await Tour.insertMany(tours);
   
       // Import Tour Categories
       await TourCategory.insertMany(tourCategoryData);
   
       // Import Hotels
       const createdHotels = await Hotel.insertMany(hotels);
   
       // Import Cabs
       const createdCabs = await Cab.insertMany(cabs);

    
    // Function to get the related ID based on type and name
    const getRelatedId = (relatedTo) => {
      switch (relatedTo) {
        case "Cab":
          return createdCabs.find((cab) => cab.model === "Swift, Baleno")?._id;
        case "Hotel":
          return createdHotels.find((hotel) => hotel.name === "Goa Marriott Resort & Spa")?._id;
        case "Tour":
          return createdTours.find((tour) => tour.name === "Haridwar")?._id;
          default:
            console.warn(`Unknown relatedTo type: ${relatedTo}`);
          return null;
      }
    };

    const offers = offersData.map((offer) => {
      const relatedId = getRelatedId(offer.relatedTo);
      if (!relatedId) {
        console.error(`Failed to find relatedId for offer: ${offer.title}`);
      }
      return {
        ...offer,
        relatedId,
      };
    });

    await Offer.insertMany(offers);


    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Blog.deleteMany();
    await User.deleteMany();
    await Tour.deleteMany();
    await TourCategory.deleteMany();
    await Hotel.deleteMany();
    await Cab.deleteMany();
    await Offer.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
