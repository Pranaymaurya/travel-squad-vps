"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useLocation } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Calendar, Users, Info, CreditCard, Gift, Shield, AlertTriangle, CheckCircle } from "lucide-react"
import { format, addDays, differenceInDays } from "date-fns" // For date manipulation

// Date picker component - Add this import
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

// Pre-booking confirmation dialog component
const PreBookingConfirmationDialog = ({ isOpen, onClose, onConfirm, bookingDetails }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <AlertTriangle className="text-yellow-500 w-16 h-16" />
          </div>
          <DialogTitle className="text-2xl text-center">Confirm Your Booking</DialogTitle>
          <DialogDescription className="text-center">Please review the details before proceeding</DialogDescription>
        </DialogHeader>

        <div className="bg-gray-100 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Hotel:</span>
            <span>{bookingDetails.hotelName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Room Count:</span>
            <span>{bookingDetails.roomCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Check-in:</span>
            <span>{bookingDetails.checkInDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Check-out:</span>
            <span>{bookingDetails.checkOutDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Amount:</span>
            <span className="font-bold">₹ {bookingDetails.ammount}</span>
          </div>
        </div>

        <DialogFooter className="flex space-x-4 mt-4">
          <Button variant="outline" onClick={onClose} className="w-full">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="w-full bg-sky-950 hover:bg-sky-700">
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Booking confirmation modal component
const BookingConfirmationModal = ({ isOpen, onClose, bookingDetails }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="text-green-500 w-16 h-16" />
          </div>
          <DialogTitle className="text-2xl text-center">Booking Successful</DialogTitle>
        </DialogHeader>

        <div className="bg-gray-100 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Booking ID:</span>
            <span>{bookingDetails._id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Hotel:</span>
            <span>{bookingDetails.hotelName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Rooms:</span>
            <span>{bookingDetails.roomCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Amount:</span>
            <span className="font-bold">₹ {bookingDetails.ammount}</span>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={onClose} className="w-full bg-sky-950 hover:bg-sky-700">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Date Picker Component
const DatePickerWithRange = ({ checkInDate, checkOutDate, onDateChange }) => {
  const [startDate, setStartDate] = useState(new Date(checkInDate))
  const [endDate, setEndDate] = useState(new Date(checkOutDate))
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date)
      setEndDate(null)
    } else if (date >= startDate) {
      setEndDate(date)
      setIsOpen(false)
      
      // Call the parent's callback with the new dates
      onDateChange(
        format(startDate, "yyyy-MM-dd"),
        format(date, "yyyy-MM-dd")
      )
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal border-dashed h-12"
        >
          <Calendar className="mr-2 h-4 w-4" />
          {startDate && endDate ? (
            <>
              {format(startDate, "MMM dd, yyyy")} - {format(endDate, "MMM dd, yyyy")}
              <span className="ml-auto text-xs text-muted-foreground">
                {differenceInDays(endDate, startDate)} night{differenceInDays(endDate, startDate) !== 1 ? "s" : ""}
              </span>
            </>
          ) : (
            <span>Select check-in and check-out dates</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <CalendarComponent
          mode="range"
          selected={{
            from: startDate,
            to: endDate
          }}
          onSelect={(range) => {
            if (range?.from) {
              setStartDate(range.from)
            }
            if (range?.to) {
              setEndDate(range.to)
              setIsOpen(false)
              
              // Call the parent's callback with the new dates
              onDateChange(
                format(range.from, "yyyy-MM-dd"),
                format(range.to, "yyyy-MM-dd")
              )
            }
          }}
          defaultMonth={startDate}
          disabled={{ before: new Date() }}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}

// Main BookingPage component
const BookingPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [roomCount, setRoomCount] = useState(1)
  const [isPreBookingDialogOpen, setIsPreBookingDialogOpen] = useState(false)
  const [isBookingConfirmationOpen, setIsBookingConfirmationOpen] = useState(false)
  const [bookingDetails, setBookingDetails] = useState({})
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    mobile: "",
    gstNumber: "",
    state: ""
  })
  const [hotelData, setHotelData] = useState({
    name: "Luxury Hotel & Resort",
    location: "City Center, Metro Area",
    category: "5-Star Hotel",
    images: [],
    price: 12500,
    taxes: 2500,
    inclusions: [],
    hotelDetails: {},
    rating: 4.8,
  })

  const locationHook = useLocation()
  const initialFilters = locationHook.state || {
    checkInDate: format(new Date(), "yyyy-MM-dd"),
    checkOutDate: format(addDays(new Date(), 2), "yyyy-MM-dd"),
    guests: "2",
  }
  const [filters, setFilters] = useState(initialFilters)
  const p = useParams()

  // Calculate nights based on check-in and check-out dates
  const nights = differenceInDays(new Date(filters.checkOutDate), new Date(filters.checkInDate))

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/hotel/${p.id}`, { withCredentials: true })
        setHotelData(data)
      } catch (error) {
        console.error("Error fetching hotel data:", error)
      }
    }

    if (p.id) {
      fetchHotelData()
    }
  }, [p.id])

  const handleDateChange = (newCheckIn, newCheckOut) => {
    setFilters(prev => ({
      ...prev,
      checkInDate: newCheckIn,
      checkOutDate: newCheckOut
    }))
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setUserInfo(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleStateChange = (value) => {
    setUserInfo(prev => ({
      ...prev,
      state: value
    }))
  }

  const handleBookingSubmit = async () => {
    try {
      // Calculate total amount
      const totalAmount = roomCount * (hotelData.price + hotelData.taxes) * nights
      
      // Prepare booking data matching backend requirements exactly
      const bookingData = {
        hotel: hotelData._id, // Assuming hotelData contains the hotel ID
        roomCount: roomCount,
        ammount: totalAmount, // Note: Matching the backend spelling
        checkInDate: new Date(filters.checkInDate).toISOString(),
        checkOutDate: new Date(filters.checkOutDate).toISOString(),
        // User info will be handled by the backend using the authenticated user
      }

      // Send booking request
      const response = await axios.post(`${backendUrl}/api/booking/create`, bookingData, { withCredentials: true })

      // Close pre-booking dialog
      setIsPreBookingDialogOpen(false)

      // Prepare booking confirmation details
      const confirmationDetails = {
        ...response.data.message, // Backend returns the booking object
        hotelName: hotelData.name,
      }

      // Open booking confirmation modal
      setBookingDetails(confirmationDetails)
      setIsBookingConfirmationOpen(true)
    } catch (error) {
      console.error("Booking error:", error)
      // Handle error (show error message, etc.)
    }
  }

  const openPreBookingConfirmation = () => {
    // Calculate total amount
    const totalAmount = roomCount * (hotelData.price + hotelData.taxes) * nights
    
    // Prepare pre-booking details
    const preBookingDetails = {
      hotelName: hotelData.name,
      roomCount: roomCount,
      checkInDate: format(new Date(filters.checkInDate), "EEE, MMM dd, yyyy"),
      checkOutDate: format(new Date(filters.checkOutDate), "EEE, MMM dd, yyyy"),
      ammount: totalAmount, // Note: Matching the backend spelling 'ammount'
    }

    setBookingDetails(preBookingDetails)
    setIsPreBookingDialogOpen(true)
  }

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Review Your Booking</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Hotel and Guest Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hotel Information Card */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{hotelData.name}</CardTitle>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{hotelData.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-primary/10 text-primary mb-1">
                    {hotelData.category}
                  </Badge>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                    <span className="font-medium">{hotelData.rating}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Date Selection */}
              <div className="mb-4">
                <Label className="text-base font-medium mb-2 block">Select Dates</Label>
                <DatePickerWithRange 
                  checkInDate={filters.checkInDate} 
                  checkOutDate={filters.checkOutDate} 
                  onDateChange={handleDateChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">Check-in:</span>
                    <span className="ml-2">{format(new Date(filters.checkInDate), "EEE, MMM dd, yyyy")}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">Check-out:</span>
                    <span className="ml-2">{format(new Date(filters.checkOutDate), "EEE, MMM dd, yyyy")}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    <span>
                      {nights} Night{nights > 1 ? "s" : ""} | 2 Adults | {roomCount} Room{roomCount > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">Guest room, 2 Queen, Garden view</p>
                  <p>Room Only</p>
                  <p>No meals included</p>
                  <p>15% discount on Spa, Food and Beverages</p>
                  <p className="text-destructive font-medium">Non-Refundable</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upgrade Options */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Upgrade Your Stay</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="none" className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none" className="flex-1">
                    No meal plan (included)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="breakfast" id="breakfast" />
                  <Label htmlFor="breakfast" className="flex-1">
                    Add Breakfast
                  </Label>
                  <span className="text-muted-foreground">₹ 2,950</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="half-board" id="half-board" />
                  <Label htmlFor="half-board" className="flex-1">
                    Add Breakfast + Lunch/Dinner
                  </Label>
                  <span className="text-muted-foreground">₹ 8,496</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full-board" id="full-board" />
                  <Label htmlFor="full-board" className="flex-1">
                    Add All Meals
                  </Label>
                  <span className="text-muted-foreground">₹ 14,160</span>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Info className="h-4 w-4 mr-2 text-amber-500" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Third Adult/Child charges are not a part of this rate. These charges are payable at the hotel directly.
                Additional charges may apply for extra amenities or services.
              </p>
            </CardContent>
          </Card>

          {/* Guest Details */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Guest Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    placeholder="Enter your full name"
                    value={userInfo.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com"
                    value={userInfo.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input 
                    id="mobile" 
                    placeholder="+91 9876543210"
                    value={userInfo.mobile}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gstNumber">GST Details (Optional)</Label>
                  <Input 
                    id="gstNumber" 
                    placeholder="GST Number"
                    value={userInfo.gstNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* State Selection */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your State</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select onValueChange={handleStateChange} value={userInfo.state}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, "-")}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center space-x-2">
                  <Checkbox id="save-billing" />
                  <Label htmlFor="save-billing" className="text-sm">
                    Confirm and save billing details to your profile
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trip Secure */}
          <Card className="border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Shield className="h-4 w-4 mr-2 text-primary" />
                Trip Secure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1 text-sm">
                  <p>• 24*7 emergency medical assistance</p>
                  <p>• Up to ₹2,500 for loss of tablets and laptops</p>
                  <p>• Coverage for trip cancellations and delays</p>
                </div>
                <Button variant="outline" className="whitespace-nowrap">
                  Add for ₹ 158
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Payment Summary */}
        <div className="space-y-6">
          {/* Price Breakdown */}
          <Card className="sticky top-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-primary" />
                Price Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      {roomCount} Room{roomCount > 1 ? "s" : ""} x {nights} Night{nights > 1 ? "s" : ""}
                    </span>
                    <span>₹ {(roomCount * hotelData.price * nights).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Hotel Taxes</span>
                    <span>₹ {(roomCount * hotelData.taxes * nights).toLocaleString()}</span>
                  </div>

                  <div className="flex items-start space-x-2 text-sm">
                    <Checkbox id="donation" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="donation" className="text-sm font-normal">
                        Donate ₹ 35 to build resilient travel destinations
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        <a href="#" className="text-primary underline-offset-4 hover:underline">
                          View T&Cs
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-medium">
                  <span>Total Amount</span>
                  <span>₹ {(roomCount * (hotelData.price + hotelData.taxes) * nights).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coupon Code */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Gift className="h-4 w-4 mr-2 text-primary" />
                Coupon Codes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">No coupon codes applicable for this property.</p>
                <p className="text-sm text-muted-foreground">Gift Cards can be applied at payment step.</p>
                <div className="flex space-x-2">
                  <Input placeholder="Have a Coupon Code?" className="flex-1" />
                  <Button variant="secondary">Apply</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why Sign Up */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Why Sign Up or Login</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                  Get access to Secret Deals
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                  Book Faster - we'll save & pre-enter your details
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                  Manage your bookings from one place
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Room Count Selection */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Number of Rooms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span>Select rooms to book</span>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="icon" onClick={() => setRoomCount(Math.max(1, roomCount - 1))}>
                    -
                  </Button>
                  <span className="w-8 text-center">{roomCount}</span>
                  <Button variant="outline" size="icon" onClick={() => setRoomCount(roomCount + 1)}>
                    +
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pay Now Button */}
          <Button size="lg" className="w-full text-lg py-6" onClick={openPreBookingConfirmation}>
            Pay Now (₹ {(roomCount * (hotelData.price + hotelData.taxes) * nights).toLocaleString()})
          </Button>
        </div>
      </div>

      {/* Pre-Booking Confirmation Dialog */}
      <PreBookingConfirmationDialog
        isOpen={isPreBookingDialogOpen}
        onClose={() => setIsPreBookingDialogOpen(false)}
        onConfirm={handleBookingSubmit}
        bookingDetails={bookingDetails}
      />

      {/* Booking Confirmation Modal */}
      <BookingConfirmationModal
        isOpen={isBookingConfirmationOpen}
        onClose={() => setIsBookingConfirmationOpen(false)}
        bookingDetails={bookingDetails}
      />
    </div>
  )
}

export default BookingPage