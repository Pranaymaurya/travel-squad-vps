import tourBooking from "../models/tourBookingModel.js";
import Tour from "../models/tourModel.js";

export const Create = async (req, res) => {
    try {
        const { tourId, bookingDate, taxRate = 10 } = req.body; // default tax rate if not provided
        const userId = req.user._id;

        const tourData = await Tour.findById(tourId);
        if (!tourData) {
            return res.status(404).json({ success: false, message: "Tour Not Found" });
        }

        const booking = await tourBooking.create({
            tour: tourId,
            user: userId,
            amount: tourData.price,
            taxRate,
            bookingDate
        });

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const GetBookingById=async(req,res)=>{
    try {
        const {id}=req.params;
        const booking=await tourBooking.findOne({_id:id,})
        .populate('tour')
        .populate('user','-password');
        res.json(booking);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const GetAllBookingByuser=async(req,res)=>{
    try {
        if(req.user.role==='admin'){
            const userId=req.query.user;
            if(!userId) return res.status(404).json({message:"User Id is required"});
            const booking=await tourBooking.find({user:userId})
            .populate('tour')
            .populate('user','-password');
            return res.json(booking);
        }
        const booking=await tourBooking.find({user:req.user._id})
        .populate('tour')
        .populate('user','-password');
        res.json(booking);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const GetAllTourBooking=async(req,res)=>{
    try {
        const booking=await tourBooking.find({})
        .populate('tour')
        .populate('user','-password');
        res.json(booking);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


export const UpdateStatus=async(req,res)=>{
    try {
        const {id}=req.params;
        const {status}=req.body;
        if(!status) return res.status(404).json({success:false,message:"Status is required"});
        const isUpdated=await tourBooking.findByIdAndUpdate(id,{status},{new:true});
        res.json(isUpdated);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const Update=async(req,res)=>{
    try {
        const {id}=req.params;
        const {bookingDate}=req.body;
        if(!bookingDate) return res.status(404).json({success:false,message:"All fields are required"});
        const isUpdated=await tourBooking.findByIdAndUpdate(id,req.body,{new:true});
        res.json(isUpdated);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}