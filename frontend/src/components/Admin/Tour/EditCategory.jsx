// // import React from 'react'

// // const EditCategory = () => {
// //   return (
// //     <div>EditCategory</div>
// //   )
// // }

// // export default EditCategory

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// // import { toast } from "react-toastify";

// const EditCategory = () => {
//   const { categoryId } = useParams();
//   const [postName, setPostName] = useState("");
//   const [blogBanner, setBlogBanner] = useState(null);
//   const [blogDescription, setBlogDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [authorName, setAuthorName] = useState("");
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       if (blogId) {
//         try {
//           const { data } = await axios.get(`/api/admin/blog/${blogId}`);
//           setPostName(data.title);
//           setBlogDescription(data.description);
//           setCategory(data.category);
//           setAuthorName(data.author);
//           setBlogBanner(data.image);

//           // Assuming the API returns the image path as part of the blog data
//         } catch (error) {
//           console.error("Error fetching blog:", error);
//         }
//       }
//     };

//     fetchBlog();
//   }, [blogId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let imagePath = blogBanner;

//       // Step 1: Upload the image if a new one is selected
//       if (typeof blogBanner === "object") {
//         const formData = new FormData();
//         formData.append("image", blogBanner);

//         // Log the FormData content
//         console.log("FormData before sending:", formData.get("image"));

//         const uploadResponse = await axios.post("/api/upload", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         // Log the upload response
//         console.log("Upload response:", uploadResponse.data);

//         imagePath = uploadResponse.data.imagePath; // Ensure this matches the server response structure
//       }

//       // Step 2: Update the blog post with the uploaded image path
//       const blogData = {
//         title: postName,
//         description: blogDescription,
//         category,
//         author: authorName,
//         image: imagePath,
//       };

//       await axios.put(`/api/admin/blog/${blogId}`, blogData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       setError(null);
//       toast.success("Blog edited successfully");
//     } catch (error) {
//       console.error("Error updating blog:", error);
//       setError("Error updating blog");
//       toast.error("Error editing blog");
//     }
//   };

//   return (
//     <div className="home-section flex flex-col items-center h-screen">
//       <div className="bg-white m-5 rounded-sm md:w-4/5 w-full py-10 px-2 md:p-10 overflow-y-auto">
//         <h1 className="text-[1.5rem] sm:text-3xl font-semibold">Edit Blog</h1>
//         <p className="mb-3 text-[11px] sm:text-[16px]">

//         </p>
//         {error && <p className="text-red-500">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex flex-col">
//             <label className="mb-2 font-medium" htmlFor="postName">
//               Blog Name
//             </label>
//             <input
//               type="text"
//               id="postName"
//               className="border border-gray-300 rounded-md p-2"
//               value={postName}
//               onChange={(e) => setPostName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="mb-2 font-medium" htmlFor="blogBanner">
//               Upload Blog Banner
//             </label>
//             <input
//               type="file"
//               id="blogBanner"
//               className="border border-gray-300 rounded-md p-2"
//               onChange={(e) => setBlogBanner(e.target.files[0])}
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="mb-2 font-medium" htmlFor="blogDescription">
//               Blog Description
//             </label>
//             <textarea
//               id="blogDescription"
//               className="border border-gray-300 rounded-md p-2"
//               value={blogDescription}
//               onChange={(e) => setBlogDescription(e.target.value)}
//               required
//             ></textarea>
//           </div>
//           <div className="flex flex-col">
//             <label className="mb-2 font-medium" htmlFor="category">
//               Select Category
//             </label>
//             <select
//               id="category"
//               className="border border-gray-300 rounded-md p-2"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//             >
//               <option value="">Select a category</option>
//               <option value="hotel">Hotel</option>
//               <option value="tour">Tour</option>
//               <option value="cabs">Cabs</option>
//             </select>
//           </div>
//           <div className="flex flex-col">
//             <label className="mb-2 font-medium" htmlFor="authorName">
//               Author Name
//             </label>
//             <input
//               type="text"
//               id="authorName"
//               className="border border-gray-300 rounded-md p-2"
//               value={authorName}
//               onChange={(e) => setAuthorName(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
//           >
//             Update
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditCategory;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditCategory = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { categoryId } = useParams();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (categoryId) {
        try {
          const { data } = await axios.get(
            `${backendUrl}/api/admin/tour/category/${categoryId}`,  {withCredentials: true}
          );
          setCategory(data.category);
          setDescription(data.description);
          
        } catch (error) {
          console.error("Error fetching category:", error);
          setError("Error fetching category data");
          
        }
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const categoryData = {
        category,
        description,
      };

      const response = await axios.put(
        `${backendUrl}/api/admin/tour/category/${categoryId}`,
        categoryData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // console.log(response);

      setError(null);
      // toast.success("Category updated successfully");
      toast.success("Category edited successfully.")
    } catch (error) {
      console.error("Error updating category:", error);
      setError("Error updating category");
      // toast.error("Error updating category");
      toast.error("Error editing category.")
    }
  };

  return (
    <div className="home-section flex flex-col items-center h-screen">
      <div className="bg-white m-5 rounded-sm md:w-4/5 w-full py-10 px-2 md:p-10 overflow-y-auto">
        <h1 className="text-[1.5rem] sm:text-3xl font-semibold">
          Edit Category
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="categoryName">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              className="border border-gray-300 rounded-md p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
