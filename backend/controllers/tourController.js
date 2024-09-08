import asyncHandler from "../middleware/asyncHandler.js";
import TourCategory from "../models/tourCategoryModel.js";
import Tour from "../models/tourModel.js";

//@desc    Fetch all tours
//@route   GET /api/tours
//@access   Public
const getTours = asyncHandler(async (req, res) => {
  const tours = await Tour.find({});
  res.json(tours);
});

//@desc    Fetch a tour
//@route   GET /api/tour/:id
//@access   Public
const getTourById = asyncHandler(async (req, res) => {
  const tour = await Tour.findById(req.params.id);

  if (tour) {
    return res.json(tour);
  } else {
    res.status(404);
    throw new Error("tour not found");
  }
});

// @desc    Delete a blog
// @route   DELETE /api/blog/:id
// @access  Private/Admin
const deleteTour = asyncHandler(async (req, res) => {
  const tour = await Tour.findById(req.params.id);

  if (tour) {
    await Tour.deleteOne({ _id: tour._id });
    res.json({ message: "Tour removed" });
  } else {
    res.status(404);
    throw new Error("Tour not found");
  }
});

//@desc    Fetch all tours
//@route   GET /api/tours
//@access   Public
const getCategory = asyncHandler(async (req, res) => {
  const category = await TourCategory.find({});
  res.json(category);
});

//@desc    Fetch a tour
//@route   GET /api/tour/:id
//@access   Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await TourCategory.findById(req.params.id);

  if (category) {
    return res.json(category);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc    Delete a blog
// @route   DELETE /api/blog/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await TourCategory.findById(req.params.id);

  if (category) {
    // Find and delete all tours associated with the category
    const deletedTours = await Tour.deleteOne({ category: category.category });

    // Delete the category
    await TourCategory.deleteOne({ _id: category._id });

    res.json({ message: "Category and associated packages removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// const addCategory = asyncHandler(async (req, res) => {
//   const { category, description } = req.body;

//   if (!category || !description) {
//     res.status(400);
//     throw new Error('All fields are required');
//   }

//   const findCategory = await TourCategory.findOne({category});

//   if(findCategory){
//     res.status(400);
//     throw new Error('Already have that same category');
//   }

//   const newCategory = await TourCategory.create({
//     category,
//     description,
//   });

//   if (newCategory) {
//     // Create a new package associated with the new category
//     const newPackage = {
//       category,
//       types: [],
//       description
//     };

//     const newTour = await Tour.create(newPackage);

//     if (newTour) {
//       res.status(201).json(newCategory);
//     } else {
//       // If package creation fails, rollback category creation
//       await TourCategory.deleteOne({ _id: newCategory._id });
//       res.status(400);
//       throw new Error('Failed to create package for the new category');
//     }
//   }
//   else {
//     res.status(400);
//     throw new Error('Invalid category data');
//   }
// });
const addCategory = asyncHandler(async (req, res) => {
  const { category, description } = req.body;

  // Check for missing fields
  if (!category || !description) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Check if the category already exists
  const existingCategory = await TourCategory.findOne({ category });
  if (existingCategory) {
    res.status(400);
    throw new Error("Category already exists");
  }

  // Create new category
  const newCategory = await TourCategory.create({ category, description });
  if (!newCategory) {
    res.status(400);
    throw new Error("Invalid category data");
  }

  // Create a new package associated with the new category
  const newPackage = { category, types: [], description };
  const newTour = await Tour.create(newPackage);

  if (!newTour) {
    // If package creation fails, rollback category creation
    await TourCategory.deleteOne({ _id: newCategory._id });
    res.status(400);
    throw new Error("Failed to create package for the new category");
  }

  // Successful creation
  res.status(201).json(newCategory);
});

const updateCategory = asyncHandler(async (req, res) => {
  const { category, description } = req.body;

  // console.log('Request body:', req.body); // Add this line to log the request body

  const found = await TourCategory.findById(req.params.id);
  const oldCategory = found.category;
  // console.log(found)

  if (!found) {
    res.status(404);
    throw new Error("Category not found");
  }

  found.category = category;
  found.description = description;

  try {
    const updatedCategory = await found.save();

    const updatedTours = await Tour.updateOne(
      { category: oldCategory },
      { $set: { category: category, description: description } }
    );

    res.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error); // Add this line to log the error
    res.status(500);
    throw new Error("Server error");
  }
});

// const updatetour = asyncHandler(async (req, res) => {
//   const { id } = req.params; // The package id
//   const {image, name, description, price, rating, reviews, location, days, nights, title, inclusions, tourPlan } = req.body;

//   console.log('Request body:', req.body); // Log the request body

//   try {
//     // Find the Tour document containing the package with the specified _id
//     const tour = await Tour.findOne({ 'types._id': id });

//     if (!tour) {
//       res.status(404).json({ message: 'Tour not found' });
//       return;
//     }

//     // Find the specific package within the found Tour document
//     const tour = tour.types.id(id);

//     if (!tour) {
//       res.status(404).json({ message: 'Package not found' });
//       return;
//     }

//     const formattedImagePath = image.replace(/\\/g, '/');

//     // Update tour properties
//     tour.name = name;
//     tour.description = description;
//     tour.image = formattedImagePath;
//     tour.price = price;
//     tour.rating = rating;
//     tour.reviews = reviews;
//     tour.location = location;
//     tour.days = days;
//     tour.nights = nights;
//     tour.title = title;
//     tour.inclusions = inclusions;
//     tour.tourPlan = tourPlan;

//     // Save the updated Tour document
//     await tour.save();

//     res.json(tour);
//   } catch (error) {
//     console.error('Error updating package:', error); // Log the error
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// const createPackage = asyncHandler(async (req, res) => {

//   const {
//     category,
//     types
//   } = req.body;

//   // Validate the request body
//   if (!category || !types || !types[0]) {
//     res.status(400);
//     throw new Error('All fields are required');
//   }

//   const {
//     name,
//     description,
//     image,
//     price,
//     rating,
//     reviews,
//     location,
//     days,
//     nights,
//     title,
//     inclusions,
//     tourPlan
//   } = types[0];

//   if (!name || !description || !image || !price || !rating || !reviews || !location || !days || !nights || !title || !inclusions || !tourPlan) {
//     res.status(400);
//     throw new Error('All fields are required for the tour type');
//   }

//   // Assuming imagePath is handled properly (e.g., file upload logic elsewhere)

//   const formattedImagePath = image.replace(/\\/g, '/');

//   // Create the new type object
//   const newType = {
//     name,
//     description,
//     image: formattedImagePath,
//     price: parseFloat(price),
//     rating: parseFloat(rating),
//     reviews: parseInt(reviews, 10),
//     location,
//     days: parseInt(days, 10),
//     nights: parseInt(nights, 10),
//     title,
//     inclusions,
//     tourPlan: tourPlan.map(plan => ({
//       day: plan.day,
//       name: plan.name,
//       description: plan.description
//     }))
//   };

//   // Find the tour by category and update it
//   const tour = await Tour.findOne({category });
//   console.log(tour)

//   if (tour) {
//     tour.types.push(newType);
//     const updatedTour = await tour.save();
//     res.status(201).json("Created new package");
//   } else {
//     res.status(404);
//     throw new Error('Tour not found');
//   }
// });

const updatefoundPackage = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    description,
    image,
    price,
    rating,
    reviews,
    location,
    duration,
    photos,
    inclusions,
    tourPlan,
    availableFrom,
    availableTill,
    featured,
  } = req.body;

  try {
    // Find the Tour document containing the package with the specified _id
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      res.status(404).json({ message: "Tour not found" });
      return;
    }

    const formattedImagePath = image.replace(/\\/g, "/");

    // Update tour properties
    tour.name = name;
    tour.type = type; 
    tour.description = description;
    tour.image = formattedImagePath;
    tour.price = price;
    tour.rating = rating;
    tour.reviews = reviews;
    tour.location = location;
    tour.duration = duration;
    tour.photos = photos;
    tour.inclusions = inclusions;
    tour.tourPlan = tourPlan;
    tour.availableFrom = availableFrom;
    tour.availableTill = availableTill;
    tour.featured = featured;

    // Save the updated Tour document
    const updatedTour = await tour.save();
    res.json(updatedTour);
  } catch (error) {
    console.error("Error updating package:", error); // Log the error
    res.status(500).json({ message: "Server error", error });
  }
});

