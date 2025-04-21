import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    taxRate: {
        type: Number, // e.g., 10 for 10%
        required: true,
        default: 0
    },
    totalAmount: {
        type: Number,
        
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

// Auto-calculate totalAmount using percentage-based tax
bookingSchema.pre('save', function (next) {
    this.totalAmount = this.amount + (this.amount * this.taxRate / 100);
    next();
});

const tourBooking = mongoose.model('tourbooking', bookingSchema);
export default tourBooking;
