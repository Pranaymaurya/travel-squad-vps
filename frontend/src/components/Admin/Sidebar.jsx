"use client"

import { useState, useEffect } from "react"
import { Link, Outlet } from "react-router-dom"
import axios from "axios"
import Login from "../Login/Login"

// Import shadcn components
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

// Import Lucide icons
import {
  Settings,
  Grid,
  Users,
  Briefcase,
  Building,
  Car,
  BookOpen,
  Tag,
  MessageSquare,
  PieChart,
  LineChart,
  LogOut,
  Menu,
  ChevronDown,
} from "lucide-react"

// Define route access configuration
const ROUTE_ACCESS = {
  admin: {
    dashboard: true,
    users: true,
    tours: true,
    hotels: {
      view: false,
      update: false,
    },
    cabs: {
      view: false,
      update: false,
    },
    blogs: true,
    offers: true,
    enquiry: {
      tour: true,
      hotel: true,
      cab: true,
    },
    analytics: true,
    chart: true,
  },
  hotel: {
    dashboard: true,
    hotels: {
      view: true,
      update: true,
    },
    enquiry: {
      hotel: true,
    },
  },
  tour: {
    dashboard: true,
    tours: {
      view: true,
      update: true,
    },
    enquiry: {
      tour: true,
    },
  },
  cab: {
    dashboard: true,
    cabs: {
      view: true,
      update: true,
    },
    enquiry: {
      cab: true,
    },
  },
  content: {
    dashboard: true,
    blogs: {
      view: true,
      create: true,
      update: true,
    },
    offers: {
      view: true,
      create: true,
      update: true,
    },
  },
}