const createPackage = asyncHandler(async (req, res) => {
  // const { category, types } = req.body;

  // // Validate the request body
  // if (!category || !types || !types[0]) {
  //   res.status(400);
  //   throw new Error("All fields are required");
  // }

  // const {
  //   name,
  //   description,
  //   image,
  //   price,
  //   rating,
  //   reviews,
  //   location,
  //   days,
  //   nights,
  //   title,
  //   inclusions,
  //   tourPlan,
  //   availableFrom,
  //   availableTill,
  // } = types[0];

  // if (
  //   !name ||
  //   !description ||
  //   !image ||
  //   !price ||
  //   !rating ||
  //   !reviews ||
  //   !location ||
  //   !days ||
  //   !nights ||
  //   !title ||
  //   !inclusions ||
  //   !tourPlan ||
  //   !availableFrom ||
  //   !availableTill
  // ) {
  //   res.status(400);
  //   throw new Error("All fields are required for the tour type");
  // }

  // // Assuming imagePath is handled properly (e.g., file upload logic elsewhere)
  // const formattedImagePath = image.replace(/\\/g, "/");

  // // Create the new type object
  // const newType = {
  //   name,
  //   description,
  //   image: formattedImagePath,
  //   price: parseFloat(price),
  //   rating: parseFloat(rating),
  //   reviews: parseInt(reviews, 10),
  //   location,
  //   days: parseInt(days, 10),
  //   nights: parseInt(nights, 10),
  //   title,
  //   inclusions,
  //   tourPlan: tourPlan.map((plan) => ({
  //     day: plan.day,
  //     name: plan.name,
  //     description: plan.description,
  //   })),
  //   availableFrom,
  //   availableTill,
  // };

  // // Find the tour by category and update it
  // const tour = await Tour.findOne({ category });
  // // console.log(tour);

  // if (tour) {
  //   tour.types.push(newType);
  //   const updatedTour = await tour.save();
  //   res.status(201).json("Created new package");
  // } else {
  //   res.status(404);
  //   throw new Error("Tour not found");
  // }
  const {
    name,
    type,
    description,
    image,
    price,
    rating,
    reviews,
    location,
    duration,
    photos,
    inclusions,
    tourPlan,
    availableFrom,
    availableTill,
    featured,
  } = req.body;

  if (
    !name ||
    !type ||
    !description ||
    !image ||
    !price ||
    !rating ||
    !reviews ||
    !location ||
    !duration ||
    !photos ||
    !inclusions ||
    !tourPlan ||
    !availableFrom ||
    !availableTill 

  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const formattedImagePath = image.replace(/\\/g, "/");

  const tour = await Tour.create({
    name,
    type,
    description,
    image: formattedImagePath,
    price,
    rating,
    reviews,
    location,
    duration,
    photos,
    inclusions,
    tourPlan,
    availableFrom,
    availableTill,
    featured,
  });

  if (tour) {
    res.status(201).json(tour);
  } else {
    res.status(400);
    throw new Error("Invalid tour data");
  }
});

export {
  getTours,
  getTourById,
  deleteTour,
  getCategory,
  getCategoryById,
  deleteCategory,
  addCategory,
  updateCategory,
  createPackage,
  updatefoundPackage,
};
