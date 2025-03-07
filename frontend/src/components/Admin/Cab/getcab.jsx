import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// Import shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const GetCab = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { cabId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
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
  const [id, setid] = useState(null);
  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/users/profile`, {
          withCredentials: true,
        });
        console.log(data)
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("User not authenticated", error);
        setUser(null);
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [backendUrl]);

  // Fetch cab data
  useEffect(() => {
    const fetchCab = async () => {
      if (user) {
        try {
          const { data } = await axios.get(`${backendUrl}/api/cab/user/${user._id}`, {
            withCredentials: true
          });
          console.log(data)
          if (data) {
            setid(data._id)
            setImageUrl(data.imageUrl);
            setModel(data.model);
            setType(data.type);
            setSeats(data.seats);
            setKmsIncluded(data.kmsIncluded);
            setExtraKmFare(data.extraKmFare);
            setFuelType(data.fuelType);
            setCancellation(data.cancellation);
            setRating(data.rating);
            setReviewCount(data.reviewCount);
            setOriginalPrice(data.originalPrice);
            setDiscountedPrice(data.discountedPrice);
            setTaxes(data.taxes);
            setTravelType(data.travelType);
            setInclusions(data.inclusions);
            setExclusions(data.exclusions);
            setImagePreview(`${backendUrl}${data.imageUrl}`);
          }
        } catch (error) {
          console.error("Error fetching cab:", error);
          setError("Error fetching cab data");
        }
      }
    };

    if (user) {
      fetchCab();
    }
  }, [cabId, user, backendUrl]);

  const handleAddInclusion = () => {
    if (inclusionInput.trim()) {
      setInclusions([...inclusions, inclusionInput]);
      setInclusionInput("");
    }
  };

  const handleRemoveInclusion = (index) => {
    const updatedInclusions = [...inclusions];
    updatedInclusions.splice(index, 1);
    setInclusions(updatedInclusions);
  };

  const handleAddExclusion = () => {
    if (exclusionInput.trim()) {
      setExclusions([...exclusions, exclusionInput]);
      setExclusionInput("");
    }
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
        id,
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

      await axios.put(`${backendUrl}/api/admin/cab/edit/${id}`, cabData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setError(null);
      toast.success("Cab edited successfully");
    } catch (error) {
      console.error("Error updating cab:", error);
      setError("Error updating cab");
      toast.error("Error editing cab");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageUrl(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">Please login to access this page</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Cab</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="model">Cab Model</Label>
                  <Input
                    id="model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Cab Type</Label>
                  <Input
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Cab Image</Label>
                <Input
                  id="image"
                  type="file"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Cab preview"
                      className="w-full max-w-sm rounded-md"
                    />
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="seats">Seats</Label>
                  <Input
                    id="seats"
                    type="number"
                    value={seats}
                    onChange={(e) => setSeats(parseFloat(e.target.value))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kmsIncluded">KMs Included</Label>
                  <Input
                    id="kmsIncluded"
                    type="number"
                    value={kmsIncluded}
                    onChange={(e) => setKmsIncluded(parseFloat(e.target.value))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="extraKmFare">Extra KM Fare</Label>
                  <Input
                    id="extraKmFare"
                    type="number"
                    value={extraKmFare}
                    onChange={(e) => setExtraKmFare(parseFloat(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fuelType">Fuel Type</Label>
                  <Input
                    id="fuelType"
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cancellation">Cancellation Policy</Label>
                  <Input
                    id="cancellation"
                    value={cancellation}
                    onChange={(e) => setCancellation(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (0-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(parseFloat(e.target.value))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reviewCount">Review Count</Label>
                  <Input
                    id="reviewCount"
                    type="number"
                    min="0"
                    value={reviewCount}
                    onChange={(e) => setReviewCount(parseInt(e.target.value, 10))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="travelType">Travel Type</Label>
                  <Input
                    id="travelType"
                    value={travelType}
                    onChange={(e) => setTravelType(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    min="0"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(parseFloat(e.target.value))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountedPrice">Discounted Price</Label>
                  <Input
                    id="discountedPrice"
                    type="number"
                    min="0"
                    value={discountedPrice}
                    onChange={(e) => setDiscountedPrice(parseFloat(e.target.value))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxes">Taxes (%)</Label>
                  <Input
                    id="taxes"
                    type="number"
                    min="0"
                    value={taxes}
                    onChange={(e) => setTaxes(parseFloat(e.target.value))}
                    required
                  />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="inclusions">Inclusions</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="inclusionInput"
                      placeholder="Enter inclusion"
                      value={inclusionInput}
                      onChange={(e) => setInclusionInput(e.target.value)}
                    />
                    <Button 
                      type="button" 
                      onClick={handleAddInclusion}
                      variant="secondary"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {inclusions.map((inclusion, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="flex items-center gap-1 px-3 py-1"
                      >
                        {inclusion}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveInclusion(index)}
                        >
                          ×
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exclusions">Exclusions</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="exclusionInput"
                      placeholder="Enter exclusion"
                      value={exclusionInput}
                      onChange={(e) => setExclusionInput(e.target.value)}
                    />
                    <Button 
                      type="button" 
                      onClick={handleAddExclusion}
                      variant="secondary"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exclusions.map((exclusion, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="flex items-center gap-1 px-3 py-1"
                      >
                        {exclusion}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveExclusion(index)}
                        >
                          ×
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button type="submit" className="w-full md:w-auto">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GetCab;