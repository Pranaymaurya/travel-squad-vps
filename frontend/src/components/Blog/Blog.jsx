// import p2_tour from "../assets/tour2.jpg";
// import p3_tour from "../assets/tour3.jpg";
// import p4_tour from "../assets/tour4.jpg"; 

import { Link } from "react-router-dom";
// import blogData from "./data";
import {useEffect, useState} from "react";
import axios from "axios"


// export default tour_data; 
 
const Card = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <>
      <Link to={`/blog/${props.id}`}>
        <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 relative transform hover:scale-110 transition-transform duration-300 cursor-pointer">
          
          {/* {import.meta.env.VITE_NODE_ENV == "development" ? (
            <img
              className="w-full h-44 sm:h-56 object-cover"
              src={`${backendUrl}${props.image}`}
              alt={props.title}
            />
          ) : (
            <img
            className="w-full h-44 sm:h-56 object-cover"
            src={props.image}
            alt={props.title}
          />
          )} */}
           <img
              className="w-full h-44 sm:h-56 object-cover"
              src={`${backendUrl}${props.image}`}
              alt={props.title}
            />
          <div className="px-4 py-2 sm:px-6 sm:py-4">
            <div className="text-gray-900 ">{props.title} Days</div>
            <div className="font-bold text-xl mb-2  truncate">
              {props.description}
            </div>
            <div className="mb-2">
              <div
                className="text-gray-400 font-bold  py-1 px-1"
              >
                Read More
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

const Blog = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/blog`, { withCredentials: true});
        setBlogData(data);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }; 
    fetchBlogs();
  }, []);



  return (
    <div className="bg-gray-100">
      <div className="popular w-[90%] mx-auto p-4">
        <h1 className="text-2xl font-bold my-4 text-center">Blogs</h1>
        <hr className="my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.isArray(blogData) && blogData?.map((item, i) => {
            // console.log(item.id, i);
            return (
              <Card
                key={item._id}
                id={item._id}
                description={item.description}
                image={item.image}
                price={item.price}
                title={item.title}
                idd={item.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blog;
