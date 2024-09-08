import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditPackage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { packageId } = useParams();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // Add image preview state
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [photos, setPhotos] = useState([]); // For photo previews
  const [photoFiles, setPhotoFiles] = useState([]); // For storing photo files
  const [photoInput, setPhotoInput] = useState("");
  const [inclusions, setInclusions] = useState([]);
  const [inclusionInput, setInclusionInput] = useState("");
  const [tourPlan, setTourPlan] = useState([]);
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTill, setAvailableTill] = useState("");
  const [featured, setFeatured] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      if (packageId) {
        try {
          const { data } = await axios.get(`${backendUrl}/api/admin/tour/edit/${packageId}`,  {withCredentials: true});
          setName(data.name);
          setType(data.type);
          setDescription(data.description);
          setImage(data.image);
          setImagePreview(`${backendUrl}${data.image}`); // Set the initial image preview
          setPrice(data.price);
          setRating(data.rating);
          setReviews(data.reviews);
          setLocation(data.location);
          setDuration(data.duration);
          setInclusions(data.inclusions);
          setTourPlan(data.tourPlan);
          setAvailableFrom(data.availableFrom.split("T")[0]);
          setAvailableTill(data.availableTill.split("T")[0]);
          setFeatured(data.featured);
        } catch (error) {
          console.error("Error fetching package:", error);
          setError("Error fetching package data");
        }
      }
    };

    fetchPackage();
  }, [packageId]);

  const handleAddInclusion = () => {
    setInclusions([...inclusions, inclusionInput]);
    setInclusionInput("");
  };

  const handleRemoveInclusion = (index) => {
    const updatedInclusions = [...inclusions];
    updatedInclusions.splice(index, 1);
    setInclusions(updatedInclusions);
  };
  const handleAddPhoto = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setPhotos([...photos, ...newPreviews]);
    setPhotoFiles([...photoFiles, ...files]);
    console.log(photos);
    console.log(photoFiles);
  };

  const handleRemovePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);

    const updatedPhotoFiles = [...photoFiles];
    updatedPhotoFiles.splice(index, 1);

    setPhotos(updatedPhotos);
    setPhotoFiles(updatedPhotoFiles);
    console.log(photos);
    console.log(photoFiles);
  };

  const handleAddTourPlan = () => {
    setTourPlan([
      ...tourPlan,
      {
        day: tourPlan.length + 1,
        description: "",
        car: [],
        sightseeing: [],
        hotels: [],
      },
    ]);
    console.log(tourPlan);
  };

  const handleRemoveDay = (dayIndex) => {
    const updatedTourPlan = tourPlan.filter((_, index) => index !== dayIndex);

    // Adjust the day numbers after removing a day
    const adjustedTourPlan = updatedTourPlan.map((plan, index) => ({
      ...plan,
      day: index + 1,
    }));

    setTourPlan(adjustedTourPlan);
    console.log(tourPlan);
  };

  const handleTourPlanChange = (index, field, value) => {
    const updatedTourPlan = tourPlan.map((plan, i) =>
      i === index ? { ...plan, [field]: value } : plan
    );
    setTourPlan(updatedTourPlan);
    console.log(tourPlan);
  };

  const handleCarChange = (dayIndex, carIndex, field, value) => {
    const updatedTourPlan = [...tourPlan];
    updatedTourPlan[dayIndex].car[carIndex][field] = value;
    setTourPlan(updatedTourPlan);
    console.log(tourPlan);
  };

  const handleAddCar = (dayIndex) => {
    const updatedTourPlan = [...tourPlan];
    updatedTourPlan[dayIndex].car.push({
      destination: "",
      type: "",
      model: "",
      facilities: "",
      image: "",
    });
    setTourPlan(updatedTourPlan);
    console.log(tourPlan);
  };

  const handleSightseeingChange = (
    dayIndex,
    sightseeingIndex,
    field,
    value
  ) => {
    const updatedTourPlan = [...tourPlan];
    updatedTourPlan[dayIndex].sightseeing[sightseeingIndex][field] = value;
    setTourPlan(updatedTourPlan);
    console.log(tourPlan);
  };

  const handleAddSightseeing = (dayIndex) => {
    const updatedTourPlan = [...tourPlan];
    updatedTourPlan[dayIndex].sightseeing.push({
      name: "",
      location: "",
      places: "",
      duration: "",
      placesCovered: 0,
      image: "",
    });
    setTourPlan(updatedTourPlan);
    console.log(tourPlan);
  };

  const handleHotelChange = (dayIndex, hotelIndex, field, value) => {
    const updatedTourPlan = [...tourPlan];
    updatedTourPlan[dayIndex].hotels[hotelIndex][field] = value;
    setTourPlan(updatedTourPlan);
    console.log(tourPlan);
  };

  const handleAddHotel = (dayIndex) => {
    const updatedTourPlan = [...tourPlan];
    updatedTourPlan[dayIndex].hotels.push({
      timming: "",
      name: "",
      ratings: "",
      location: "",
      stayDate: "",
      image: "",
    });
    setTourPlan(updatedTourPlan);
    console.log(tourPlan);
  };

  const handleCarImageChange = (dayIndex, carIndex, file) => {
    setTourPlan((prevTourPlan) => {
      const updatedTourPlan = [...prevTourPlan];
      updatedTourPlan[dayIndex].car[carIndex].image = file;
      return updatedTourPlan;
    });
    console.log(tourPlan);
  };

  const handleSightseeingImageChange = (dayIndex, sightIndex, file) => {
    setTourPlan((prevTourPlan) => {
      const updatedTourPlan = [...prevTourPlan];
      updatedTourPlan[dayIndex].sightseeing[sightIndex].image = file;
      return updatedTourPlan;
    });
    console.log(tourPlan);
  };

  const handleHotelImageChange = (dayIndex, hotelIndex, file) => {
    setTourPlan((prevTourPlan) => {
      const updatedTourPlan = [...prevTourPlan];
      updatedTourPlan[dayIndex].hotels[hotelIndex].image = file;
      return updatedTourPlan;
    });
    console.log(tourPlan);
  };

  const handleRemoveCar = (dayIndex, carIndex) => {
    const updatedTourPlan = [...tourPlan];
    updatedTourPlan[dayIndex].car.splice(carIndex, 1);
    setTourPlan(updatedTourPlan);
    console.log(tourPlan);
  };

  const handleRemoveSightseeing = (dayIndex, sightIndex) => {
    const updatedTourPlan = [...tourPlan];
    updatedTourPlan[dayIndex].sightseeing.splice(sightIndex, 1);
    setTourPlan(updatedTourPlan);
    console.log(tourPlan);
  };

  const handleRemoveHotel = (dayIndex, hotelIndex) => {
    const updatedTourPlan = [...tourPlan];
    updatedTourPlan[dayIndex].hotels.splice(hotelIndex, 1);
    setTourPlan(updatedTourPlan);
    console.log(tourPlan);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imagePath = image;

      if (typeof image === "object") {
        const formData = new FormData();
        formData.append("image", image);

        const uploadResponse = await axios.post(`${backendUrl}/api/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        imagePath = uploadResponse.data.imagePath;
      }

      const photoPaths = await Promise.all(
        photoFiles.map(async (photoFile, index) => {
          if (typeof photoFile === "object") {
            const formData = new FormData();
            formData.append("image", photoFile);

            const uploadResponse = await axios.post(`${backendUrl}/api/upload`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              withCredentials: true,
            });

            photoFiles[index] = uploadResponse.data.imagePath;
          }
          return photoFiles[index]; // Return the updated path
        })
      );

      // Upload car images
      await Promise.all(
        tourPlan.map(async (plan, index1) => {
          await Promise.all(
            plan.car.map(async (car, index2) => {
              if (typeof car.image === "object") {
                const formData = new FormData();
                formData.append("image", car.image);

                const uploadResponse = await axios.post(
                  `${backendUrl}/api/upload`,
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                  }
                );

                const carImagePath = uploadResponse.data.imagePath;
                tourPlan[index1].car[index2].image = carImagePath;
              }
            })
          );
        })
      );

      // Upload sightseeing images
      await Promise.all(
        tourPlan.map(async (plan, index1) => {
          await Promise.all(
            plan.sightseeing.map(async (sightseeing, index2) => {
              if (typeof sightseeing.image === "object") {
                const formData = new FormData();
                formData.append("image", sightseeing.image);

                const uploadResponse = await axios.post(
                  `${backendUrl}/api/upload`,
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                  }
                );

                const sightseeingImagePath = uploadResponse.data.imagePath;
                tourPlan[index1].sightseeing[index2].image =
                  sightseeingImagePath;
              }
            })
          );
        })
      );

      // Upload hotel images
      await Promise.all(
        tourPlan.map(async (plan, index1) => {
          await Promise.all(
            plan.hotels.map(async (hotel, index2) => {
              if (typeof hotel.image === "object") {
                const formData = new FormData();
                formData.append("image", hotel.image);

                const uploadResponse = await axios.post(
                `${backendUrl}/api/upload`,
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                  }
                );

                const hotelImagePath = uploadResponse.data.imagePath;
                tourPlan[index1].hotels[index2].image = hotelImagePath;
              }
            })
          );
        })
      );

      const packageData = {
        name,
        type,
        description,
        image: imagePath,
        price,
        rating,
        reviews,
        location,
        duration,
        photos: photoFiles,
        inclusions,
        tourPlan,
        availableFrom,
        availableTill,
        featured,
      };

      console.log(photoFiles);

      await axios.put(`${backendUrl}/api/admin/tour/edit/${packageId}`, packageData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setError(null);
      toast.success("Package edited successfully");
    } catch (error) {
      console.error("Error updating package:", error);
      setError("Error updating package");
      toast.error("Error editing package");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="home-section flex flex-col items-center h-screen">
      <div className="bg-white m-5 rounded-sm md:w-4/5 w-full py-10 px-2 md:p-10 overflow-y-auto">
        <h1 className="text-[1.5rem] sm:text-3xl font-semibold">
          Edit Package
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="name">
              Package Name
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
            <label className="mb-2 font-medium" htmlFor="type">
              Package Type
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
            <label className="mb-2 font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="border border-gray-300 rounded-md p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="image">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              className="border border-gray-300 rounded-md p-2"
              //onChange={handleImageChange}
              onChange={(e) => setImage(e.target.files[0])}
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
            <label className="mb-2 font-medium" htmlFor="reviews">
              Reviews
            </label>
            <input
              type="number"
              id="reviews"
              className="border border-gray-300 rounded-md p-2"
              value={reviews}
              onChange={(e) => setReviews(parseInt(e.target.value, 10))}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="location">
              Location
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
            <label className="mb-2 font-medium" htmlFor="duration">
              Duration
            </label>
            <input
              type="text"
              id="duration"
              className="border border-gray-300 rounded-md p-2"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="availableFrom">
              Available From
            </label>
            <input
              type="date"
              id="availableFrom"
              className="border border-gray-300 rounded-md p-2"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="availableTill">
              Available Till
            </label>
            <input
              type="date"
              id="availableTill"
              className="border border-gray-300 rounded-md p-2"
              value={availableTill}
              onChange={(e) => setAvailableTill(e.target.value)}
              required
            />
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
            <label className="mb-2 font-medium" htmlFor="photos">
              Photos <span className="text-red-600">*</span>(You need to add all
              photos again)
            </label>
            <input
              type="file"
              id="photoInput"
              className="border border-gray-300 rounded-md p-2 mb-2"
              multiple
              onChange={handleAddPhoto}
            />
            <div className="space-y-2">
              {photos.map((photo, index) => (
                <div key={index} className="flex items-center justify-between">
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-16 h-16 object-cover"
                  />
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded-md p-2"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
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
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="tourPlan">
              Tour Plan
            </label>
            <button
              type="button"
              className="bg-blue-500 text-white rounded-md p-2 mb-2"
              onClick={handleAddTourPlan}
            >
              Add Day
            </button>
            <div className="space-y-4">
              {tourPlan.map((plan, dayIndex) => (
                <div key={dayIndex} className="border p-4 rounded-md space-y-4">
                  <h3 className="font-semibold">Day {plan.day}</h3>
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded-md p-2 mt-2"
                    onClick={() => handleRemoveDay(dayIndex)}
                  >
                    Remove Day
                  </button>
                  <h4 className="font-semibold">Day Description</h4>
                  <textarea
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={plan.description}
                    onChange={(e) =>
                      handleTourPlanChange(
                        dayIndex,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Enter day description"
                  ></textarea>
                  <div className="space-y-2">
                    <h4 className="font-medium">Cars</h4>
                    <button
                      type="button"
                      className="bg-blue-500 text-white rounded-md p-2 mb-2"
                      onClick={() => handleAddCar(dayIndex)}
                    >
                      Add Car
                    </button>
                    {plan.car.map((car, carIndex) => (
                      <div
                        key={carIndex}
                        className="border p-2 rounded-md space-y-2"
                      >
                        <h4 className="font-semibold">
                          Source and Destination
                        </h4>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          value={car.destination}
                          onChange={(e) =>
                            handleCarChange(
                              dayIndex,
                              carIndex,
                              "destination",
                              e.target.value
                            )
                          }
                          placeholder="Enter car destination"
                        />
                        <h4 className="font-semibold">Type</h4>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          value={car.type}
                          onChange={(e) =>
                            handleCarChange(
                              dayIndex,
                              carIndex,
                              "type",
                              e.target.value
                            )
                          }
                          placeholder="Enter car type"
                        />
                        <h4 className="font-semibold">Model</h4>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          value={car.model}
                          onChange={(e) =>
                            handleCarChange(
                              dayIndex,
                              carIndex,
                              "model",
                              e.target.value
                            )
                          }
                          placeholder="Enter car model"
                        />
                        <h4 className="font-semibold">Facilities</h4>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          value={car.facilities}
                          onChange={(e) =>
                            handleCarChange(
                              dayIndex,
                              carIndex,
                              "facilities",
                              e.target.value
                            )
                          }
                          placeholder="Enter car facilities"
                        />
                        <h4 className="font-semibold">Image</h4>
                        <input
                          type="file"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          onChange={(e) =>
                            handleCarImageChange(
                              dayIndex,
                              carIndex,
                              e.target.files[0]
                            )
                          }
                        />
                        <button
                          type="button"
                          className="bg-red-500 text-white rounded-md p-2 mt-2"
                          onClick={() => handleRemoveCar(dayIndex, carIndex)}
                        >
                          Remove Car
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Sightseeing</h4>
                    <button
                      type="button"
                      className="bg-blue-500 text-white rounded-md p-2 mb-2"
                      onClick={() => handleAddSightseeing(dayIndex)}
                    >
                      Add Sightseeing
                    </button>
                    {plan.sightseeing.map((sight, sightIndex) => (
                      <div
                        key={sightIndex}
                        className="border p-2 rounded-md space-y-2"
                      >
                        <h4 className="font-semibold">Name</h4>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          value={sight.name}
                          onChange={(e) =>
                            handleSightseeingChange(
                              dayIndex,
                              sightIndex,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="Enter sightseeing name"
                        />
                        <h4 className="font-semibold">Location</h4>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          value={sight.location}
                          onChange={(e) =>
                            handleSightseeingChange(
                              dayIndex,
                              sightIndex,
                              "location",
                              e.target.value
                            )
                          }
                          placeholder="Enter sightseeing location"
                        />
                        <h4 className="font-semibold">Places</h4>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          value={sight.places}
                          onChange={(e) =>
                            handleSightseeingChange(
                              dayIndex,
                              sightIndex,
                              "places",
                              e.target.value
                            )
                          }
                          placeholder="Enter sightseeing places"
                        />
                        <h4 className="font-semibold">Duration</h4>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          value={sight.duration}
                          onChange={(e) =>
                            handleSightseeingChange(
                              dayIndex,
                              sightIndex,
                              "duration",
                              e.target.value
                            )
                          }
                          placeholder="Enter sightseeing duration"
                        />
                        <h4 className="font-semibold">Places Covered</h4>
                        <input
                          type="number"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          value={sight.placesCovered}
                          onChange={(e) =>
                            handleSightseeingChange(
                              dayIndex,
                              sightIndex,
                              "placesCovered",
                              parseInt(e.target.value, 10)
                            )
                          }
                          placeholder="Enter number of places covered"
                        />
                        <h4 className="font-semibold">Image</h4>
                        <input
                          type="file"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          onChange={(e) =>
                            handleSightseeingImageChange(
                              dayIndex,
                              sightIndex,
                              e.target.files[0]
                            )
                          }
                        />
                        <button
                          type="button"
                          className="bg-red-500 text-white rounded-md p-2 mt-2"
                          onClick={() =>
                            handleRemoveSightseeing(dayIndex, sightIndex)
                          }
                        >
                          Remove Sightseeing
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Hotels</h4>
                    <button
                      type="button"
                      className="bg-blue-500 text-white rounded-md p-2 mb-2"
                      onClick={() => handleAddHotel(dayIndex)}
                    >
                      Add Hotel
                    </button>
                    {plan.hotels.map((hotel, hotelIndex) => (
                      <div
                        key={hotelIndex}
                        className="border p-2 rounded-md space-y-2"
                      >
                        <h4 className="font-semibold">Timing</h4>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          value={hotel.timming}
                          onChange={(e) =>
                            handleHotelChange(
                              dayIndex,
                              hotelIndex,
                              "timming",
                              e.target.value
                            )
                          }
                          placeholder="Enter hotel timing"
                        />
                        <h4 className="font-semibold">Name</h4>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          value={hotel.name}
                          onChange={(e) =>
                            handleHotelChange(
                              dayIndex,
                              hotelIndex,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="Enter hotel name"
                        />
                        <h4 className="font-semibold">Ratings</h4>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          value={hotel.ratings}
                          onChange={(e) =>
                            handleHotelChange(
                              dayIndex,
                              hotelIndex,
                              "ratings",
                              e.target.value
                            )
                          }
                          placeholder="Enter hotel ratings"
                        />{" "}
                        <h4 className="font-semibold">Location</h4>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          value={hotel.location}
                          onChange={(e) =>
                            handleHotelChange(
                              dayIndex,
                              hotelIndex,
                              "location",
                              e.target.value
                            )
                          }
                          placeholder="Enter hotel location"
                        />
                        <h4 className="font-semibold">StayDate</h4>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          value={hotel.stayDate}
                          onChange={(e) =>
                            handleHotelChange(
                              dayIndex,
                              hotelIndex,
                              "stayDate",
                              e.target.value
                            )
                          }
                          placeholder="Enter hotel stay date"
                        />
                        <h4 className="font-semibold">Image</h4>
                        <input
                          type="file"
                          className="border border-gray-300 rounded-md p-2 w-full"
                          onChange={(e) =>
                            handleHotelImageChange(
                              dayIndex,
                              hotelIndex,
                              e.target.files[0]
                            )
                          }
                        />
                        <button
                          type="button"
                          className="bg-red-500 text-white rounded-md p-2 mt-2"
                          onClick={() =>
                            handleRemoveHotel(dayIndex, hotelIndex)
                          }
                        >
                          Remove Hotel
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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

export default EditPackage;
