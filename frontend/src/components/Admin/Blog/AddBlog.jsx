import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button'; // ShadCN Button
import { Input } from '@/components/ui/input'; // ShadCN Input
import { Textarea } from '@/components/ui/textarea'; // ShadCN Textarea
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // ShadCN Select

const AddBlog = () => {
  const [postName, setPostName] = useState('');
  const [blogBanner, setBlogBanner] = useState(null);
  const [blogDescription, setBlogDescription] = useState('');
  const [category, setCategory] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [error, setError] = useState(null);
  const [featured, setFeatured] = useState(false);

  const handleSubmit = async (e) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    e.preventDefault();

    try {
      // Step 1: Upload the image
      const formData = new FormData();
      formData.append('image', blogBanner);

      const uploadResponse = await axios.post(`${backendUrl}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, 
      });

      const imagePath = uploadResponse.data.imagePath;

      // Step 2: Create the blog post with the uploaded image path
      const blogData = {
        title: postName,
        description: blogDescription,
        category,
        author: authorName,
        imagePath,
        featured
      };

      const response = await axios.post(`${backendUrl}/api/admin/blog/addBlog`, blogData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      // Reset form fields after successful submission
      setPostName('');
      setBlogBanner(null);
      setBlogDescription('');
      setCategory('');
      setAuthorName('');
      setError(null);
      // Display success message, you can integrate ShadCN's toast or a simple alert for this.
      alert('Blog added successfully!');
    } catch (error) {
      console.error('Error adding blog:', error); 
      setError('Error adding blog');
      alert('Error adding blog');
    }
  };

  return (
    <div className="home-section flex flex-col items-center h-screen">
      <div className="bg-white m-5 rounded-sm md:w-4/5 w-full py-10 px-2 md:p-10 overflow-y-auto">
        <h1 className="text-[1.5rem] sm:text-3xl font-semibold">Add Blog</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Blog Name */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="postName">Blog Name</label>
            <Input
              id="postName"
              type="text"
              value={postName}
              onChange={(e) => setPostName(e.target.value)}
              required
            />
          </div>

          {/* Blog Banner Upload */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="blogBanner">Upload Blog Banner</label>
            <Input
              id="blogBanner"
              type="file"
              onChange={(e) => setBlogBanner(e.target.files[0])}
              required
            />
          </div>

          {/* Blog Description */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="blogDescription">Blog Description</label>
            <Textarea
              id="blogDescription"
              value={blogDescription}
              onChange={(e) => setBlogDescription(e.target.value)}
              required
            />
          </div>

          {/* Category Selection */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="category">Select Category</label>
            <Select
              value={category}
              onValueChange={setCategory}
              required
            >
              <SelectTrigger className="border border-gray-300 rounded-md p-2">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="tour">Tour</SelectItem>
                <SelectItem value="cabs">Cabs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Featured Checkbox */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="featured">
              Featured
            </label>
            <input
              type="checkbox"
              id="featured"
              className="border border-gray-300 rounded-md p-2 mr-auto"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
          </div>

          {/* Author Name */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="authorName">Author Name</label>
            <Input
              id="authorName"
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
