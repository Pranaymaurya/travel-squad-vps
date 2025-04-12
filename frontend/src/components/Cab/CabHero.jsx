import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { HiFilter } from "react-icons/hi";
import vid from "../../assets/cab.mp4";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const CabHero = () => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    date: formatDate(new Date()),
    hours: String(new Date().getHours()).padStart(2, '0'),
    minutes: String(new Date().getMinutes()).padStart(2, '0'),
    sourceLocation: "",
    destLocation: "",
  });

  const [date, setDate] = useState(new Date());

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
  
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      queryParams.append(key, value);
    });
  
    navigate(`/c?${queryParams.toString()}`);
  };

  return (
    <div className="relative h-[700px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video 
          src={vid} 
          muted 
          autoPlay 
          loop 
          className="w-full h-full object-cover"
          type="video/mp4"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center h-full">
        <Card className="">
          <CardContent className="p-6 space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Search Your Cab
              </h1>
              <p className="text-muted-foreground">
                Find the perfect ride for your journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Source Location */}
              <div className="space-y-2">
                <Label>From Location</Label>
                <div className="relative">
                  <Input
                    id="sourceLocation"
                    placeholder="Enter source location"
                    value={formData.sourceLocation}
                    onChange={handleChange}
                    className="pl-10"
                  />
                  <GrLocation className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              {/* Destination Location */}
              <div className="space-y-2">
                <Label>To Location</Label>
                <div className="relative">
                  <Input
                    id="destLocation"
                    placeholder="Enter destination"
                    value={formData.destLocation}
                    onChange={handleChange}
                    className="pl-10"
                  />
                  <GrLocation className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              {/* Date Picker */}
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        setFormData(prev => ({
                          ...prev,
                          date: formatDate(selectedDate)
                        }));
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Input */}
              <div className="space-y-2">
                <Label>Time</Label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    id="hours"
                    placeholder="HH"
                    min="0"
                    max="23"
                    value={formData.hours}
                    onChange={handleChange}
                    className="w-1/2"
                  />
                  <Input
                    type="number"
                    id="minutes"
                    placeholder="MM"
                    min="0"
                    max="59"
                    value={formData.minutes}
                    onChange={handleChange}
                    className="w-1/2"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
            <div className="mt-6 flex justify-center">
  <button
    onClick={handleSearch}
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-l px-10 py-4 rounded-md transition duration-300 transform hover:scale-105 shadow-md"
  >
    SEARCH CABS
  </button>
</div>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CabHero;