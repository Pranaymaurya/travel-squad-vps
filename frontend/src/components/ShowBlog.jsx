import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const BlogItem = ({ blog }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { _id, title, description, author, image } = blog;

  const dateObj = new Date(blog.createdAt);
  const date = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "short" });
  const year = dateObj.getFullYear();

  return (
    <article className="rounded-lg">
      <div className="relative">
        {/* {import.meta.env.VITE_NODE_ENV == "development" ? (
           <img
           src={`${backendUrl}${image}`}
           alt={title}
          className="h-64 w-full rounded-lg shadow-lg dark:shadow-none"
        />
        ) : (
          <img
           src={image}
           alt={title}
          className="h-64 w-full rounded-lg shadow-lg dark:shadow-none"
        />
        )} */}
         <img
           src={`${backendUrl}${image}`}
           alt={title}
          className="h-64 w-full rounded-lg shadow-lg dark:shadow-none"
        />

        <div className="absolute bottom-2 left-2 text-lg leading-6 px-6 py-3 font-black text-white bg-white dark:bg-slate-800 bg-opacity-80 dark:bg-opacity-80 rounded-lg">
          {date}
          <br />
          {month}
          <br />
          {year}
        </div>
      </div>
      <div className="p-3">
        <p className="font-light text-sm leading-6 mb-2">
          <a href="#!" className="text-blue-600">
            {author}
          </a>
        </p>
        <h4 className="font-medium text-2xl">{title}</h4>
        <p className="opacity-60 mt-3 mb-6">{description}</p>
        <a
          href={`/blog/${_id}`}
          className="bg-transparent hover:bg-blue-600 border border-blue-600 hover:text-white py-2 px-5 rounded transition"
        >
          Read More
        </a>
      </div>
    </article>
  );
};

BlogItem.propTypes = {  
  blog: PropTypes.object.isRequired,
};

const ShowBlog = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/blog`,{ withCredentials: true });
        setBlogData(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className=" py-14 md:py-24 text-stone-800 bg-gray-100  dark:text-black overflow-hidden">
      <div className=" border  flex flex-col justify-center items-center   px-2 md:px-8 xl:px-28 mx-">
        <div className="grid grid-cols- justify-center">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 lg:col-end-11 text-center">
            <h2 className="text-[32px] lg:text-[45px] leading-none font-bold mb-4 mt-4">
              Blogs
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-9 mt-12 gap-4  p-2   bg-gray-100 container  mx-auto">
          {Array.isArray(blogData) && blogData?.map((blog, i) => (
            blog.featured == true && (
            <div
              className="col-span-12 md:col-span-6  bg-gry-100 rounded-lg lg:col-span-3 mb- border"
              key={i}
            >
              <BlogItem blog={blog} />
            </div>
            )
            
          ))}
        </div>

        <div className="text-center mt-14 mb-8">
          <a
            href="/blog"
            className="bg-blue-600 hover:bg-opacity-90 text-white font-bold border border-blue-600 py-3 px-7 rounded transition "
          >
            Load All Posts
          </a>
        </div>
      </div>
    </section>
  );
};

export default ShowBlog;
