import "./index.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Hotelview from "./components/Hotel/Hotelview";

// import Hero from "./components/Hero";
// import WhyChooseUs from "./components/Whyus";
import Footer from "./components/Footer";
// import Testimonial from "./components/Testimonial";
// import Services from "./components/Services";
// import Recommendation_tour from "./components/Recommendation_tour";
// import Recommendation_hotel from "./components/Recommendation_hotel";
// import Blog from "./components/Blog/Blog";
import Home from "./components/Home/Home";
import Blog from "./components/Blog/Blog";
// // import { BrowserRouter as Route, Router, Switch } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlogPage from "./components/Blog/BlogPage";
import blogData from "./components/Blog/data";
import Tour from "./components/Tour/Tour";
import Ptour from "./components/Tour/Ptour";
import data from "./components/Tour/TourData";
import Hotel from "./components/Hotel/Hotel";
import Photel from "./components/Hotel/Photel";
import Cab from "./components/Cab/Cab";
import Dashboard from "./components/Admin/Dashboard";
import DNavbar from "./components/Admin/DNavbar";
import Sidebar from "./components/Admin/Sidebar";
import AllBlog from "./components/Admin/Blog/AllBlog";
import AddBlog from "./components/Admin/Blog/AddBlog";
import AllTour from "./components/Admin/Tour/AllTour";
import AllHotel from "./components/Admin/Hotel/AllHotel";
import AllUser from "./components/Admin/User/AllUser";
import AllOffer from "./components/Admin/Offer/AllOffer";
import AddTour from "./components/Admin/Tour/AddTour";
import AddPackageCategory from "./components/Admin/Tour/AddPackageCategory";
import { SiDell } from "react-icons/si";
// import AllPackageCategory from "./components/Admin/Tour/AllPackageCategory";
import EditBlog from "./components/Admin/Blog/EditBlog";
import TourPage from "./components/Admin/Tour/TourPage";
import AllCategory from "./components/Admin/Tour/AllCategory";
import EditCategory from "./components/Admin/Tour/EditCategory";
import EditPackage from "./components/Admin/Tour/EditPackage";
import Login from "./components/Login/Login";
import SubNavbar from "./components/SubNavbar";
import HotelSidebar from "./components/Hotel/HotelSidebar";
import HotelList from "./components/Hotel/HotelList";
import HotelPage from "./components/Hotel/HotelPage";
import BookingPage from "./components/Hotel/BookingPage";
import CabSidebar from "./components/Cab/CabSidebar";
import CabList from "./components/Cab/CabList";
import CabPage from "./components/Cab/CabPage";
import ReviewBooking from "./components/Cab/ReviewBooking";
import AddCab from "./components/Admin/Cab/AddCab";
import AllCab from "./components/Admin/Cab/AllCab";
import EditCab from "./components/Admin/Cab/EditCab";
import EditHotel from "./components/Admin/Hotel/EditHotel";
import AddHotel from "./components/Admin/Hotel/AddHotel";

import BookingDashboard from "./components/Admin/Hotel/Hotelbooking";

