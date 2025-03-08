import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const PreBookingConfirmationDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  bookingDetails 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <AlertTriangle className="text-yellow-500 w-16 h-16" />
          </div>
          <DialogTitle className="text-2xl text-center">
            Confirm Your Booking
          </DialogTitle>
          <DialogDescription className="text-center">
            Please review the details before proceeding
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-gray-100 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Cab Model:</span>
            <span>{bookingDetails.cabModel || 'Sedan'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Pickup Location:</span>
            <span>{bookingDetails.pickupLocation || 'Not Specified'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Drop-off Location:</span>
            <span>{bookingDetails.dropoffLocation || 'Not Specified'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Pickup Time:</span>
            <span>{bookingDetails.pickupTime || 'Not Specified'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Amount:</span>
            <span className="font-bold">₹ {bookingDetails.totalAmount || '0'}</span>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 mt-4">
          Are you sure you want to proceed with this booking?
        </div>

        <DialogFooter className="flex space-x-4 mt-4">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full"
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm} 
            className="w-full bg-sky-950 hover:bg-sky-700"
          >
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreBookingConfirmationDialog;