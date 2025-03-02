import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    roomCount:{
        type:Number,
        required:true
    },
    ammount: {
        type: Number,
        required: true
    },
    bookingDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    }
},{timestamps: true});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;