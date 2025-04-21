import CabBooking from "../models/cabBookingModel.js";
import Cab from "../models/cabModel.js";
import User from "../models/userModel.js";



export async function Create(req, res) {
  try {
    const { cab, pickupLocation, dropoffLocation, pickupTime, dropoffTime } = req.body;
    const user = req.user._id;

    // Validate required fields
    if (!cab || !pickupLocation || !dropoffLocation || !pickupTime) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    // Find Cab and User
    const foundCab = await Cab.findById(cab);
    const foundUser = await User.findById(user);
    if (!foundCab || !foundUser) {
      return res.status(404).json({ message: 'Cab or User not found.' });
    }

    // Get amount and taxRate from Cab model
    const baseAmount = foundCab.discountedPrice || 500; // fallback if no price field
    const taxRate = foundCab.taxRate || 10;

    // Create booking without totalAmount (it will be auto-computed)
    const newBooking = new CabBooking({
      cab,
      user,
      pickupLocation,
      dropoffLocation,
      pickupTime,
      dropoffTime,
      amount: baseAmount,
      taxRate,
    });

    // Save the booking
    const savedBooking = await newBooking.save();
    return res.status(201).json(savedBooking);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while creating the booking.' });
  }
}


export async function Update(req,res){
    try {
        const { id } = req.params; 
        const updates = req.body;
        if (updates.totalAmount === undefined) {
            return res.status(400).json({ message: 'Total amount is required.' });
        }
        const updatedBooking = await CabBooking.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }
        return res.status(200).json(updatedBooking);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while updating the booking.' });
    }
}

export async function UpdateStatus(req,res){
    try {
        const { id } = req.params; 
        const { status } = req.body; 
        // Validate the status
        const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value.' });
        }
        const updatedBooking = await CabBooking.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }
        return res.status(200).json(updatedBooking);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while updating the booking status.' });
    }
}

export async function GetCabBookingById(req,res){
    try {
        const {id}=req.params
        const getCabBooking=await CabBooking.findById(id)
        if(!getCabBooking) return res.status(400).json({message:"Not Found"})
        return res.status(200).json(getCabBooking)
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while updating the booking status.' });
    }
}

export async function GetAllCabBookingByUser(req,res){
    try {
        const id = req.params.id;
        const getAllCabBooking=await CabBooking.find({user:id})
        console.log(getAllCabBooking)
        res.status(200).json(getAllCabBooking);
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while getting the booking status.' });
    }
}

export async function GetAllCabBookingByCab(req,res){
    try {
        const { id } = req.params; 
        if(req.user.role==='admin'){
            const getAllCabBookings=await CabBooking.find({cab:id})
            return  res.status(200).json(getAllCabBookings);
        }
       
        const getAllCabBookings = await CabBooking.find({ cab: id })
            .populate('cab') 
            .populate({
                path: 'user', 
                match: { _id: req.user._id }, 
                select: 'name email' 
            });
        res.status(200).json(getAllCabBookings);
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: 'An error occurred while getting the booking status.' });
    }
}

export async function GetAllCabBookings(req,res){
    try {
        const getAll=await CabBooking.find()
        res.status(200).json(getAll)
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while getting the booking status.' });
    }
}
export async function GetCabBookingsByCabId(req, res) {
    try {
        const id = req.params.id; // assuming cabId is passed as a URL parameter

        // Fetch bookings that match the cabId
        const getBooking = await CabBooking.find({ cab: id });

        // If no bookings are found, return a specific message
        if (getBooking.length === 0) {
            return res.status(404).json({ success: false, message: "No bookings found for this cab" });
        }

        res.status(200).json(getBooking);
    } catch (error) {
        console.error(error);  // Log the error for debugging
        return res.status(500).json({ message: 'An error occurred while getting the booking status.' });
    }
}