const Sidebar = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [user, setUser] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedMenu, setExpandedMenu] = useState(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/users/profile`, {
          withCredentials: true,
        })
        setUser(data)
        // console.log(data)
      } catch (error) {
        console.error("User not authenticated")
        setUser(null)
      }
    }

    fetchUserProfile()
  }, [backendUrl])

  const toggleMenu = (menuName) => {
    setExpandedMenu((prev) => (prev === menuName ? null : menuName))
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Check if a specific route/feature is accessible
  const canAccessRoute = (route, subRoute = null, action = null) => {
    if (!user) return false

    const userAccess = ROUTE_ACCESS[user.role] || {}

    if (!userAccess[route]) return false

    if (subRoute && action) {
      return userAccess[route]?.[subRoute]?.[action] || false
    }

    if (subRoute) {
      // If subRoute is specified but userAccess[route] is just a boolean
      if (typeof userAccess[route] === "boolean") {
        return userAccess[route]
      }
      return userAccess[route]?.[subRoute] || false
    }

    if (action && typeof userAccess[route] === "object") {
      return userAccess[route]?.[action] || false
    }

    return typeof userAccess[route] === "boolean" ? userAccess[route] : Object.keys(userAccess[route]).length > 0
  }

  const renderDashboardMenu = () =>
    canAccessRoute("dashboard") && (
      <Button
        variant="ghost"
        className={`flex justify-start items-center w-full mb-1 text-white ${!sidebarOpen && "justify-center px-2"} hover:bg-gray-700 hover:text-white`}
        asChild
      >
        <Link to="/admin/dashboard">
          <Grid className="h-5 w-5 mr-2 text-white" />
          {sidebarOpen && <span className="text-white">Dashboard</span>}
        </Link>
      </Button>
    )

  const renderUsersMenu = () =>
    canAccessRoute("users") && (
      <Collapsible open={expandedMenu === "users"} onOpenChange={() => toggleMenu("users")} className="mb-1">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={`flex justify-between items-center w-full text-white ${!sidebarOpen && "justify-center px-2"} hover:text-white hover:bg-gray-700`}
          >
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-white" />
              {sidebarOpen && <span className="text-white">Users</span>}
            </div>
            {sidebarOpen && (
              <ChevronDown
                className={`h-4 w-4 transition-transform text-white ${expandedMenu === "users" ? "rotate-180" : ""}`}
              />
            )}
          </Button>
        </CollapsibleTrigger>
        {sidebarOpen && (
          <CollapsibleContent className="pl-7 py-1">
            <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white " asChild>
              <Link to="/admin/user/alluser">All Users</Link>
            </Button>
          </CollapsibleContent>
        )}
      </Collapsible>
    )

  const renderToursMenu = () =>
    canAccessRoute("tours") && (
      <Collapsible open={expandedMenu === "tours"} onOpenChange={() => toggleMenu("tours")} className="mb-1">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={`flex justify-between items-center w-full text-white ${!sidebarOpen && "justify-center px-2"} hover:bg-gray-700`}
          >
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-white" />
              {sidebarOpen && <span className="text-white">Tours</span>}
            </div>
            {sidebarOpen && (
              <ChevronDown
                className={`h-4 w-4 transition-transform text-white ${expandedMenu === "tours" ? "rotate-180" : ""}`}
              />
            )}
          </Button>
        </CollapsibleTrigger>
        {sidebarOpen && (
          <CollapsibleContent className="pl-7 py-1">
            {(user.role === "admin" || canAccessRoute("tours", "view")) && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="/admin/tour/alltour">All Packages</Link>
              </Button>
            )}
            {(user.role === "admin" || canAccessRoute("tours", "update")) && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="/admin/tour/addtour">Add New Package</Link>
              </Button>
            )}
            {(user.role === "admin" || canAccessRoute("tours", "update")) && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="/admin/tour/all">View Bookings</Link>
              </Button>
            )}
          </CollapsibleContent>
        )}
      </Collapsible>
    )

  const renderHotelsMenu = () =>
    canAccessRoute("hotels") && (
      <Collapsible open={expandedMenu === "hotels"} onOpenChange={() => toggleMenu("hotels")} className="mb-1">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={`flex justify-between items-center w-full text-white ${!sidebarOpen && "justify-center px-2"} hover:bg-gray-700`}
          >
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-white" />
              {sidebarOpen && <span className="text-white">Hotels</span>}
            </div>
            {sidebarOpen && (
              <ChevronDown
                className={`h-4 w-4 transition-transform text-white ${expandedMenu === "hotels" ? "rotate-180" : ""}`}
              />
            )}
          </Button>
        </CollapsibleTrigger>
        {sidebarOpen && (
          <CollapsibleContent className="pl-7 py-1">
            {(user.role === "admin") && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="/admin/hotel/allhotel">All Hotels</Link>
              </Button>
            )}
            {(user.role === "hotel" || canAccessRoute("hotels", "update")) && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="/admin/hotel/user">Hotel Update</Link>
              </Button>
            )}
            {(user.role === "hotel" || canAccessRoute("hotels", "view")) && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="/admin/hotel/userview">Hotel View</Link>
              </Button>
            )}
            {(user.role === "hotel" || canAccessRoute("hotels", "view")) && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="/admin/hotel/bookings">Hotel Bookings</Link>
              </Button>
            )}
            {user.role === "admin" && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="/admin/hotel/addhotel">Add Hotel</Link>
              </Button>
            )}
            {user.role === "admin" && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="/admin/hotel/all">Hotels Bookings</Link>
              </Button>
            )}
          </CollapsibleContent>
        )}
      </Collapsible>
    )

  const renderCabsMenu = () =>
    canAccessRoute("cabs") && (
      <Collapsible open={expandedMenu === "cabs"} onOpenChange={() => toggleMenu("cabs")} className="mb-1">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={`flex justify-between items-center w-full text-white ${!sidebarOpen && "justify-center px-2"} hover:bg-gray-700`}
          >
            <div className="flex items-center">
              <Car className="h-5 w-5 mr-2 text-white" />
              {sidebarOpen && <span className="text-white">Cabs</span>}
            </div>
            {sidebarOpen && (
              <ChevronDown
                className={`h-4 w-4 transition-transform text-white ${expandedMenu === "cabs" ? "rotate-180" : ""}`}
              />
            )}
          </Button>
        </CollapsibleTrigger>
        {sidebarOpen && (
          <CollapsibleContent className="pl-7 py-1">
            {(user.role === "admin" || canAccessRoute( "view")) && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="/admin/cab/allcab">All Cabs</Link>
              </Button>
            )}
            {(user.role === "admin" || canAccessRoute("update")) && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="/admin/cab/addcab">Add a Cab</Link>
              </Button>
            )}
            {(user.role === "admin" || canAccessRoute("update")) && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="/admin/cab/all">Cabs Booking</Link>
              </Button>
            )}
            {(user.role === "cab" || canAccessRoute("cabs", "view")) && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="/admin/cab/user/view">View Cab</Link>
              </Button>
            )}
            {(user.role === "cab" || canAccessRoute("cabs", "view")) && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="/admin/cab/user">Edit Cab</Link>
              </Button>
            )}
            {(user.role === "cab" || canAccessRoute("cabs", "view")) && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="/admin/cab/booking">Cab Booking</Link>
              </Button>
            )}
          </CollapsibleContent>
        )}
      </Collapsible>
    )

  const renderBlogsMenu = () =>
    canAccessRoute("blogs") && (
      <Collapsible open={expandedMenu === "blogs"} onOpenChange={() => toggleMenu("blogs")} className="mb-1">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={`flex justify-between items-center w-full text-white ${!sidebarOpen && "justify-center px-2"} hover:bg-gray-700`}
          >
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-white" />
              {sidebarOpen && <span className="text-white">Blogs</span>}
            </div>
            {sidebarOpen && (
              <ChevronDown
                className={`h-4 w-4 transition-transform text-white ${expandedMenu === "blogs" ? "rotate-180" : ""}`}
              />
            )}
          </Button>
        </CollapsibleTrigger>
        {sidebarOpen && (
          <CollapsibleContent className="pl-7 py-1">
            {(user.role === "admin" || canAccessRoute("blogs", "view")) && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="/admin/blog/allblog">All Blogs</Link>
              </Button>
            )}
            {(user.role === "admin" || canAccessRoute("blogs", "create")) && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="/admin/blog/addblog">Add Blogs</Link>
              </Button>
            )}
          </CollapsibleContent>
        )}
      </Collapsible>
    )

  const renderOffersMenu = () =>
    canAccessRoute("offers") && (
      <Collapsible open={expandedMenu === "offers"} onOpenChange={() => toggleMenu("offers")} className="mb-1">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={`flex justify-between items-center w-full text-white ${!sidebarOpen && "justify-center px-2"} hover:bg-gray-700`}
          >
            <div className="flex items-center">
              <Tag className="h-5 w-5 mr-2 text-white" />
              {sidebarOpen && <span className="text-white">Offers</span>}
            </div>
            {sidebarOpen && (
              <ChevronDown
                className={`h-4 w-4 transition-transform text-white ${expandedMenu === "offers" ? "rotate-180" : ""}`}
              />
            )}
          </Button>
        </CollapsibleTrigger>
        {sidebarOpen && (
          <CollapsibleContent className="pl-7 py-1">
            {(user.role === "admin" || canAccessRoute("offers", "view")) && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="/admin/offer/alloffers">All Offers</Link>
              </Button>
            )}
            {(user.role === "admin" || canAccessRoute("offers", "create")) && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="#">Add New Offers</Link>
              </Button>
            )}
          </CollapsibleContent>
        )}
      </Collapsible>
    )

  const renderEnquiryMenu = () => {
    const showEnquiryMenu = canAccessRoute("enquiry")

    return showEnquiryMenu ? (
      <Collapsible open={expandedMenu === "enquiry"} onOpenChange={() => toggleMenu("enquiry")} className="mb-1">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={`flex justify-between items-center w-full text-white ${!sidebarOpen && "justify-center px-2"} hover:bg-gray-700`}
          >
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-white" />
              {sidebarOpen && <span className="text-white">Enquiry</span>}
            </div>
            {sidebarOpen && (
              <ChevronDown
                className={`h-4 w-4 transition-transform text-white ${expandedMenu === "enquiry" ? "rotate-180" : ""}`}
              />
            )}
          </Button>
        </CollapsibleTrigger>
        {sidebarOpen && (
          <CollapsibleContent className="pl-7 py-1">
            {canAccessRoute("enquiry", "tour") && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="#">Tour Enquiry</Link>
              </Button>
            )}
            {canAccessRoute("enquiry", "hotel") && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="#">Hotel Enquiry</Link>
              </Button>
            )}
            {canAccessRoute("enquiry", "cab") && (
              <Button variant="ghost" className="w-full justify-start h-9 mb-1 text-white" asChild>
                <Link to="#">Cab Enquiry</Link>
              </Button>
            )}
          </CollapsibleContent>
        )}
      </Collapsible>
    ) : null
  }

  const renderAnalyticsMenu = () =>
    canAccessRoute("analytics") && (
      <Button
        variant="ghost"
        className={`flex justify-start items-center w-full mb-1 text-white ${!sidebarOpen && "justify-center px-2"} hover:bg-gray-700`}
        asChild
      >
        <Link to="#">
          <PieChart className="h-5 w-5 mr-2 text-white" />
          {sidebarOpen && <span className="text-white">Analytics</span>}
        </Link>
      </Button>
    )

  const renderChartMenu = () =>
    canAccessRoute("chart") && (
      <Button
        variant="ghost"
        className={`flex justify-start items-center w-full mb-1 text-white ${!sidebarOpen && "justify-center px-2"} hover:bg-gray-700`}
        asChild
      >
        <Link to="#">
          <LineChart className="h-5 w-5 mr-2 text-white" />
          {sidebarOpen && <span className="text-white">Chart</span>}
        </Link>
      </Button>
    )

  const renderUserMenus = () => {
    return (
      <>
        {renderDashboardMenu()}
        {renderUsersMenu()}
        {renderToursMenu()}
        {renderHotelsMenu()}
        {renderCabsMenu()}
        {renderBlogsMenu()}
        {renderOffersMenu()}
        {renderEnquiryMenu()}
        {renderAnalyticsMenu()}
        {renderChartMenu()}
      </>
    )
  }

  const handleLogout = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/users/logout`,
        {},
        {
          withCredentials: true,
        },
      )
      // Redirect to login page or reset user state
      setUser(null)
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  if (!user) {
    return (
      <div className="bg-black">
            <Login />
            </div>
          
    );
  }
  

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      {/* Sidebar */}
      <div
        className={`relative transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"} bg-gray-800 border-r border-gray-700 flex-shrink-0`}
      >
        {/* Logo area */}
        <div className="flex items-center p-4 border-b border-gray-700 h-16">
          <Settings className="h-6 w-6 text-indigo-400" />
          {sidebarOpen && <span className="ml-2 font-semibold text-white">Admin Panel</span>}
        </div>

        {/* Navigation area */}
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-2">{renderUserMenus()}</div>
        </ScrollArea>

        {/* User profile section */}
        <div className="absolute bottom-0 w-full border-t border-gray-700 p-4">
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={
                  user.profileImage ||
                  "https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFieXxlbnwwfHwwfHx8MA%3D%3D"
                }
              />
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-400">
                  {user.role
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </p>
              </div>
            )}
            {sidebarOpen && (
              <Button variant="ghost" size="icon" className="ml-auto" onClick={handleLogout}>
                <LogOut className="h-4 w-4 text-white" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-900">
        {/* Header with toggle button */}
        <div className="h-16 border-b border-gray-700 flex items-center px-4 flex-shrink-0 bg-gray-800">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5 text-white" />
          </Button>
          <span className="ml-4 font-medium text-white">Hello, {user.firstName}!</span>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-auto p-4 bg-gray-200">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Sidebar

