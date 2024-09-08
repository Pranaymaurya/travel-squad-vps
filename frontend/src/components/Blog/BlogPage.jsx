import { useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BlogPage = () => {
  const p = useParams();

  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/blog/${p.id}` , { withCredentials: true});
        setBlogData(data);
      } catch (error) {
        console.error("Error fetching data:", error); 
      }
    };
    fetchBlogs();
  }, []);

  // const blogPost = blogData.find((post) => post._id === p.id);
  // console.log(blogPost);
  const blogPost = blogData;

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  //const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* {import.meta.env.VITE_NODE_ENV == "development" ? (
           <img
           src={`${backendUrl}${blogPost.image}`}
             alt={blogPost.title}
             className="w-full h-[400px] object-cover object-center"
           />
          ) : (
            <img
        src={blogPost.image}
          alt={blogPost.title}
          className="w-full h-[400px] object-cover object-center"
        />
          )} */}
        <img
          src={`${backendUrl}${blogPost.image}`}
          alt={blogPost.title}
          className="w-full h-[400px] object-cover object-center"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-2">{blogPost.title}</h2>
          <p className="text-gray-600 mb-2">By {blogPost.author}</p>
          <p className="text-gray-800">{blogPost.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
