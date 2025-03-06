"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const HotelManager = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [user, setUser] = useState(null)
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Hotel data state
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [distance, setDistance] = useState("")
  const [category, setCategory] = useState("")
  const [rating, setRating] = useState(0)
  const [reviewCount, setReviewCount] = useState(0)
  const [price, setPrice] = useState(0)
  const [taxes, setTaxes] = useState(0)
  const [images, setImages] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [star, setStar] = useState(0)
  const [type, setType] = useState("")
  const [featured, setFeatured] = useState(false)
  const [hotelPriceHighlight, setHotelPriceHighlight] = useState("")
  const [inclusions, setInclusions] = useState([])
  const [inclusionInput, setInclusionInput] = useState("")
  const [amenities, setAmenities] = useState([])
  const [amenitiesInput, setAmenitiesInput] = useState("")
  const [facilities, setFacilities] = useState([])
  const [facilitiesInput, setFacilitiesInput] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  // Detailed description sections
  const [foodAndDining, setFoodAndDining] = useState({
    title: "",
    description: [],
    img: "",
  })
  const [foodAndDiningDescriptionInput, setFoodAndDiningDescriptionInput] = useState("")

  const [locationAndSurroundings, setLocationAndSurroundings] = useState({
    title: "",
    description: [],
    img: "",
  })
  const [locationDescriptionInput, setLocationDescriptionInput] = useState("")

  const [roomDetailsAndAmenities, setRoomDetailsAndAmenities] = useState({
    title: "",
    description: [],
    img: "",
  })
  const [roomDescriptionInput, setRoomDescriptionInput] = useState("")

  const [activitiesAndNearbyAttractions, setActivitiesAndNearbyAttractions] = useState({
    title: "",
    description: [],
    img: "",
  })
  const [activitiesDescriptionInput, setActivitiesDescriptionInput] = useState("")

  const [hotelDetails, setHotelDetails] = useState({
    description: "",
    priceDescription: "",
    priceLocation: "",
    price: "",
  })

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

          // Populate all form fields with hotel data
          setName(hotelData.name || "")
          setLocation(hotelData.location || "")
          setDistance(hotelData.distance || "")
          setCategory(hotelData.category || "")
          setRating(hotelData.rating || 0)
          setReviewCount(hotelData.reviewCount || 0)
          setPrice(hotelData.price || 0)
          setTaxes(hotelData.taxes || 0)
          setImages(hotelData.images || [])
          setImageFiles(hotelData.images || [])
          setStar(hotelData.star || 0)
          setType(hotelData.type || "")
          setFeatured(hotelData.featured || false)
          setHotelPriceHighlight(hotelData.hotelPriceHighlight || "")
          setInclusions(hotelData.inclusions || [])
          setAmenities(hotelData.amenities || [])
          setFacilities(hotelData.facilities || [])
          setImageUrl(hotelData.imageUrl || "")

          // Set complex nested objects
          setFoodAndDining(hotelData.foodAndDining || { title: "", description: [], img: "" })
          setLocationAndSurroundings(hotelData.locationAndSurroundings || { title: "", description: [], img: "" })
          setRoomDetailsAndAmenities(hotelData.roomDetailsAndAmenities || { title: "", description: [], img: "" })
          setActivitiesAndNearbyAttractions(
            hotelData.activitiesAndNearbyAttractions || { title: "", description: [], img: "" },
          )
          setHotelDetails(
            hotelData.hotelDetails || { description: "", priceDescription: "", priceLocation: "", price: "" },
          )
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

  // Handler functions for various data types
  const handleAddInclusion = () => {
    if (inclusionInput.trim()) {
      setInclusions([...inclusions, inclusionInput])
      setInclusionInput("")
    }
  }

  const handleRemoveInclusion = (index) => {
    const updatedInclusions = [...inclusions]
    updatedInclusions.splice(index, 1)
    setInclusions(updatedInclusions)
  }

  const handleAddAmenities = () => {
    if (amenitiesInput.trim()) {
      setAmenities([...amenities, amenitiesInput])
      setAmenitiesInput("")
    }
  }

  const handleRemoveAmenities = (index) => {
    const updatedAmenities = [...amenities]
    updatedAmenities.splice(index, 1)
    setAmenities(updatedAmenities)
  }

  const handleAddFacilities = () => {
    if (facilitiesInput.trim()) {
      setFacilities([...facilities, facilitiesInput])
      setFacilitiesInput("")
    }
  }

  const handleRemoveFacilities = (index) => {
    const updatedFacilities = [...facilities]
    updatedFacilities.splice(index, 1)
    setFacilities(updatedFacilities)
  }

  const handleAddImage = (e) => {
    const files = Array.from(e.target.files)
    const newPreviews = files.map((file) => URL.createObjectURL(file))

    setImages([...images, ...newPreviews])
    setImageFiles([...imageFiles, ...files])
  }

  const handleRemoveImage = (index) => {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)

    const updatedImageFiles = [...imageFiles]
    updatedImageFiles.splice(index, 1)

    setImages(updatedImages)
    setImageFiles(updatedImageFiles)
  }

  // Handlers for description sections
  const handleAddFoodAndDiningDescription = () => {
    if (foodAndDiningDescriptionInput.trim()) {
      setFoodAndDining({
        ...foodAndDining,
        description: [...foodAndDining.description, foodAndDiningDescriptionInput],
      })
      setFoodAndDiningDescriptionInput("")
    }
  }

  const handleRemoveFoodAndDiningDescription = (index) => {
    const updatedDescriptions = [...foodAndDining.description]
    updatedDescriptions.splice(index, 1)
    setFoodAndDining({
      ...foodAndDining,
      description: updatedDescriptions,
    })
  }

  const handleAddLocationDescription = () => {
    if (locationDescriptionInput.trim()) {
      setLocationAndSurroundings({
        ...locationAndSurroundings,
        description: [...locationAndSurroundings.description, locationDescriptionInput],
      })
      setLocationDescriptionInput("")
    }
  }

  const handleRemoveLocationDescription = (index) => {
    const updatedDescriptions = [...locationAndSurroundings.description]
    updatedDescriptions.splice(index, 1)
    setLocationAndSurroundings({
      ...locationAndSurroundings,
      description: updatedDescriptions,
    })
  }

  const handleAddRoomDescription = () => {
    if (roomDescriptionInput.trim()) {
      setRoomDetailsAndAmenities({
        ...roomDetailsAndAmenities,
        description: [...roomDetailsAndAmenities.description, roomDescriptionInput],
      })
      setRoomDescriptionInput("")
    }
  }

  const handleRemoveRoomDescription = (index) => {
    const updatedDescriptions = [...roomDetailsAndAmenities.description]
    updatedDescriptions.splice(index, 1)
    setRoomDetailsAndAmenities({
      ...roomDetailsAndAmenities,
      description: updatedDescriptions,
    })
  }

  const handleAddActivitiesDescription = () => {
    if (activitiesDescriptionInput.trim()) {
      setActivitiesAndNearbyAttractions({
        ...activitiesAndNearbyAttractions,
        description: [...activitiesAndNearbyAttractions.description, activitiesDescriptionInput],
      })
      setActivitiesDescriptionInput("")
    }
  }

  const handleRemoveActivitiesDescription = (index) => {
    const updatedDescriptions = [...activitiesAndNearbyAttractions.description]
    updatedDescriptions.splice(index, 1)
    setActivitiesAndNearbyAttractions({
      ...activitiesAndNearbyAttractions,
      description: updatedDescriptions,
    })
  }

  const handleImageChange = (e, section) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = file

      switch (section) {
        case "foodAndDining":
          setFoodAndDining({ ...foodAndDining, img: imageUrl })
          break
        case "locationAndSurroundings":
          setLocationAndSurroundings({ ...locationAndSurroundings, img: imageUrl })
          break
        case "roomDetailsAndAmenities":
          setRoomDetailsAndAmenities({ ...roomDetailsAndAmenities, img: imageUrl })
          break
        case "activitiesAndNearbyAttractions":
          setActivitiesAndNearbyAttractions({ ...activitiesAndNearbyAttractions, img: imageUrl })
          break
        default:
          break
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let mainImagePath = imageUrl

      if (typeof imageUrl === "object") {
        const formData = new FormData()
        formData.append("image", imageUrl)

        const uploadResponse = await axios.post(`${backendUrl}/api/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })

        mainImagePath = uploadResponse.data.imagePath
      }

      // Process section images
      const processImage = async (imgObject, section) => {
        let imagePath = imgObject

        if (typeof imgObject === "object") {
          const formData = new FormData()
          formData.append("image", imgObject)

          const uploadResponse = await axios.post(`${backendUrl}/api/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          })

          imagePath = uploadResponse.data.imagePath
        }

        return imagePath
      }

      const foodImage = await processImage(foodAndDining.img, "foodAndDining")
      const locationImage = await processImage(locationAndSurroundings.img, "locationAndSurroundings")
      const roomImage = await processImage(roomDetailsAndAmenities.img, "roomDetailsAndAmenities")
      const activitiesImage = await processImage(activitiesAndNearbyAttractions.img, "activitiesAndNearbyAttractions")

      // Process all hotel images
      const imagePaths = await Promise.all(
        imageFiles.map(async (imageFile) => {
          if (typeof imageFile === "object") {
            const formData = new FormData()
            formData.append("image", imageFile)

            const uploadResponse = await axios.post(`${backendUrl}/api/upload`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              withCredentials: true,
            })

            return uploadResponse.data.imagePath
          }
          return imageFile // Return the existing path if it's already a string
        }),
      )

      const hotelData = {
        imageUrl: mainImagePath,
        name,
        location,
        distance,
        category,
        rating,
        reviewCount,
        price,
        taxes,
        images: imagePaths,
        star,
        type,
        featured,
        hotelPriceHighlight,
        inclusions,
        amenities,
        facilities,
        foodAndDining: {
          title: foodAndDining.title,
          description: foodAndDining.description,
          img: foodImage,
        },
        locationAndSurroundings: {
          title: locationAndSurroundings.title,
          description: locationAndSurroundings.description,
          img: locationImage,
        },
        roomDetailsAndAmenities: {
          title: roomDetailsAndAmenities.title,
          description: roomDetailsAndAmenities.description,
          img: roomImage,
        },
        activitiesAndNearbyAttractions: {
          title: activitiesAndNearbyAttractions.title,
          description: activitiesAndNearbyAttractions.description,
          img: activitiesImage,
        },
        hotelDetails: {
          description: hotelDetails.description,
          priceDescription: hotelDetails.priceDescription,
          priceLocation: hotelDetails.priceLocation,
          price: hotelDetails.price,
        },
      }

      // Update the hotel
      await axios.put(`${backendUrl}/api/hotel/${hotel._id}`, hotelData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })

      setError(null)
      toast.success("Hotel updated successfully")
    } catch (error) {
      console.error("Error updating hotel:", error)
      setError("Error updating hotel")
      toast.error("Error updating hotel")
    }
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>

  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>

  if (!hotel && !loading)
    return <div className="flex justify-center items-center h-screen">No hotel found for this user</div>

  return (
    <div className="home-section flex flex-col items-center h-screen">
      <div className="bg-white m-5 rounded-sm md:w-4/5 w-full py-10 px-2 md:p-10 overflow-y-auto">
        <h1 className="text-[1.5rem] sm:text-3xl font-semibold">Edit Hotel</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="name">
              Hotel Name
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 rounded-md p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="image">
              Upload Image
            </label>
            <input
              type="file"
              id="imageUrl"
              className="border border-gray-300 rounded-md p-2"
              onChange={(e) => setImageUrl(e.target.files[0])}
            />
            {typeof imageUrl === "string" && imageUrl && (
              <img src={imageUrl || "/placeholder.svg"} alt="Hotel cover" className="mt-2 w-32 h-32 object-cover" />
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="location">
              Hotel Location
            </label>
            <input
              type="text"
              id="location"
              className="border border-gray-300 rounded-md p-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="distance">
              Distance
            </label>
            <input
              type="text"
              id="distance"
              className="border border-gray-300 rounded-md p-2"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              className="border border-gray-300 rounded-md p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="rating">
              Rating
            </label>
            <input
              type="number"
              step="0.1"
              id="rating"
              className="border border-gray-300 rounded-md p-2"
              value={rating}
              onChange={(e) => setRating(Number.parseFloat(e.target.value))}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="reviewCount">
              Review Count
            </label>
            <input
              type="number"
              id="reviewCount"
              className="border border-gray-300 rounded-md p-2"
              value={reviewCount}
              onChange={(e) => setReviewCount(Number.parseInt(e.target.value))}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              className="border border-gray-300 rounded-md p-2"
              value={price}
              onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="taxes">
              Taxes
            </label>
            <input
              type="number"
              id="taxes"
              className="border border-gray-300 rounded-md p-2"
              value={taxes}
              onChange={(e) => setTaxes(Number.parseFloat(e.target.value))}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="images">
              Images <span className="text-red-600">*</span>
            </label>
            <input
              type="file"
              id="imageInput"
              className="border border-gray-300 rounded-md p-2 mb-2"
              multiple
              onChange={handleAddImage}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {images.map((image, index) => (
                <div key={index} className="flex flex-col items-center border p-2 rounded">
                  {typeof image === "string" ? (
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Image ${index + 1}`}
                      className="w-24 h-24 object-cover mb-2"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 flex items-center justify-center mb-2">New Image</div>
                  )}
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded-md p-1 text-sm"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="star">
              Star
            </label>
            <input
              type="number"
              id="star"
              className="border border-gray-300 rounded-md p-2"
              value={star}
              onChange={(e) => setStar(Number.parseFloat(e.target.value))}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="type">
              Type
            </label>
            <input
              type="text"
              id="type"
              className="border border-gray-300 rounded-md p-2"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="amenities">
              Amenities
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="amenitiesInput"
                className="border border-gray-300 rounded-md p-2 flex-grow"
                placeholder="Enter amenity"
                value={amenitiesInput}
                onChange={(e) => setAmenitiesInput(e.target.value)}
              />
              <button type="button" className="bg-blue-500 text-white rounded-md p-2" onClick={handleAddAmenities}>
                Add
              </button>
            </div>
            <div className="mt-2 space-y-2">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <p>{amenity}</p>
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded-md p-1 text-sm"
                    onClick={() => handleRemoveAmenities(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="facilities">
              Facilities
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="facilitiesInput"
                className="border border-gray-300 rounded-md p-2 flex-grow"
                placeholder="Enter facility"
                value={facilitiesInput}
                onChange={(e) => setFacilitiesInput(e.target.value)}
              />
              <button type="button" className="bg-blue-500 text-white rounded-md p-2" onClick={handleAddFacilities}>
                Add
              </button>
            </div>
            <div className="mt-2 space-y-2">
              {facilities.map((facility, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <p>{facility}</p>
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded-md p-1 text-sm"
                    onClick={() => handleRemoveFacilities(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="featured">
              Featured
            </label>
            <input
              type="checkbox"
              id="featured"
              className="border border-gray-300 rounded-md p-2 mr-auto"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="hotelPriceHighlight">
              Hotel Price Highlight
            </label>
            <input
              type="text"
              id="hotelPriceHighlight"
              className="border border-gray-300 rounded-md p-2"
              value={hotelPriceHighlight}
              onChange={(e) => setHotelPriceHighlight(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="inclusions">
              Inclusions
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="inclusionInput"
                className="border border-gray-300 rounded-md p-2 flex-grow"
                placeholder="Enter inclusion"
                value={inclusionInput}
                onChange={(e) => setInclusionInput(e.target.value)}
              />
              <button type="button" className="bg-blue-500 text-white rounded-md p-2" onClick={handleAddInclusion}>
                Add
              </button>
            </div>
            <div className="mt-2 space-y-2">
              {inclusions.map((inclusion, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <p>{inclusion}</p>
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded-md p-1 text-sm"
                    onClick={() => handleRemoveInclusion(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="border p-4 rounded-md space-y-4">
            <div className="flex flex-col">
              <h3 className="font-semibold">Food and Dining</h3>
              <label className="mb-2 font-medium" htmlFor="foodAndDiningTitle">
                Title
              </label>
              <input
                type="text"
                id="foodAndDiningTitle"
                className="border border-gray-300 rounded-md p-2"
                value={foodAndDining.title}
                onChange={(e) => setFoodAndDining({ ...foodAndDining, title: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium" htmlFor="foodAndDiningDescription">
                Description
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="foodAndDiningDescriptionInput"
                  className="border border-gray-300 rounded-md p-2 flex-grow"
                  placeholder="Enter description"
                  value={foodAndDiningDescriptionInput}
                  onChange={(e) => setFoodAndDiningDescriptionInput(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-blue-500 text-white rounded-md p-2"
                  onClick={handleAddFoodAndDiningDescription}
                >
                  Add
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {foodAndDining.description.map((desc, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <p>{desc}</p>
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded-md p-1 text-sm"
                      onClick={() => handleRemoveFoodAndDiningDescription(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium" htmlFor="foodAndDiningImage">
                Image
              </label>
              <input
                type="file"
                id="foodAndDiningImage"
                className="border border-gray-300 rounded-md p-2"
                onChange={(e) => handleImageChange(e, "foodAndDining")}
              />
              {typeof foodAndDining.img === "string" && foodAndDining.img && (
                <img
                  src={foodAndDining.img || "/placeholder.svg"}
                  alt="Food and dining"
                  className="mt-2 w-32 h-32 object-cover"
                />
              )}
            </div>
          </div>

          <div className="border p-4 rounded-md space-y-4">
            <div className="flex flex-col">
              <h3 className="font-semibold">Location and Surroundings</h3>
              <label className="mb-2 font-medium" htmlFor="locationTitle">
                Title
              </label>
              <input
                type="text"
                id="locationTitle"
                className="border border-gray-300 rounded-md p-2"
                value={locationAndSurroundings.title}
                onChange={(e) =>
                  setLocationAndSurroundings({
                    ...locationAndSurroundings,
                    title: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium" htmlFor="locationDescription">
                Description
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="locationDescriptionInput"
                  className="border border-gray-300 rounded-md p-2 flex-grow"
                  placeholder="Enter description"
                  value={locationDescriptionInput}
                  onChange={(e) => setLocationDescriptionInput(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-blue-500 text-white rounded-md p-2"
                  onClick={handleAddLocationDescription}
                >
                  Add
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {locationAndSurroundings.description.map((desc, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <p>{desc}</p>
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded-md p-1 text-sm"
                      onClick={() => handleRemoveLocationDescription(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium" htmlFor="locationImage">
                Image
              </label>
              <input
                type="file"
                id="locationImage"
                className="border border-gray-300 rounded-md p-2"
                onChange={(e) => handleImageChange(e, "locationAndSurroundings")}
              />
              {typeof locationAndSurroundings.img === "string" && locationAndSurroundings.img && (
                <img
                  src={locationAndSurroundings.img || "/placeholder.svg"}
                  alt="Location and surroundings"
                  className="mt-2 w-32 h-32 object-cover"
                />
              )}
            </div>
          </div>

          <div className="border p-4 rounded-md space-y-4">
            <div className="flex flex-col">
              <h3 className="font-semibold">Room Details and Amenities</h3>
              <label className="mb-2 font-medium" htmlFor="roomDetailsTitle">
                Title
              </label>
              <input
                type="text"
                id="roomDetailsTitle"
                className="border border-gray-300 rounded-md p-2"
                value={roomDetailsAndAmenities.title}
                onChange={(e) =>
                  setRoomDetailsAndAmenities({
                    ...roomDetailsAndAmenities,
                    title: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium" htmlFor="roomDescription">
                Description
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="roomDescriptionInput"
                  className="border border-gray-300 rounded-md p-2 flex-grow"
                  placeholder="Enter description"
                  value={roomDescriptionInput}
                  onChange={(e) => setRoomDescriptionInput(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-blue-500 text-white rounded-md p-2"
                  onClick={handleAddRoomDescription}
                >
                  Add
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {roomDetailsAndAmenities.description.map((desc, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <p>{desc}</p>
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded-md p-1 text-sm"
                      onClick={() => handleRemoveRoomDescription(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium" htmlFor="roomImage">
                Image
              </label>
              <input
                type="file"
                id="roomImage"
                className="border border-gray-300 rounded-md p-2"
                onChange={(e) => handleImageChange(e, "roomDetailsAndAmenities")}
              />
              {typeof roomDetailsAndAmenities.img === "string" && roomDetailsAndAmenities.img && (
                <img
                  src={roomDetailsAndAmenities.img || "/placeholder.svg"}
                  alt="Room details"
                  className="mt-2 w-32 h-32 object-cover"
                />
              )}
            </div>
          </div>

          <div className="border p-4 rounded-md space-y-4">
            <div className="flex flex-col">
              <h3 className="font-semibold">Activities and Nearby Attractions</h3>
              <label className="mb-2 font-medium" htmlFor="activitiesTitle">
                Title
              </label>
              <input
                type="text"
                id="activitiesTitle"
                className="border border-gray-300 rounded-md p-2"
                value={activitiesAndNearbyAttractions.title}
                onChange={(e) =>
                  setActivitiesAndNearbyAttractions({
                    ...activitiesAndNearbyAttractions,
                    title: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium" htmlFor="activitiesDescription">
                Description
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="activitiesDescriptionInput"
                  className="border border-gray-300 rounded-md p-2 flex-grow"
                  placeholder="Enter description"
                  value={activitiesDescriptionInput}
                  onChange={(e) => setActivitiesDescriptionInput(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-blue-500 text-white rounded-md p-2"
                  onClick={handleAddActivitiesDescription}
                >
                  Add
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {activitiesAndNearbyAttractions.description.map((desc, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <p>{desc}</p>
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded-md p-1 text-sm"
                      onClick={() => handleRemoveActivitiesDescription(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium" htmlFor="activitiesImage">
                Image
              </label>
              <input
                type="file"
                id="activitiesImage"
                className="border border-gray-300 rounded-md p-2"
                onChange={(e) => handleImageChange(e, "activitiesAndNearbyAttractions")}
              />
              {typeof activitiesAndNearbyAttractions.img === "string" && activitiesAndNearbyAttractions.img && (
                <img
                  src={activitiesAndNearbyAttractions.img || "/placeholder.svg"}
                  alt="Activities and attractions"
                  className="mt-2 w-32 h-32 object-cover"
                />
              )}
            </div>
          </div>

          <div className="border p-4 rounded-md space-y-4">
            <div className="flex flex-col">
              <h3 className="font-semibold">Hotel Details</h3>
              <label className="mb-2 font-medium" htmlFor="hotelDescription">
                Description
              </label>
              <textarea
                id="hotelDescription"
                className="border border-gray-300 rounded-md p-2 min-h-[100px]"
                value={hotelDetails.description}
                onChange={(e) =>
                  setHotelDetails({
                    ...hotelDetails,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium" htmlFor="priceDescription">
                Price Description
              </label>
              <input
                type="text"
                id="priceDescription"
                className="border border-gray-300 rounded-md p-2"
                value={hotelDetails.priceDescription}
                onChange={(e) =>
                  setHotelDetails({
                    ...hotelDetails,
                    priceDescription: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium" htmlFor="priceLocation">
                Price Location
              </label>
              <input
                type="text"
                id="priceLocation"
                className="border border-gray-300 rounded-md p-2"
                value={hotelDetails.priceLocation}
                onChange={(e) =>
                  setHotelDetails({
                    ...hotelDetails,
                    priceLocation: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium" htmlFor="hotelPrice">
                Hotel Price
              </label>
              <input
                type="text"
                id="hotelPrice"
                className="border border-gray-300 rounded-md p-2"
                value={hotelDetails.price}
                onChange={(e) =>
                  setHotelDetails({
                    ...hotelDetails,
                    price: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white rounded-md p-2 px-4 hover:bg-blue-600">
              Update Hotel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HotelManager

