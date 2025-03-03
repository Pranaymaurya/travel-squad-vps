import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Sidebar from "./sidebar"
import Dashboard from "./pages/Dashboard"
import AllUsers from "./pages/users/AllUsers"
import AllTours from "./pages/tours/AllTours"
import AddTour from "./pages/tours/AddTour"
import AllBlogs from "./pages/blogs/AllBlogs"
import AddBlog from "./pages/blogs/AddBlog"
import EditBlog from "./pages/blogs/EditBlog"
import AllHotels from "./pages/hotels/AllHotels"
import AddHotel from "./pages/hotels/AddHotel"
import EditHotel from "./pages/hotels/EditHotel"
import AllCabs from "./pages/cabs/AllCabs"
import AddCab from "./pages/cabs/AddCab"
import EditCab from "./pages/cabs/EditCab"
import AllOffers from "./pages/offers/AllOffers"
import AllCategories from "./pages/tours/AllCategories"
import EditCategory from "./pages/tours/EditCategory"
import EditPackage from "./pages/tours/EditPackage"
import AddPackageCategory from "./pages/tours/AddPackageCategory"
import BookingDashboard from "./pages/hotels/BookingDashboard"
import TourPage from "./pages/tours/TourPage"
import HotelView from "./pages/hotels/HotelView"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes - all nested under Sidebar */}
        <Route path="/admin" element={<Sidebar />}>
          {/* Dashboard - default route */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* User routes */}
          <Route path="user/alluser" element={<AllUsers />} />

          {/* Tour routes */}
          <Route path="tour">
            <Route path="alltour" element={<AllTours />} />
            <Route path="alltour/:id" element={<TourPage />} />
            <Route path="addtour" element={<AddTour />} />
            <Route path="allpackagecategory" element={<AllCategories />} />
            <Route path="addpackagecategory" element={<AddPackageCategory />} />
            <Route path="category/edit/:categoryId" element={<EditCategory />} />
            <Route path="edit/:packageId" element={<EditPackage />} />
          </Route>

          {/* Hotel routes */}
          <Route path="hotel">
            <Route path="allhotel" element={<AllHotels />} />
            <Route path="allhotel/:id" element={<HotelView />} />
            <Route path="addhotel" element={<AddHotel />} />
            <Route path="edit/:hotelId" element={<EditHotel />} />
            <Route path="bookings" element={<BookingDashboard />} />
          </Route>

          {/* Cab routes */}
          <Route path="cab">
            <Route path="allcab" element={<AllCabs />} />
            <Route path="addcab" element={<AddCab />} />
            <Route path="edit/:cabId" element={<EditCab />} />
          </Route>

          {/* Blog routes */}
          <Route path="blog">
            <Route path="allblog" element={<AllBlogs />} />
            <Route path="addblog" element={<AddBlog />} />
            <Route path="allblog/edit/:blogId" element={<EditBlog />} />
          </Route>

          {/* Offer routes */}
          <Route path="offer/alloffers" element={<AllOffers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

