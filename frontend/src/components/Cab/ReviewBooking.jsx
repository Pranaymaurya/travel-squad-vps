import React, { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import data from "./ReviewData";// assuming the JSON file is in the same directory
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import BookingConfirmationModal from "./BookingConformational";
import PreBookingConfirmationDialog from "./confirmdailog";

const ReviewBooking = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const location = useLocation();
  const initialFilters = location.state || {
    date: formatDate(new Date()),
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    sourceLocation: "",
    destLocation: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  console.log(filters)

  const [usePickupAsBilling, setUsePickupAsBilling] = useState(false);
  const [pickupAddress, setPickupAddress] = useState("");
  const [pickuptime, setPickuptime] = useState("")
  const [dropofftime, setDropofftime] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [paymentType, setPaymentType] = useState("full");
  const [couponCode, setCouponCode] = useState("");
  const [amount, setAmount] = useState(data[0].paymentAmount); // using the amount from JSON
  const halfAmount = amount / 2;
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [bookingConfirmationDetails, setBookingConfirmationDetails] = useState({});
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [bookingDetailsForConfirmation, setBookingDetailsForConfirmation] = useState({});
  
  // New state for manual tax option
  const [useManualTax, setUseManualTax] = useState(false);
  const [taxRate, setTaxRate] = useState(10); // Default tax rate

  const handleCheckboxChange = () => {
    setUsePickupAsBilling(!usePickupAsBilling);
  }; 

  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
  };

  const handleManualTaxChange = () => {
    setUseManualTax(!useManualTax);
  };

  const handleTaxRateChange = (e) => {
    setTaxRate(parseFloat(e.target.value) || 0);
  };

  const [cabData, setCabData] = useState({});
  const p = useParams();

  useEffect(() => {
    const fetchCabData = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/cab/${p.id}`, { withCredentials: true});
        setCabData(data);
        
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };
    fetchCabData();
  }, [p.id]);

  // Calculate tax amount based on cab price and tax rate
  const baseAmount = cabData.discountedPrice || 0;
  const calculatedTaxRate = taxRate
  const taxAmount = (baseAmount * calculatedTaxRate) / 100;
  const totalWithTax = baseAmount + taxAmount;
console.log(totalWithTax)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare booking details for confirmation
    const confirmationDetails = {
      cabModel: cabData.model,
      pickupLocation: pickupAddress,
      dropoffLocation: dropoffAddress,
      pickupTime: pickuptime,
      totalAmount: totalWithTax
    };

    // Open confirmation dialog instead of directly submitting
    setBookingDetailsForConfirmation(confirmationDetails);
    setIsConfirmationDialogOpen(true);
  };

  const handleConfirmBooking = async () => {
    const bookingData = {
      pickupLocation: pickupAddress,
      dropoffLocation: dropoffAddress,
      pickupTime: pickuptime,
      dropoffTime: dropofftime,
      amount: totalWithTax,
      cab: p.id,
      // taxRate: useManualTax ? taxRate : undefined, // Only send taxRate if manual tax is enabled
    };

    try {
      const response = await axios.post(`${backendUrl}/api/cab/booking/create`, bookingData, { withCredentials: true });
      setIsConfirmationDialogOpen(false);
      console.log("Booking successful:", response.data);
      setBookingConfirmationDetails({
        bookingId: response.data._id,
        cabModel: cabData.model,
        pickupLocation: pickupAddress,
        pickupTime: pickuptime,
        totalAmount: totalWithTax
      });

      // Open the confirmation modal
      setIsConfirmationModalOpen(true);
    } catch (error) {
      console.error("Error sending booking data:", error);
      // Handle error (e.g., show error message)
    }
  };

  const {
    date,
    hours,
    minutes,
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
    inclusions=[],
    exclusions=[],
  } = cabData;

  return (
    <>
      <div className="w-full h-fit bg-sky-950 text-white">
        <div className="pt-5 pb-5 pl-[3rem] md:px-[7rem]">
          <h3 className="text-2xl font-semibold mb-3">Review Booking</h3>
          <p>
            {filters.sourceLocation}{" "}
            <i className="bx bx-arrow-back bx-flip-horizontal"></i>{" "}
            {filters.destLocation}
          </p>
          <p>
            {cabData.travelType} | Pickup:{" "}
            {filters.date}, {filters.hours} : {filters.minutes}
          </p>
        </div>
      </div>
      <div className="content flex flex-col md:flex-row pt-5 pb-5 px-[3rem] md:px-[7rem] relative">
        <div className="right-side md:w-2/3 pr-5">
          <div className="car-details flex items-center gap-10 border border-slate-400 rounded-md p-4 mb-4">
            <img
              src="https://jsak.mmtcdn.com/cabs_cdn_dt/image/Cab_Images/sedan_new.png"
              alt=""
            />
            <div className="car-content">
              <h3 className=" text-2xl font-bold">{cabData.model}</h3>
              {/* <h5>{data[0].carDetails.features.spaciousCar}</h5> */}
              <p className="pl-2 pb-2 text-sm ">
              AC,{" "}
                {cabData.seats} seats,{" "}
                {cabData.kmsIncluded} kms
              </p>
              <li>Extra km fare: &#8377;{cabData.extraKmFare}/km after   {cabData.kmsIncluded} kms</li>
              <li>Fuel Type: {cabData.fuelType}</li>
              <li>Cancellation Free: {cabData.cancellation}</li>
            </div>
          </div>
          <div className="my-3 border border-slate-400 rounded-md p-4">
            <h4 className="text-lg font-semibold">Driver & Cab details</h4>
            <p>
              Cab operator will be assigned on booking completion. Cab and
              driver details will be shared up to 30 mins prior to departure.
            </p>
            <div className="cng-details bg-orange-200 p-5 m-2 rounded">
              <p>Some points to note for CNG vehicles before your travel:</p>
              <ul className="list-disc list-inside">
                <li>
                  On longer journeys refill breaks are required which typically
                  last 30+ minutes because of fewer stations and longer queues.
                </li>
                <li>
                  Diesel cabs have stronger ACs as compared to CNG vehicles.
                </li>
              </ul>
            </div>
          </div>
          <div className="flex border border-slate-400 rounded-md p-4 mb-4">
            <div className="inclusion w-1/2 pr-2">
              <h4 className="text-lg font-semibold">Inclusion</h4>
              <ul>
                {Array.isArray(inclusions) && inclusions.map((item, index) => (
                  <li key={index}>
                    <i className="bx bx-check text-green-500"></i> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-0.5 bg-gray-300"></div> {/* Divider */}
            <div className="exclusion w-1/2 pl-2">
              <h4 className="text-lg font-semibold">Exclusion</h4>
              <ul>
                {Array.isArray(exclusions) && exclusions.map((item, index) => (
                  <li key={index}>
                    <i className="bx bx-x text-red-500"></i> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border border-slate-400 rounded-md p-4 mb-4">
            <h4 className="text-lg font-semibold mb-4">Trip Details</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Pick-up Address</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Drop-off Address</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={dropoffAddress}
                  onChange={(e) => setDropoffAddress(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Pick-up Time</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={pickuptime}
                  onChange={(e) => setPickuptime(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Drop-off Time</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={dropofftime}
                  onChange={(e) => setDropofftime(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="checkbox"
                  id="billing-address"
                  className="mr-2"
                  checked={usePickupAsBilling}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="billing-address">
                  Use pickup location as billing address
                </label>
              </div>
              
              {/* Manual Tax Option */}
              <div className="mb-4 border-t pt-4">
                {/* <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="manual-tax"
                    className="mr-2"
                    checked={useManualTax}
                    onChange={handleManualTaxChange}
                  />
                  <label htmlFor="manual-tax" className="font-medium">
                    Set manual tax rate
                  </label>
                </div> */}
                
                {useManualTax && (
                  <div className="ml-6 mt-2">
                    <label className="block mb-2">Tax Rate (%)</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={taxRate}
                      onChange={handleTaxRateChange}
                      min="0"
                      step="0.1"
                    />
                  </div>
                )}
                
                <div className="mt-4 bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Price Breakdown</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Base Amount:</span>
                      <span>₹ {baseAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax ({calculatedTaxRate}%):</span>
                      <span>₹ {taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-1 mt-1">
                      <span>Total Amount:</span>
                      <span>₹ {totalWithTax.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <button type="submit" className="text-lg font-semibold bg-sky-950 hover:bg-sky-700 text-white rounded p-3 w-full">
                  Book Now - ₹ {totalWithTax.toFixed(2)}
                </button>
              </div>
            </form>
          </div>
          <div className="border border-slate-400 rounded-md p-4 mb-4">
            <div>
              <p className="text-xl font-semibold mb-7">
                Read before you book!
              </p>
              <ul className="columns-2 gap-12">
                <li className="mb-5">
                  <p className="text-lg font-semibold">Cab Category</p>
                  <p className="text-sm pt-5">
                    The booking will be for cab type SEDAN and we do not commit
                    on providing the preferred cab model (Dzire, Etios or
                    similar).
                  </p>
                </li>
                <li className="mb-5">
                  <p className="text-lg font-semibold">Hilly Regions</p>
                  <p className="text-sm pt-5">
                    AC will be switched off in hilly areas.
                  </p>
                </li>
                <li className="mb-5">
                  <p className="text-lg font-semibold">Luggage Policy</p>
                  <p className="text-sm pt-5">
                    SEDAN has space for 1 luggage bag. However, depending on the
                    number of passengers, luggage can be adjusted in the seating
                    area with driver consent.
                  </p>
                </li>
                <li className="mb-5">
                  <p className="text-lg font-semibold">Driver Details</p>
                  <p className="text-sm pt-5">
                    Driver details will be shared up to 30 mins prior to
                    departure. In case the driver/cab that reaches you for
                    pick-up is different from what we have communicated, please
                    don't board the cab and call us for assistance.
                  </p>
                </li>
                <li className="mb-5">
                  <p className="text-lg font-semibold">Stops</p>
                  <p className="text-sm pt-5">
                    This is a point-to-point booking and only one stop for meals
                    is included.
                  </p>
                </li>
                <li className="mb-5">
                  <p className="text-lg font-semibold">Delays</p>
                  <p className="text-sm pt-5">
                    Due to traffic or any other unavoidable reason, pickup may
                    be delayed by 30 mins.
                  </p>
                </li>
                <li className="mb-5">
                  <p className="text-lg font-semibold">Receipts</p>
                  <p className="text-sm pt-5">
                    You need to collect receipts from the driver for any extra
                    charges paid directly to the driver during the trip. MMT is
                    not liable to provide invoices for such amounts.
                  </p>
                </li>
                <li className="mb-5">
                  <p className="text-lg font-semibold">Refueling Policy</p>
                  <p className="text-sm pt-5">
                    In case of a CNG refill stop, the average turnaround time
                    will be 30+ mins due to fewer stations and long queues.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="left-side md:w-1/3">
          <div className="sticky top-5">
            <div className="border border-slate-400 rounded-md p-4 mb-4">
              <h4 className="text-lg font-semibold mb-4">Payment</h4>
              <div className="mb-4">
                <input
                  type="radio"
                  id="half-payment"
                  name="payment"
                  className="mr-2"
                  checked={paymentType === "half"}
                  onChange={() => handlePaymentTypeChange("half")}
                />
                <label htmlFor="half-payment">
                  Make part payment now, pay the rest to the driver
                </label>
              </div>
              <div className="mb-4">
                <input
                  type="radio"
                  id="full-payment"
                  name="payment"
                  className="mr-2"
                  checked={paymentType === "full"}
                  onChange={() => handlePaymentTypeChange("full")}
                />
                <label htmlFor="full-payment">Make full payment now</label>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Coupon Code</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <button className="text-lg font-semibold bg-sky-950 hover:bg-sky-700 text-white rounded p-3 w-full">
                  Amount: ₹ {totalWithTax.toFixed(2)}
                </button>
              </div>
              <div className="text-green-600">
                Free cancellation till 24 hours of departure
              </div>
            </div>
            <BookingConfirmationModal 
              isOpen={isConfirmationModalOpen}
              onClose={() => setIsConfirmationModalOpen(false)}
              bookingDetails={bookingConfirmationDetails}
            />
            <PreBookingConfirmationDialog 
              isOpen={isConfirmationDialogOpen}
              onClose={() => setIsConfirmationDialogOpen(false)}
              onConfirm={handleConfirmBooking}
              bookingDetails={bookingDetailsForConfirmation}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewBooking;