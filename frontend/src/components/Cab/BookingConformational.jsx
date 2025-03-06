import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const BookingConfirmationModal = ({ 
  isOpen, 
  onClose, 
  bookingDetails 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="text-green-500 w-16 h-16" />
          </div>
          <DialogTitle className="text-2xl text-center">
            Booking Confirmed!
          </DialogTitle>
          <DialogDescription className="text-center">
            Your cab booking is now confirmed.
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-gray-100 rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Booking ID:</span>
            <span>{bookingDetails.bookingId || 'XXXX-XXXX'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Cab Model:</span>
            <span>{bookingDetails.cabModel || 'Sedan'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Pickup Location:</span>
            <span>{bookingDetails.pickupLocation || 'TBD'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Pickup Time:</span>
            <span>{bookingDetails.pickupTime || 'TBD'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Amount:</span>
            <span>₹ {bookingDetails.totalAmount || '0'}</span>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-4">
          A confirmation email has been sent to your registered email address.
        </div>

        <div className="flex justify-center space-x-4 mt-4">
          <Button 
            variant="outline" 
            onClick={() => window.print()}
            className="w-full"
          >
            Print Booking
          </Button>
          <Button 
            onClick={onClose} 
            className="w-full bg-sky-950 hover:bg-sky-700"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingConfirmationModal;