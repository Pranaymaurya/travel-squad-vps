"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  MapPin,
  Utensils,
  Bed,
  Map,
  Compass,
  Coffee,
  Wifi,
  Tv,
  ShowerHead,
  Car,
  CheckCircle2,
} from "lucide-react"

export default function HotelView() {
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/hotels/${id}`)
        setHotel(response.data)
      } catch (error) {
        console.error("Failed to fetch hotel data", error)
        setError("Failed to fetch hotel data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchHotel()
    }
  }, [id, backendUrl])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !hotel) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error || "Hotel not found"}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const renderStars = (count) => {
    return Array(Math.floor(count))
      .fill(0)
      .map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={hotel.imageUrl || "/placeholder.svg?height=600&width=800"}
              alt={hotel.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-4 grid grid-cols-5 gap-2">
            {hotel.images &&
              hotel.images.slice(0, 5).map((image, index) => (
                <div
                  key={index}
                  className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${
                    activeImageIndex === index ? "border-primary" : "border-transparent"
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <Image
                    src={image || "/placeholder.svg?height=100&width=100"}
                    alt={`${hotel.name} - image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
        <div>
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold">{hotel.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hotel.location}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-sm">
                  {hotel.category}
                </Badge>
              </div>
              <div className="flex items-center mt-2">
                <div className="flex mr-2">{renderStars(hotel.star)}</div>
                <span className="text-sm text-muted-foreground">
                  {hotel.rating} ({hotel.reviewCount} reviews)
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Price</h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">${hotel.price}</span>
                    <span className="text-sm text-muted-foreground ml-2">/ night</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">+${hotel.taxes} taxes and fees</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Highlights</h3>
                  <p className="text-sm">{hotel.hotelPriceHighlight}</p>
                </div>

                {hotel.inclusions && hotel.inclusions.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-2">Inclusions</h3>
                      <ul className="grid grid-cols-1 gap-1">
                        {hotel.inclusions.map((inclusion, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            {inclusion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Book Now</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="details" className="mt-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="dining">Dining</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>About {hotel.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">
                  {hotel.hotelDetails?.description || "No description available."}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Activities & Attractions</h3>
                {hotel.activitiesAndNearbyAttractions?.title && (
                  <h4 className="font-medium mb-2">{hotel.activitiesAndNearbyAttractions.title}</h4>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ul className="space-y-2">
                      {hotel.activitiesAndNearbyAttractions?.description?.map((desc, index) => (
                        <li key={index} className="flex items-start">
                          <Compass className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {hotel.activitiesAndNearbyAttractions?.img && (
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={hotel.activitiesAndNearbyAttractions.img || "/placeholder.svg?height=300&width=500"}
                        alt="Activities and attractions"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Amenities Tab */}
        <TabsContent value="amenities" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Amenities & Facilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hotel.amenities && hotel.amenities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Amenities</h3>
                    <ul className="space-y-2">
                      {hotel.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <Wifi className="h-4 w-4 text-primary" />
                          </div>
                          <span>{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {hotel.facilities && hotel.facilities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Facilities</h3>
                    <ul className="space-y-2">
                      {hotel.facilities.map((facility, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <ShowerHead className="h-4 w-4 text-primary" />
                          </div>
                          <span>{facility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {hotel.inclusions && hotel.inclusions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Inclusions</h3>
                    <ul className="space-y-2">
                      {hotel.inclusions.map((inclusion, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          </div>
                          <span>{inclusion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rooms Tab */}
        <TabsContent value="rooms" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Room Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {hotel.roomDetailsAndAmenities?.title && (
                <h3 className="text-lg font-medium">{hotel.roomDetailsAndAmenities.title}</h3>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-3">
                    {hotel.roomDetailsAndAmenities?.description?.map((desc, index) => (
                      <li key={index} className="flex items-start">
                        <Bed className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {hotel.roomDetailsAndAmenities?.img && (
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={hotel.roomDetailsAndAmenities.img || "/placeholder.svg?height=300&width=500"}
                      alt="Room details"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Room Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {hotel.amenities?.slice(0, 6).map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <Tv className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dining Tab */}
        <TabsContent value="dining" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Food & Dining</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {hotel.foodAndDining?.title && <h3 className="text-lg font-medium">{hotel.foodAndDining.title}</h3>}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-3">
                    {hotel.foodAndDining?.description?.map((desc, index) => (
                      <li key={index} className="flex items-start">
                        <Utensils className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {hotel.foodAndDining?.img && (
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={hotel.foodAndDining.img || "/placeholder.svg?height=300&width=500"}
                      alt="Food and dining"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Dining Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center p-4 border rounded-lg">
                    <Coffee className="h-10 w-10 mr-4 text-primary" />
                    <div>
                      <h4 className="font-medium">Breakfast</h4>
                      <p className="text-sm text-muted-foreground">
                        {hotel.inclusions?.includes("Breakfast") ? "Included" : "Available (extra charge)"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 border rounded-lg">
                    <Utensils className="h-10 w-10 mr-4 text-primary" />
                    <div>
                      <h4 className="font-medium">Restaurant</h4>
                      <p className="text-sm text-muted-foreground">On-site dining available</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Location Tab */}
        <TabsContent value="location" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Location & Surroundings</CardTitle>
              <CardDescription>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {hotel.location} • {hotel.distance} from center
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {hotel.locationAndSurroundings?.title && (
                <h3 className="text-lg font-medium">{hotel.locationAndSurroundings.title}</h3>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-3">
                    {hotel.locationAndSurroundings?.description?.map((desc, index) => (
                      <li key={index} className="flex items-start">
                        <Map className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {hotel.locationAndSurroundings?.img && (
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={hotel.locationAndSurroundings.img || "/placeholder.svg?height=300&width=500"}
                      alt="Location and surroundings"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Transportation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center p-4 border rounded-lg">
                    <Car className="h-10 w-10 mr-4 text-primary" />
                    <div>
                      <h4 className="font-medium">Parking</h4>
                      <p className="text-sm text-muted-foreground">
                        {hotel.facilities?.includes("Parking") ? "Available on premises" : "Not available"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 border rounded-lg">
                    <MapPin className="h-10 w-10 mr-4 text-primary" />
                    <div>
                      <h4 className="font-medium">Distance</h4>
                      <p className="text-sm text-muted-foreground">{hotel.distance} from city center</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mt-6 bg-muted">
                {/* Map placeholder - in a real app, you would integrate with Google Maps or similar */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">Map view would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Booking Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Book Your Stay</CardTitle>
          <CardDescription>Experience the perfect getaway at {hotel.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-4">Why Book With Us</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                  <div>
                    <h4 className="font-medium">Best Price Guarantee</h4>
                    <p className="text-sm text-muted-foreground">Find it cheaper elsewhere and we'll match it</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                  <div>
                    <h4 className="font-medium">Free Cancellation</h4>
                    <p className="text-sm text-muted-foreground">On most rooms up to 24 hours before check-in</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                  <div>
                    <h4 className="font-medium">No Booking Fees</h4>
                    <p className="text-sm text-muted-foreground">We don't charge any booking fees</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                  <div>
                    <h4 className="font-medium">Secure Booking</h4>
                    <p className="text-sm text-muted-foreground">We use SSL encryption for your protection</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Price Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Room rate</span>
                  <span>${hotel.price}/night</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & fees</span>
                  <span>${hotel.taxes}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(Number.parseFloat(hotel.price) + Number.parseFloat(hotel.taxes)).toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full">Book Now</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

