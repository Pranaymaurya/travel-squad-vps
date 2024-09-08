import React, { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import allofferdata from "./AllOfferdata";
import "../Blog/AllBlog.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const OfferSection = ({ id, offer, index, onDelete }) => {

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
  <tr className="border-b border-black text-[0.675rem] sm:text-sm">
    <td className="p-[0.15rem] sm:p-1 md:p-2 ">{index}</td>
    <td className="p-[0.15rem] sm:p-1 md:p-2 ">{offer.title}</td>
    <td className="p-[0.15rem] sm:p-1 md:p-2 ">{offer.description}</td>
    <td className="p-[0.15rem] sm:p-1 md:p-2">{formatDate(offer.startDate)}</td>
    <td className="p-[0.15rem] sm:p-1 md:p-2">{formatDate(offer.endDate)}</td>
    <td className="p-[0.15rem] sm:p-1 md:p-2 ">{offer.relatedTo}</td>
    <td className="p-[0.15rem] sm:p-1 md:p-2 text-red-600">
      <Link to={`/admin/offer/edit/${id}`}>
        <i className="bx bx-edit"></i>
      </Link>
    </td>
    <td className="p-[0.15rem] sm:p-2 text-red-600 ">
      <button onClick={onDelete}>
        <i className="bx bx-trash"></i>
      </button>
    </td>
  </tr>

  )
};

const AllOffer = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/admin/offer/alloffer`,
          { withCredentials: true }
        );
        setOffers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/admin/offer/alloffer/${id}`, {
        withCredentials: true,
      });
      setOffers(offers.filter((offer) => offer._id !== id));
      toast.success("Offer deleted successfully.");
    } catch (error) {
      setError(error.message);
      toast.error("Error deleting offer.");
    }
  };

  let index = 1;

  return (
    <div className="home-section flex flex-col items-center justify-center h-screen">
      <div className="bg-white m-5 rounded-sm md:w-4/5 w-full py-10 px-2 md:p-10 overflow-y-auto">
        <h1 className="text-[1.5rem] sm:text-3xl font-semibold">All Offers</h1>
        {/* <p className="mb-3 text-[11px] sm:text-[16px]">
        Airtport Hotels The Right Way To Start A Short Break Holiday
        </p> */}
        <div className="overflow-x-auto">
          <table
            className="w-full border-separate"
            style={{ borderSpacing: "0 10px" }}
          >
            <thead>
              <tr>
                <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">
                  S.No
                </th>
                <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">
                  Title
                </th>
                <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">
                  Description
                </th>
                <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">
                  Start Date
                </th>
                <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">
                  End Date
                </th>
                <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">
                  Related To
                </th>
                <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">
                  Edit
                </th>
                <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <OfferSection
                  key={offer._id}
                  index={index++}
                  id={offer._id}
                  offer={offer}
                  onDelete={() => handleDelete(offer._id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllOffer;
