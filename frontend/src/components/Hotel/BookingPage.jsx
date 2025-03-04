"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Calendar, Users, Info, CreditCard, Gift, Shield } from "lucide-react"

const BookingPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const locationHook = useLocation()
  const initialFilters = locationHook.state || {
    checkin: "",
    checkout: "",
    guests: "",
  }

  const [filters, setFilters] = useState(initialFilters)
  const [hotelData, setHotelData] = useState({})
  const p = useParams()

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/hotel/${p.id}`, { withCredentials: true })
        setHotelData(data)
      } catch (error) {
        console.error("Error fetching hotel data:", error)
      }
    }
    fetchHotelData()
  }, [p.id])

  const {
    name = "Luxury Hotel & Resort",
    location = "City Center, Metro Area",
    distance,
    hotelPriceHighlight,
    category = "5-Star Hotel",
    images = [],
    price = 12500,
    taxes = 2500,
    inclusions = [],
    hotelDetails = {},
    foodAndDining,
    locationAndSurroundings,
    roomDetailsAndAmenities,
    activitiesAndNearbyAttractions,
    rating = 4.8,
  } = hotelData

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
                  <CardTitle className="text-2xl">{name}</CardTitle>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-primary/10 text-primary mb-1">
                    {category}
                  </Badge>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                    <span className="font-medium">{rating}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">Check-in:</span>
                    <span className="ml-2">{filters.checkin || "2023-06-15"}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">Check-out:</span>
                    <span className="ml-2">{filters.checkout || "2023-06-17"}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    <span>2 Nights | 2 Adults | 1 Room</span>
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
                  <Input id="fullName" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input id="mobile" placeholder="+91 9876543210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gst">GST Details (Optional)</Label>
                  <Input id="gst" placeholder="GST Number" />
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
                <Select>
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
                    <span>1 Room x 2 Nights</span>
                    <span>₹ {price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Hotel Taxes</span>
                    <span>₹ {taxes.toLocaleString()}</span>
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
                  <span>₹ {(price + taxes).toLocaleString()}</span>
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

          {/* Pay Now Button */}
          <Button size="lg" className="w-full text-lg py-6">
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BookingPage

