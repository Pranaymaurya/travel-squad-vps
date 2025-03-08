import React, { useEffect, useState } from "react"
import axios from "axios"
import { Star, MapPin, Check, Loader2 } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

function Hotelviews() {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  
  // State for data fetching
  const [user, setUser] = useState(null)
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Get backend URL from environment variable
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/users/profile`, {
          withCredentials: true,
        })
        setUser(data)
      } catch (error) {
        console.error("User not authenticated", error)
        setUser(null)
        setLoading(false)
      }
    }
    fetchUserProfile()
  }, [backendUrl])

  // Fetch hotel data
  useEffect(() => {
    const fetchHotel = async () => {
      if (!user?._id) return

      try {
        const response = await axios.get(`${backendUrl}/api/hotel/user/${user._id}`, {
          withCredentials: true,
        })

        const hotelData = response.data
        if (hotelData) {
          setHotel(hotelData)
        }
      } catch (error) {
        console.error("Failed to fetch hotel data", error)
        setError("Failed to fetch hotel data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchHotel()
    }
  }, [user, backendUrl])

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading hotel details...</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  // No hotel found state
  if (!hotel && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-xl font-semibold mb-2">No Hotel Found</h2>
        <p className="text-muted-foreground">No hotel information is available for this user.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Main info and images */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">{hotel.name}</h1>
                <div className="flex items-center mt-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{hotel.location}</span>
                  <span className="mx-2">•</span>
                  <span>{hotel.distance}</span>
                </div>
              </div>
              {hotel.featured && (
                <Badge variant="secondary" className="font-medium">
                  Featured
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${i < Math.floor(hotel.rating) ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`} 
                />
              ))}
              <span className="ml-2 font-medium">{hotel.rating}</span>
              <span className="text-muted-foreground">({hotel.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Main image gallery */}
          <div className="space-y-2">
            <div className="relative aspect-video overflow-hidden rounded-lg border">
              <img
                src={hotel.images && hotel.images.length > 0 
                  ? hotel.images[activeImageIndex] 
                  : hotel.imageUrl || "https://via.placeholder.com/800x600"}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            {hotel.images && hotel.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {hotel.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border ${
                      index === activeImageIndex ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <img
                      src={img || "https://via.placeholder.com/100x100"}
                      alt={`${hotel.name} image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hotel description */}
          <Card>
            <CardHeader>
              <CardTitle>About this hotel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{hotel.hotelDetails?.description || "No description available."}</p>
            </CardContent>
          </Card>

          {/* Detailed sections */}
          <Tabs defaultValue="rooms">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="dining">Dining</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rooms" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{hotel.roomDetailsAndAmenities?.title || "Room Details"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {hotel.roomDetailsAndAmenities?.img && (
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <img
                        src={hotel.roomDetailsAndAmenities.img || "https://via.placeholder.com/600x400"}
                        alt="Room details"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <ul className="space-y-2">
                    {hotel.roomDetailsAndAmenities?.description?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                    {(!hotel.roomDetailsAndAmenities?.description || hotel.roomDetailsAndAmenities.description.length === 0) && (
                      <li className="text-muted-foreground">No room details available</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="dining" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{hotel.foodAndDining?.title || "Dining Options"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {hotel.foodAndDining?.img && (
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <img
                        src={hotel.foodAndDining.img || "https://via.placeholder.com/600x400"}
                        alt="Dining"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <ul className="space-y-2">
                    {hotel.foodAndDining?.description?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                    {(!hotel.foodAndDining?.description || hotel.foodAndDining.description.length === 0) && (
                      <li className="text-muted-foreground">No dining information available</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="location" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{hotel.locationAndSurroundings?.title || "Location & Surroundings"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {hotel.locationAndSurroundings?.img && (
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <img
                        src={hotel.locationAndSurroundings.img || "https://via.placeholder.com/600x400"}
                        alt="Location"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <ul className="space-y-2">
                    {hotel.locationAndSurroundings?.description?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                    {(!hotel.locationAndSurroundings?.description || hotel.locationAndSurroundings.description.length === 0) && (
                      <li className="text-muted-foreground">No location details available</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activities" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{hotel.activitiesAndNearbyAttractions?.title || "Activities & Attractions"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {hotel.activitiesAndNearbyAttractions?.img && (
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <img
                        src={hotel.activitiesAndNearbyAttractions.img || "https://via.placeholder.com/600x400"}
                        alt="Activities"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <ul className="space-y-2">
                    {hotel.activitiesAndNearbyAttractions?.description?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                    {(!hotel.activitiesAndNearbyAttractions?.description || hotel.activitiesAndNearbyAttractions.description.length === 0) && (
                      <li className="text-muted-foreground">No activities information available</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right column - Price and details */}
        <div className="space-y-6">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {hotel.hotelDetails?.price || `$${hotel.price}`}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  {hotel.hotelDetails?.priceLocation || "per night"}
                </span>
              </CardTitle>
              <CardDescription>{hotel.hotelDetails?.priceDescription || "Includes taxes and fees"}</CardDescription>
              {hotel.hotelPriceHighlight && (
                <Badge variant="outline" className="mt-2">
                  {hotel.hotelPriceHighlight}
                </Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Price details</h3>
                <div className="flex justify-between text-sm">
                  <span>Base price</span>
                  <span>${hotel.price}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Taxes & fees</span>
                  <span>${hotel.taxes}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${hotel.price + hotel.taxes}</span>
                </div>
              </div>

              {hotel.inclusions && hotel.inclusions.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Inclusions</h3>
                  <ul className="space-y-1">
                    {hotel.inclusions.map((item, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">Property details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Type</span>
                    <p>{hotel.type || "Not specified"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Category</span>
                    <p>{hotel.category || "Not specified"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Star rating</span>
                    <p>{hotel.star ? `${hotel.star}-star` : "Not rated"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {hotel.amenities && hotel.amenities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {hotel.facilities && hotel.facilities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {hotel.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default Hotelviews
