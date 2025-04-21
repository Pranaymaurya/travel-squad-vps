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
    roomCount: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    taxRate: {
        type: Number, // Percentage (e.g., 10 for 10%)
        required: true,
        default: 0
    },
    totalAmount: {
        type: Number,
        
    },
    checkInDate: {
        type: Date,
    },
    checkOutDate: {
        type: Date,
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
}, { timestamps: true });

// Auto-calculate totalAmount before saving
bookingSchema.pre('save', function (next) {
    this.totalAmount = this.amount + (this.amount * this.taxRate / 100);
    next();
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
