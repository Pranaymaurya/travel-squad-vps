import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditHotel = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { hotelId } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [star, setStar] = useState(0);
  const [type, setType] = useState("");
  const [featured, setFeatured] = useState(false);
  const [hotelPriceHighlight, setHotelPriceHighlight] = useState("");
  const [inclusions, setInclusions] = useState([]);
  const [inclusionInput, setInclusionInput] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [amenitiesInput, setAmenitiesInput] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [facilitiesInput, setFacilitiesInput] = useState("");
  const [foodAndDiningDescriptionInput, setFoodAndDiningDescriptionInput] =
    useState("");
  const [locationDescriptionInput, setLocationDescriptionInput] = useState("");
  const [roomDescriptionInput, setRoomDescriptionInput] = useState("");
  const [activitiesDescriptionInput, setActivitiesDescriptionInput] =
    useState("");
  const [foodAndDining, setFoodAndDining] = useState({
    title: "",
    description: [],
    img: "",
  });
  const [locationAndSurroundings, setLocationAndSurroundings] = useState({
    title: "",
    description: [],
    img: "",
  });
  const [roomDetailsAndAmenities, setRoomDetailsAndAmenities] = useState({
    title: "",
    description: [],
    img: "",
  });
  const [activitiesAndNearbyAttractions, setActivitiesAndNearbyAttractions] =
    useState({
      title: "",
      description: [],
      img: "",
    });
  const [hotelDetails, setHotelDetails] = useState({
    description: "",
    priceDescription: "",
    priceLocation: "",
    price: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      if (hotelId) {
        try {
          const { data } = await axios.get(`${backendUrl}/api/admin/hotel/edit/${hotelId}`, { withCredentials: true});
          setImageUrl(data.imageUrl);
          setName(data.name);
          setLocation(data.location);
          setDistance(data.distance);
          setCategory(data.category);
          setRating(data.rating);
          setReviewCount(data.reviewCount);
          setPrice(data.price);
          setTaxes(data.taxes);
          // setImages(data.images);
          setStar(data.star);
          setType(data.type);
          setAmenities(data.amenities);
          setFacilities(data.facilities);
          setFeatured(data.featured);
          setHotelPriceHighlight(data.hotelPriceHighlight);
          setInclusions(data.inclusions);
          setFoodAndDining(data.foodAndDining);
          setLocationAndSurroundings(data.locationAndSurroundings);
          setRoomDetailsAndAmenities(data.roomDetailsAndAmenities);
          setActivitiesAndNearbyAttractions(
            data.activitiesAndNearbyAttractions
          );
          setHotelDetails(data.hotelDetails);
        } catch (error) {
          console.error("Error fetching package:", error);
          setError("Error fetching package data");
        }
      }
    };

    fetchPackage();
  }, [hotelId]);

  const handleAddFoodAndDiningDescription = () => {
    setFoodAndDining({
      ...foodAndDining,
      description: [
        ...foodAndDining.description,
        foodAndDiningDescriptionInput,
      ],
    });
    setFoodAndDiningDescriptionInput("");
  };

  const handleRemoveFoodAndDiningDescription = (index) => {
    const updatedDescriptions = [...foodAndDining.description];
    updatedDescriptions.splice(index, 1);
    setFoodAndDining({
      ...foodAndDining,
      description: updatedDescriptions,
    });
  };

  const handleAddLocationDescription = () => {
    setLocationAndSurroundings({
      ...locationAndSurroundings,
      description: [
        ...locationAndSurroundings.description,
        locationDescriptionInput,
      ],
    });
    setLocationDescriptionInput("");
  };

  const handleRemoveLocationDescription = (index) => {
    const updatedDescriptions = [...locationAndSurroundings.description];
    updatedDescriptions.splice(index, 1);
    setLocationAndSurroundings({
      ...locationAndSurroundings,
      description: updatedDescriptions,
    });
  };

  const handleAddRoomDescription = () => {
    setRoomDetailsAndAmenities({
      ...roomDetailsAndAmenities,
      description: [
        ...roomDetailsAndAmenities.description,
        roomDescriptionInput,
      ],
    });
    setRoomDescriptionInput("");
  };

  const handleRemoveRoomDescription = (index) => {
    const updatedDescriptions = [...roomDetailsAndAmenities.description];
    updatedDescriptions.splice(index, 1);
    setRoomDetailsAndAmenities({
      ...roomDetailsAndAmenities,
      description: updatedDescriptions,
    });
  };

  const handleAddActivitiesDescription = () => {
    setActivitiesAndNearbyAttractions({
      ...activitiesAndNearbyAttractions,
      description: [
        ...activitiesAndNearbyAttractions.description,
        activitiesDescriptionInput,
      ],
    });
    setActivitiesDescriptionInput("");
  };

  const handleRemoveActivitiesDescription = (index) => {
    const updatedDescriptions = [...activitiesAndNearbyAttractions.description];
    updatedDescriptions.splice(index, 1);
    setActivitiesAndNearbyAttractions({
      ...activitiesAndNearbyAttractions,
      description: updatedDescriptions,
    });
  };

  const handleAddInclusion = () => {
    setInclusions([...inclusions, inclusionInput]);
    setInclusionInput("");
    console.log(inclusions);
  };

  const handleRemoveInclusion = (index) => {
    const updatedInclusions = [...inclusions];
    updatedInclusions.splice(index, 1);
    setInclusions(updatedInclusions);
    console.log(inclusions);
  };

  const handleAddAmenities = () => {
    setAmenities([...amenities, amenitiesInput]);
    setAmenitiesInput("");
    console.log(amenities);
  };

  const handleRemoveAmenities = (index) => {
    const updatedAmenities = [...amenities];
    updatedAmenities.splice(index, 1);
    setAmenities(updatedAmenities);
    console.log(amenities);
  };

  const handleAddFacilities = () => {
    setFacilities([...facilities, facilitiesInput]);
    setFacilitiesInput("");
    console.log(facilities);
  };

  const handleRemoveFacilities = (index) => {
    const updatedFacilities = [...facilities];
    updatedFacilities.splice(index, 1);
    setFacilities(updatedFacilities);
    console.log(facilities);
  };

  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setImages([...images, ...newPreviews]);
    setImageFiles([...imageFiles, ...files]);
    console.log(images);
    console.log(imageFiles);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);

    const updatedimageFiles = [...imageFiles];
    updatedimageFiles.splice(index, 1);

    setImages(updatedImages);
    setImageFiles(updatedimageFiles);
    console.log(images);
    console.log(imageFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imagePath = imageUrl;

      if (typeof imageUrl === "object") {
        const formData = new FormData();
        formData.append("image", imageUrl);

        const uploadResponse = await axios.post(`${backendUrl}/api/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        imagePath = uploadResponse.data.imagePath;
      }

      let image1 = foodAndDining.img;

      if (typeof image1 === "object") {
        const formData = new FormData();
        formData.append("image", image1);

        const uploadResponse = await axios.post(`${backendUrl}/api/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        image1 = uploadResponse.data.imagePath;
        console.log(image1)
        setFoodAndDining({ ...foodAndDining, img: image1 });
      }

      let image2 = locationAndSurroundings.img;

      if (typeof image2 === "object") {
        const formData = new FormData();
        formData.append("image", image2);

        const uploadResponse = await axios.post(`${backendUrl}/api/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        image2 = uploadResponse.data.imagePath;
        setLocationAndSurroundings({ ...locationAndSurroundings, img: image2 });
      }

      let image3 = roomDetailsAndAmenities.img;

      if (typeof image3 === "object") {
        const formData = new FormData();
        formData.append("image", image3);

        const uploadResponse = await axios.post(`${backendUrl}/api/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        image3 = uploadResponse.data.imagePath;
        setRoomDetailsAndAmenities({ ...roomDetailsAndAmenities, img: image3 });
      }

      let image4 = activitiesAndNearbyAttractions.img;

      if (typeof image4 === "object") {
        const formData = new FormData();
        formData.append("image", image4);

        const uploadResponse = await axios.post(`${backendUrl}/api/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        image4 = uploadResponse.data.imagePath;
        setActivitiesAndNearbyAttractions({
          ...activitiesAndNearbyAttractions,
          img: image4,
        });
      }

      const imagePaths = await Promise.all(
        imageFiles.map(async (imageFile, index) => {
          if (typeof imageFile === "object") {
            const formData = new FormData();
            formData.append("image", imageFile);

            const uploadResponse = await axios.post(`${backendUrl}/api/upload`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              withCredentials: true,
            });

            imageFiles[index] = uploadResponse.data.imagePath;
          }
          return imageFiles[index]; // Return the updated path
        })
      );

      console.log(foodAndDining);

      const hotelData = {
        imageUrl: imagePath,
        name,
        location,
        distance,
        category,
        rating,
        reviewCount,
        price,
        taxes,
        images: imageFiles,
        star,
        type,
        featured,
        hotelPriceHighlight,
        inclusions,
        amenities,
        facilities,
        // foodAndDining,
        // locationAndSurroundings,
        // roomDetailsAndAmenities,
        // activitiesAndNearbyAttractions,
        // hotelDetails
        foodAndDining: {
          title: foodAndDining.title,
          description: foodAndDining.description,
          img: image1,
        },
        locationAndSurroundings: {
          title: locationAndSurroundings.title,
          description: locationAndSurroundings.description,
          img: image2,
        },
        roomDetailsAndAmenities: {
          title: roomDetailsAndAmenities.title,
          description: roomDetailsAndAmenities.description,
          img: image3,
        },
        activitiesAndNearbyAttractions: {
          title: activitiesAndNearbyAttractions.title,
          description: activitiesAndNearbyAttractions.description,
          img: image4,
        },
        hotelDetails: {
          description: hotelDetails.description,
          priceDescription: hotelDetails.priceDescription,
          priceLocation: hotelDetails.priceLocation,
          price: hotelDetails.price,
        },
      };

   

      await axios.put(`${backendUrl}/api/admin/hotel/edit/${hotelId}`, hotelData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setError(null);
      toast.success("Hotel edited successfully");
    } catch (error) {
      console.error("Error updating hotel:", error);
      setError("Error updating hotel");
      toast.error("Error editing hotel");
    }
  };

  const handleImageChange = (e, section) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the selected image file
      const imageUrl = file;

      // Update the state with the selected image file or URL
      switch (section) {
        case "foodAndDining":
          setFoodAndDining({ ...foodAndDining, img: imageUrl });
          console.log(foodAndDining.img);
          break;
        case "locationAndSurroundings":
          setLocationAndSurroundings({
            ...locationAndSurroundings,
            img: imageUrl,
          });
          break;
        case "roomDetailsAndAmenities":
          setRoomDetailsAndAmenities({
            ...roomDetailsAndAmenities,
            img: imageUrl,
          });
          break;
        case "activitiesAndNearbyAttractions":
          setActivitiesAndNearbyAttractions({
            ...activitiesAndNearbyAttractions,
            img: imageUrl,
          });
          break;
        default:
          break;
      }
    }
  };

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
              //onChange={handleImageChange}
              onChange={(e) => setImageUrl(e.target.files[0])}
            />
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
              onChange={(e) => setRating(parseFloat(e.target.value))}
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
              onChange={(e) => setReviewCount(parseFloat(e.target.value))}
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
              onChange={(e) => setPrice(parseFloat(e.target.value))}
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
              onChange={(e) => setTaxes(parseFloat(e.target.value))}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="images">
              Images <span className="text-red-600">*</span>(You need to add all
              images again)
            </label>
            <input
              type="file"
              id="imageInput"
              className="border border-gray-300 rounded-md p-2 mb-2"
              multiple
              onChange={handleAddImage}
            />
            <div className="space-y-2">
              {images.map((image, index) => (
                <div key={index} className="flex items-center justify-between">
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-16 h-16 object-cover"
                  />
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded-md p-2"
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
              onChange={(e) => setStar(parseFloat(e.target.value))}
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
            <input
              type="text"
              id="amenitiesInput"
              className="border border-gray-300 rounded-md p-2 mb-2"
              placeholder="Enter amenity"
              value={amenitiesInput}
              onChange={(e) => setAmenitiesInput(e.target.value)}
            />
            <button
              type="button"
              className="bg-blue-500 text-white rounded-md p-2 mb-2"
              onClick={handleAddAmenities}
            >
              Add Amenity
            </button>
            <div className="space-y-2">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p>{amenity}</p>
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded-md p-2"
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
            <input
              type="text"
              id="facilitiesInput"
              className="border border-gray-300 rounded-md p-2 mb-2"
              placeholder="Enter facility"
              value={facilitiesInput}
              onChange={(e) => setFacilitiesInput(e.target.value)}
            />
            <button
              type="button"
              className="bg-blue-500 text-white rounded-md p-2 mb-2"
              onClick={handleAddFacilities}
            >
              Add Facility
            </button>
            <div className="space-y-2">
              {facilities.map((facility, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p>{facility}</p>
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded-md p-2"
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
            <input
              type="text"
              id="inclusionInput"
              className="border border-gray-300 rounded-md p-2 mb-2"
              placeholder="Enter inclusion"
              value={inclusionInput}
              onChange={(e) => setInclusionInput(e.target.value)}
            />
            <button
              type="button"
              className="bg-blue-500 text-white rounded-md p-2 mb-2"
              onClick={handleAddInclusion}
            >
              Add Inclusion
            </button>
            <div className="space-y-2">
              {inclusions.map((inclusion, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p>{inclusion}</p>
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded-md p-2"
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
                onChange={(e) =>
                  setFoodAndDining({ ...foodAndDining, title: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                className="mb-2 font-medium"
                htmlFor="foodAndDiningDescription"
              >
                Description
              </label>
              <input
                type="text"
                id="foodAndDiningDescriptionInput"
                className="border border-gray-300 rounded-md p-2 mb-2"
                placeholder="Enter description"
                value={foodAndDiningDescriptionInput}
                onChange={(e) =>
                  setFoodAndDiningDescriptionInput(e.target.value)
                }
              />
              <button
                type="button"
                className="bg-blue-500 text-white rounded-md p-2 mb-2"
                onClick={handleAddFoodAndDiningDescription}
              >
                Add Description
              </button>
              <div className="space-y-2">
                {foodAndDining.description.map((desc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <p>{desc}</p>
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded-md p-2"
                      onClick={() =>
                        handleRemoveFoodAndDiningDescription(index)
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <label className="mb-2 font-medium" htmlFor="foodAndDiningImage">
              Image
            </label>
            <input
              type="file"
              id="foodAndDiningImage"
              className="border border-gray-300 rounded-md p-2"
              onChange={(e) => handleImageChange(e, "foodAndDining")}
            />
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
              <input
                type="text"
                id="locationDescriptionInput"
                className="border border-gray-300 rounded-md p-2 mb-2"
                placeholder="Enter description"
                value={locationDescriptionInput}
                onChange={(e) => setLocationDescriptionInput(e.target.value)}
              />
              <button
                type="button"
                className="bg-blue-500 text-white rounded-md p-2 mb-2"
                onClick={handleAddLocationDescription}
              >
                Add Description
              </button>
              <div className="space-y-2">
                {locationAndSurroundings.description.map((desc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <p>{desc}</p>
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded-md p-2"
                      onClick={() => handleRemoveLocationDescription(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <label
              className="mb-2 font-medium"
              htmlFor="locationAndSurroundingsImage"
            >
              Image
            </label>
            <input
              type="file"
              id="locationAndSurroundingsImage"
              className="border border-gray-300 rounded-md p-2"
              onChange={(e) => handleImageChange(e, "locationAndSurroundings")}
            />
          </div>

          <div className="border p-4 rounded-md space-y-4">
            <div className="flex flex-col">
              <h3 className="font-semibold">Room Details and Amenities</h3>
              <label className="mb-2 font-medium" htmlFor="roomTitle">
                Title
              </label>
              <input
                type="text"
                id="roomTitle"
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
              <input
                type="text"
                id="roomDescriptionInput"
                className="border border-gray-300 rounded-md p-2 mb-2"
                placeholder="Enter description"
                value={roomDescriptionInput}
                onChange={(e) => setRoomDescriptionInput(e.target.value)}
              />
              <button
                type="button"
                className="bg-blue-500 text-white rounded-md p-2 mb-2"
                onClick={handleAddRoomDescription}
              >
                Add Description
              </button>
              <div className="space-y-2">
                {roomDetailsAndAmenities.description.map((desc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <p>{desc}</p>
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded-md p-2"
                      onClick={() => handleRemoveRoomDescription(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <label
              className="mb-2 font-medium"
              htmlFor="roomDetailsAndAmenitiesImage"
            >
              Image
            </label>
            <input
              type="file"
              id="roomDetailsAndAmenitiesImage"
              className="border border-gray-300 rounded-md p-2"
              onChange={(e) => handleImageChange(e, "roomDetailsAndAmenities")}
            />
          </div>

          <div className="border p-4 rounded-md space-y-4">
            <div className="flex flex-col">
              <h3 className="font-semibold">
                Activities and Nearby Attractions
              </h3>
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
              <label
                className="mb-2 font-medium"
                htmlFor="activitiesDescription"
              >
                Description
              </label>
              <input
                type="text"
                id="activitiesDescriptionInput"
                className="border border-gray-300 rounded-md p-2 mb-2"
                placeholder="Enter description"
                value={activitiesDescriptionInput}
                onChange={(e) => setActivitiesDescriptionInput(e.target.value)}
              />
              <button
                type="button"
                className="bg-blue-500 text-white rounded-md p-2 mb-2"
                onClick={handleAddActivitiesDescription}
              >
                Add Description
              </button>
              <div className="space-y-2">
                {activitiesAndNearbyAttractions.description.map(
                  (desc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <p>{desc}</p>
                      <button
                        type="button"
                        className="bg-red-500 text-white rounded-md p-2"
                        onClick={() => handleRemoveActivitiesDescription(index)}
                      >
                        Remove
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
            <label
              className="mb-2 font-medium"
              htmlFor="activitiesAndNearbyAttractionsImage"
            >
              Image
            </label>
            <input
              type="file"
              id="activitiesAndNearbyAttractionsImage"
              className="border border-gray-300 rounded-md p-2"
              onChange={(e) =>
                handleImageChange(e, "activitiesAndNearbyAttractions")
              }
            />
          </div>

          <div className="border p-4 rounded-md space-y-4">
            <div className="flex flex-col">
              <h3 className="font-semibold">Hotel Details</h3>
              <label
                className="mb-2 font-medium"
                htmlFor="descriptionHotelDetails"
              >
                Description
              </label>
              <input
                type="text"
                id="descriptionHotelDetails"
                className="border border-gray-300 rounded-md p-2 mb-2"
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
              <label
                className="mb-2 font-medium"
                htmlFor="priceDescriptionHotelDetails"
              >
                Price Description
              </label>
              <input
                type="text"
                id="priceDescriptionHotelDetails"
                className="border border-gray-300 rounded-md p-2 mb-2"
                value={hotelDetails.priceDescription}
                onChange={(e) =>
                  setHotelDetails({
                    ...hotelDetails,
                    priceDescription: e.target.value,
                  })
                }
                required
              />
              <label
                className="mb-2 font-medium"
                htmlFor="priceLocationHotelDetails"
              >
                Price Location
              </label>
              <input
                type="text"
                id="priceLocationHotelDetails"
                className="border border-gray-300 rounded-md p-2 mb-2"
                value={hotelDetails.priceLocation}
                onChange={(e) =>
                  setHotelDetails({
                    ...hotelDetails,
                    priceLocation: e.target.value,
                  })
                }
                required
              />
              <label className="mb-2 font-medium" htmlFor="priceHotelDetails">
                Price
              </label>
              <input
                type="text"
                id="priceHotelDetails"
                className="border border-gray-300 rounded-md p-2 mb-2"
                value={hotelDetails.price}
                onChange={(e) =>
                  setHotelDetails({ ...hotelDetails, price: e.target.value })
                }
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white rounded-md p-2"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditHotel;
