import CabBooking from "../models/cabBookingModel.js";
import Cab from "../models/cabModel.js";
import User from "../models/userModel.js";

export async function Create(req,res){
try {
    const { cab, pickupLocation, dropoffLocation, pickupTime, dropoffTime, totalAmount } = req.body;
    const user=req.user._id
        // Validate required fields
        if (!cab ||  !pickupLocation || !dropoffLocation || !pickupTime || !totalAmount) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }
        const foundCab = await Cab.findById(cab);
        const foundUser = await User.findById(user);
        if (!foundCab || !foundUser) {
            return res.status(404).json({ message: 'Cab or User not found.' });
        }
        // Create new booking
        const newBooking = new CabBooking({
            cab,
            user,
            pickupLocation,
            dropoffLocation,
            pickupTime,
            dropoffTime,
            totalAmount,
        });
        // Save the booking to the database
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
        const validStatuses = ["pending", "confirmed", "completed", "canceled"];
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
        const getAllCabBooking=await CabBooking.find({user:req.user._id})
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