// import Tourpage from "./components/test/Tourpage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          {/* <div className="fake-header h-[10vh] bg-transparent"></div> */}

          <Home />
          <Footer />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/blog",
      element: (
        <>
          <Navbar />
          {/* <div className="fake-header h-[10vh] bg-transparent"></div> */}
          <Blog />
          <Footer />
        </>
      ),
    },
    {
      path: "/blog/:id",
      element: (
        <>
          <Navbar />
          {/* <div className="fake-header h-[10vh] bg-transparent"></div> */}
          {/* <Home /> */}
          <BlogPage />

          <Footer />
        </>
      ),
    },
    // {
    //   path: "/tour",
    //   element: (
    //     <>
    //       <Navbar />
    //       {/* <div className="fake-header h-[10vh] bg-transparent"></div> */}
    //       <Tour />
    //       <Footer />
    //     </>
    //   ),
    // },
    // {
    //   path: `/tour/:id`,
    //   element: (
    //     <>
    //       <Navbar />
    //       {/* <div className="fake-header h-[10vh] bg-transparent"></div> */}

    //       <Ptour />

    //       <Footer />
    //     </>
    //   ),
    // },
    {
      path: "/tour",
      element: (
        <>
          <Navbar />
          {/* <div className="fake-header h-[15vh] bg-transparent"></div> */}
          <Tour />
          <Footer />
        </>
      ),
    },
    {
      path: "/tour/:id",
      element: (
        <>
          <Navbar />
          {/* <div className="fake-header h-[15vh] bg-transparent"></div> */}
          <Ptour />
          <Footer />
        </>
      ),
    },
    {
      path: `/tour/${data[0].title}/:id`,
      element: (
        <>
          <Navbar />
          {/* <div className="fake-header h-[15vh] bg-transparent"></div> */}

          <Ptour data={data[0].types} />

          <Footer />
        </>
      ),
    },
    {
      path: `/tour/${data[1].title}/:id`,

      element: (
        <>
          <Navbar />
          {/* <div className="fake-header h-[15vh] bg-transparent"></div> */}

          <Ptour data={data[1].types} />

          <Footer />
        </>
      ),
    },
    {
      path: `/tour/${data[2].title}/:id`,
      element: (
        <>
          <Navbar />
          {/* <div className="fake-header h-[15vh] bg-transparent"></div> */}

          <Ptour data={data[2].types} />

          <Footer />
        </>
      ),
    },
    {
      path: `/tour/${data[3].title}/:id`,
      element: (
        <>
          <Navbar />
          {/* <div className="fake-header h-[15vh] bg-transparent"></div> */}

          <Ptour data={data[3].types} />
          <Footer />
        </>
      ),
    },
    {
      path: `admin/tour/alltour/:id`,
      element: (
        <>
          {/* <Navbar />
          <div className="fake-header h-[15vh] bg-transparent"></div> */}

          <TourPage />

          {/* <Footer /> */}
        </>
      ),
    },
    {
      path: `admin/hotel/allhotel/:id`,
      element: (
        <>
          {/* <Navbar />
          <div className="fake-header h-[15vh] bg-transparent"></div> */}

          <Hotelview />

          {/* <Footer /> */}
        </>
      ),
    },
  
    // {
    //   path: `/tour/Mountain/:id`,
    //   element: (
    //     <>
    //       <Navbar />
    //       <div className="fake-header h-[15vh] bg-transparent"></div>

    //       <Ptour />

    //       <Footer />
    //     </>
    //   ),
    // },
    // {
    //   path: `/tour/Beach/:id`,
    //   element: (
    //     <>
    //       <Navbar />
    //       <div className="fake-header h-[15vh] bg-transparent"></div>

    //       <Ptour />

    //       <Footer />
    //     </>
    //   ),
    // },
    // {
    //   path: `/tour/Desert/:id`,
    //   element: (
    //     <>
    //       <Navbar />
    //       <div className="fake-header h-[15vh] bg-transparent"></div>

    //       <Ptour />

    //       <Footer />
    //     </>
    //   ),
    // },
    // {
    //   path: `/tour/Camping/:id`,
    //   element: (
    //     <>
    //       <Navbar />
    //       <div className="fake-header h-[15vh] bg-transparent"></div>

    //       <Ptour />

    //       <Footer />
    //     </>
    //   ),
    // },
    // {
    //   path: `/tour/${data[1].title}/:id`,

    //   element: (
    //     <>
    //       <Navbar />
    //       <div className="fake-header h-[15vh] bg-transparent"></div>

    //       <Ptour data={data[1].types} />

    //       <Footer />
    //     </>
    //   ),
    // },
    // {
    //   path: `/tour/${data[2].title}/:id`,
    //   element: (
    //     <>
    //       <Navbar />
    //       <div className="fake-header h-[15vh] bg-transparent"></div>

    //       <Ptour data={data[2].types} />

    //       <Footer />
    //     </>
    //   ),
    // },
    // {
    //   path: `/tour/${data[3].title}/:id`,
    //   element: (
    //     <>
    //       <Navbar />
    //       <div className="fake-header h-[15vh] bg-transparent"></div>

    //       <Ptour data={data[3].types} />
    //       <Footer />
    //     </>
    //   ),
    // },
    {
      path: "/hotel",
      element: (
        <>
          <Navbar />
          {/* <div className="fake-header h-[10vh] bg-transparent"></div> */}
          <Hotel />
          <Footer />
        </>
      ),
    },
    {
      path: `/hotel/${data[0].title}/:id`,
      element: (
        <>
          <Navbar />
          {/* <div className="fake-header h-[10vh] bg-transparent"></div> */}

          <Photel data={data[0].types} />

          <Footer />
        </>
      ),
    },
    {
      path: `/hotel/${data[1].title}/:id`,
      element: (
        <>
          <Navbar />
          {/* <div className="fake-header h-[10vh] bg-transparent"></div> */}

          <Photel data={data[1].types} />
          <Footer />
        </>
      ),
    },

    {
      path: "/h",
      element: (
        <>
          <Navbar />
          <div className="flex container">
            {/* <HotelSidebar />
            <HotelList /> */}
            <HotelPage />
          </div>
        </>
      ),
    },
    // {
    //   path: "/hotelDetails",
    //   element: (
    //     <>
    //       <Navbar />

    //        <Hotelview />

    //     </>
    //   ),
    // },
    {
      path: "/hotel/:id",
      element: (
        <>
          <Navbar />
          {/* <div className="fake-header h-[10vh] bg-transparent"></div> */}
          {/* <Home /> */}
          <Hotelview />

          <Footer />
        </>
      ),
    },
    // {
    //   path: "/BookingPage",
    //   element: (
    //     <>
    //       <Navbar />

    //        <BookingPage />

    //     </>
    //   ),
    // },
    {
      path: "/hotel/booking/:id",
      element: (
        <>
          <Navbar />

          <BookingPage />

          <Footer />
        </>
      ),
    },
    {
      path: "/cab",
      element: (
        <>
          <Navbar />
          {/* <div className="fake-header h-[10vh] bg-transparent"></div> */}
          <Cab />
          <Footer />
        </>
      ),
    },
    {
      path: "/admin",
      element: (
        <>
          <Sidebar />
        </>
      ),
    },
    {
      path: "/admin/blog/allblog",
      element: (
        <>
          <Sidebar />
          <AllBlog />
        </>
      ),
    },
    {
      path: "/admin/blog/allblog/edit/:blogId",
      element: (
        <>
          <Sidebar />
          <EditBlog />
        </>
      ),
    },
    {
      path: "/admin/blog/addblog",
      element: (
        <>
          <Sidebar />
          <AddBlog />
        </>
      ),
    },
    {
      path: "/admin/tour/alltour",
      element: (
        <>
          <Sidebar />
          <AllTour />
        </>
      ),
    },
    {
      path: "/admin/hotel/allhotel",
      element: (
        <>
          <Sidebar />
          <AllHotel />
        </>
      ),
    },
    {
      path: "/admin/cab/allcab",
      element: (
        <>
          <Sidebar />
          <AllCab />
        </>
      ),
    },
    // {
    //   path: "/admin/tour/allhotel",
    //   element: (
    //     <>
    //       <Sidebar />
    //       <AllHotel />
    //     </>
    //   ),
    // },
    {
      path: "/admin/user/alluser",
      element: (
        <>
          <Sidebar />
          <AllUser />
        </>
      ),
    },
    {
      path: "/admin/offer/alloffers",
      element: (
        <>
          <Sidebar />
          <AllOffer />
        </>
      ),
    },
    {
      path: "/admin/tour/addtour",
      element: (
        <>
          <Sidebar />
          <AddTour />
        </>
      ),
    },
    {
      path: "/admin/cab/addcab",
      element: (
        <>
          <Sidebar />
          <AddCab />
        </>
      ),
    },
    {
      path: "/admin/hotel/addhotel",
      element: (
        <>
          <Sidebar />
          <AddHotel />
        </>
      ),
    },{
      path: "/admin/hotel/bookings",
      element: (
        <>
          <Sidebar />
          <BookingDashboard/>
        </>
      ),
    },
    {
      path: "/admin/tour/addpackagecategory",
      element: (
        <>
          <Sidebar />
          <AddPackageCategory />
        </>
      ),
    },
    {
      path: "/admin/tour/allpackagecategory",
      element: (
        <>
          <Sidebar />
          <AllCategory />
        </>
      ),
    },
    {
      path: "/admin/tour/category/edit/:categoryId",
      element: (
        <>
          <Sidebar />
          <EditCategory />
        </>
      ),
    },
    {
      path: "/admin/tour/edit/:packageId",
      element: (
        <>
          <Sidebar />
          <EditPackage />
        </>
      ),
    },
    {
      path: "/admin/cab/edit/:cabId",
      element: (
        <>
          <Sidebar />
          <EditCab />
        </>
      ),
    },
    {
      path: "/admin/hotel/edit/:hotelId",
      element: (
        <>
          <Sidebar />
          <EditHotel />
        </>
      ),
    },

    {
      path: "/admin/cab/addcab",
      element: (
        <>
          <Sidebar />
          <AddCab />
          {/* <AddPackageCategory /> */}
        </>
      ),
    },
    {
      path: "/c",
      element: (
        <>
          <Navbar />
          <div className="flex container">
            {/* <HotelSidebar />
            <HotelList /> */}
            <CabPage />
          </div>
        </>
      ),
    },
    {
      path: "/cab/booking/:id",
      element: (
        <>
          <Navbar />
          {/* <div className="fake-header h-[10vh] bg-transparent"></div> */}
          <ReviewBooking />
          <Footer />
        </>
      ),
    },
  ]);
  return (
    <>
      <ToastContainer />
      <div>
        {/* <Navbar /> */}

        <RouterProvider router={router} />
        {/* <Home /> */}

        {/* <Footer /> */}
        {/* <Navbar />
        <div className="fake-header h-[15vh] bg-transparent"></div> */}
        {/* <Hero />
        <WhyChooseUs />
        <Testimonial />
        <Services />
        <Recommendation_tour /> */}
        {/* <Recommendation_hotel /> */}
        {/* <Blog /> */}
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default App;
