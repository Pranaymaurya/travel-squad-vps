import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddCab = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { cabId } = useParams();
  // State variables corresponding to the schema fields
  const [imageUrl, setImageUrl] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [seats, setSeats] = useState(0);
  const [kmsIncluded, setKmsIncluded] = useState(0);
  const [extraKmFare, setExtraKmFare] = useState(0);
  const [fuelType, setFuelType] = useState("");
  const [cancellation, setCancellation] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [travelType, setTravelType] = useState("");
  const [inclusions, setInclusions] = useState([]);
  const [inclusionInput, setInclusionInput] = useState("");
  const [exclusions, setExclusions] = useState([]);
  const [exclusionInput, setExclusionInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);


  const handleAddInclusion = () => {
    setInclusions([...inclusions, inclusionInput]);
    setInclusionInput("");
  };

  const handleRemoveInclusion = (index) => {
    const updatedInclusions = [...inclusions];
    updatedInclusions.splice(index, 1);
    setInclusions(updatedInclusions);
  };
  const handleAddExclusion = () => {
    setExclusions([...exclusions, exclusionInput]);
    setExclusionInput("");
  };

  const handleRemoveExclusion = (index) => {
    const updatedExclusions = [...exclusions];
    updatedExclusions.splice(index, 1);
    setExclusions(updatedExclusions);
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

      const cabData = {
        imageUrl: imagePath,
        model,
        type,
        seats,
        kmsIncluded,
        extraKmFare,
        fuelType,
        cancellation,
        rating,
        reviewCount,
        originalPrice,
        discountedPrice,
        taxes,
        travelType,
        inclusions,
        exclusions,
      };

      await axios.post(`${backendUrl}/api/admin/cab`, cabData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setError(null);
      toast.success("Cab added successfully");
    } catch (error) {
      console.error("Error adding cab:", error);
      setError("Error adding cab");
      toast.error("Error adding cab");
    }
  };

  const handleImageUrlChange = (e) => {
    const file = e.target.files[0];
    setImageUrl(file);

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
          Edit Cab
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="model">
              Cab Model
            </label>
            <input
              type="text"
              id="model"
              className="border border-gray-300 rounded-md p-2"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="type">
              Cab Type
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
            <label className="mb-2 font-medium" htmlFor="price">
              Seats
            </label>
            <input
              type="number"
              id="seats"
              className="border border-gray-300 rounded-md p-2"
              value={seats}
              onChange={(e) => setSeats(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="price">
              Kms Included
            </label>
            <input
              type="number"
              id="kmsIncluded"
              className="border border-gray-300 rounded-md p-2"
              value={kmsIncluded}
              onChange={(e) => setKmsIncluded(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="price">
              Extra Kms Fare
            </label>
            <input
              type="number"
              id="extraKmFare"
              className="border border-gray-300 rounded-md p-2"
              value={extraKmFare}
              onChange={(e) => setExtraKmFare(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="type">
              Fuel Type
            </label>
            <input
              type="text"
              id="fuelType"
              className="border border-gray-300 rounded-md p-2"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="type">
             Cancellation
            </label>
            <input
              type="text"
              id="cancellation"
              className="border border-gray-300 rounded-md p-2"
              value={cancellation}
              onChange={(e) => setCancellation(e.target.value)}
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
              Review Count
            </label>
            <input
              type="number"
              id="reviewCount"
              className="border border-gray-300 rounded-md p-2"
              value={reviewCount}
              onChange={(e) => setReviewCount(parseInt(e.target.value, 10))}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="price">
              Original Price
            </label>
            <input
              type="number"
              id="originalPrice"
              className="border border-gray-300 rounded-md p-2"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="price">
              Discounted Price
            </label>
            <input
              type="number"
              id="discountedPrice"
              className="border border-gray-300 rounded-md p-2"
              value={discountedPrice}
              onChange={(e) => setDiscountedPrice(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="price">
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
            <label className="mb-2 font-medium" htmlFor="type">
             Travel Type
            </label>
            <input
              type="text"
              id="travelType"
              className="border border-gray-300 rounded-md p-2"
              value={travelType}
              onChange={(e) => setTravelType(e.target.value)}
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
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="exclusions">
            Exclusions
            </label>
            <input
              type="text"
              id="exclusionInput"
              className="border border-gray-300 rounded-md p-2 mb-2"
              placeholder="Enter exclusion"
              value={exclusionInput}
              onChange={(e) => setExclusionInput(e.target.value)}
            />
            <button
              type="button"
              className="bg-blue-500 text-white rounded-md p-2 mb-2"
              onClick={handleAddExclusion}
            >
              Add Exclusion
            </button>
            <div className="space-y-2">
              {exclusions.map((exclusion, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p>{exclusion}</p>
                  <button
                    type="button"
                    className="bg-red-500 text-white rounded-md p-2"
                    onClick={() => handleRemoveExclusion(index)}
                  >
                    Remove
                  </button>
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

export default AddCab;
