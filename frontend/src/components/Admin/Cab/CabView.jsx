import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Import shadcn components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ViewCab = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { cabId } = useParams();
  
  const [user, setUser] = useState(null);
  const [cab, setCab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/users/profile`, {
          withCredentials: true,
        });
        setUser(data);
      } catch (error) {
        console.error("User not authenticated", error);
        setUser(null);
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
          
          if (data) {
            setCab(data);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching cab:", error);
          setError("Error fetching cab data");
          setLoading(false);
        }
      }
    };

    if (user) {
      fetchCab();
    }
  }, [cabId, user, backendUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading cab details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded max-w-lg">
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!cab) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">No cab found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">{cab.model}</CardTitle>
              <CardDescription>{cab.type} | {cab.fuelType}</CardDescription>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              {cab.travelType}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Cab Image */}
          {cab.imageUrl && (
            <div className="mb-6">
              <img 
                src={`${backendUrl}${cab.imageUrl}`} 
                alt={cab.model} 
                className="w-full h-64 object-cover rounded-md"
              />
            </div>
          )}

          {/* Pricing Information */}
          <div className="bg-slate-50 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Original Price</p>
                <p className="font-semibold text-lg line-through">₹{cab.originalPrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Discounted Price</p>
                <p className="font-semibold text-lg text-green-600">₹{cab.discountedPrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Taxes</p>
                <p className="font-semibold text-lg">{cab.taxes}%</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Cab Details */}
          <div>
            <h3 className="text-lg font-medium mb-4">Cab Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Seats</span>
                  <span className="font-medium">{cab.seats}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Included KMs</span>
                  <span className="font-medium">{cab.kmsIncluded} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Extra KM Fare</span>
                  <span className="font-medium">₹{cab.extraKmFare}/km</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Fuel Type</span>
                  <span className="font-medium">{cab.fuelType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Cancellation</span>
                  <span className="font-medium">{cab.cancellation}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Rating</span>
                  <div className="flex items-center">
                    <span className="font-medium">{cab.rating.toFixed(1)}</span>
                    <span className="text-yellow-500 ml-1">★</span>
                    <span className="text-sm text-gray-500 ml-1">({cab.reviewCount})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Inclusions</h3>
              {cab.inclusions && cab.inclusions.length > 0 ? (
                <ul className="space-y-2">
                  {cab.inclusions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No inclusions specified</p>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Exclusions</h3>
              {cab.exclusions && cab.exclusions.length > 0 ? (
                <ul className="space-y-2">
                  {cab.exclusions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No exclusions specified</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewCab;