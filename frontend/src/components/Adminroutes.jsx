import { Routes, Route, Navigate } from "react-router-dom"
import AllBlog from "./Admin/Blog/AllBlog"
import AddBlog from "./Admin/Blog/AddBlog"
import EditBlog from "./Admin/Blog/EditBlog"
import AllTour from "./Admin/Tour/AllTour"
import AddTour from "./Admin/Tour/AddTour"
import AllCategory from "./Admin/Tour/AllCategory"
import EditCategory from "./Admin/Tour/EditCategory"
import EditPackage from "./Admin/Tour/EditPackage"
import AddPackageCategory from "./Admin/Tour/AddPackageCategory"
import TourPage from "./Admin/Tour/TourPage"
import AllHotel from "./Admin/Hotel/AllHotel"
import AddHotel from "./Admin/Hotel/AddHotel"
import EditHotel from "./Admin/Hotel/EditHotel"
import BookingDashboard from "./Admin/Hotel/Hotelbooking"
import AllOffer from "./Admin/Offer/AllOffer"
import Sidebar from "./Admin/Sidebar"
import AllUser from "./Admin/User/AllUser"
import EditCab from "./Admin/Cab/EditCab"
import AllCab from "./Admin/Cab/AllCab"
import Dashboard from "./Admin/Dashboard"
import Hotelview from "./Hotel/Hotelview"
import AddCab from "./Admin/Cab/AddCab"
import HotelManager from "./Admin/Hotel/gethotel"
import GetCab from "./Admin/Cab/getcab"
import ViewCab from "./Admin/Cab/CabView"
import HotelViews from "./Admin/Hotel/HotelInfo"
import Bookingcab from "./Admin/Cab/CabBooking"
import AdminHotelBooking from "./Admin/Hotel/AdminHotelBooking"
import AllBookingcab from "./Admin/Cab/AllCabBooking"
import TourBooking from "./Admin/Tour/TourBooking"

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Sidebar />}>
        {/* Dashboard - default route */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* User routes */}
        <Route path="user/alluser" element={<AllUser />} />

        {/* Tour routes */}
        <Route path="tour/alltour" element={<AllTour />} />
        <Route path="tour/alltour/:id" element={<TourPage />} />
        <Route path="tour/addtour" element={<AddTour />} />
        <Route path="tour/allpackagecategory" element={<AllCategory />} />
        <Route path="tour/addpackagecategory" element={<AddPackageCategory />} />
        <Route path="tour/category/edit/:categoryId" element={<EditCategory />} />
        <Route path="tour/edit/:packageId" element={<EditPackage />} />
        <Route path="tour/all" element={<TourBooking />} />
        {/* Hotel routes */}
        <Route path="hotel/allhotel" element={<AllHotel />} />
        <Route path="hotel/allhotel/:id" element={<Hotelview />} />
        <Route path="hotel/addhotel" element={<AddHotel />} />
        <Route path="hotel/edit/:hotelId" element={<EditHotel />} />
        <Route path="hotel/bookings" element={<BookingDashboard />} />
        <Route path="hotel/user" element={<HotelManager />} />
        <Route path="hotel/userview" element={<HotelViews />} />
        <Route path="hotel/all" element={<AdminHotelBooking />} />
        {/* Cab routes */}
        <Route path="cab/allcab" element={<AllCab />} />
        <Route path="cab/addcab" element={<AddCab />} />
        <Route path="cab/edit/:cabId" element={<EditCab />} />
        <Route path="cab/user" element={<GetCab/>} />
        <Route path="cab/user/view" element={<ViewCab/>} />
        <Route path="cab/booking" element={<Bookingcab/>} />
        <Route path="cab/all" element={<AllBookingcab/>} />
        {/* Blog routes */}
        <Route path="blog/allblog" element={<AllBlog />} />
        <Route path="blog/addblog" element={<AddBlog />} />
        <Route path="blog/allblog/edit/:blogId" element={<EditBlog />} />

        {/* Offer routes */}
        <Route path="offer/alloffers" element={<AllOffer />} />
      </Route>
    </Routes>
  )
}

