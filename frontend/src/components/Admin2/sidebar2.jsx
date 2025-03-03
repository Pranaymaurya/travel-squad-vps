import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { 
  ChevronDown, 
  Menu, 
  Grid, 
  Users, 
  Luggage, 
  Building, 
  Car, 
  BookOpen, 
  Tag, 
  MessageSquare, 
  PieChart, 
  LineChart, 
  LogOut,
  Settings
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Login from "../Login/Login";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const Sidebar = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState(null);
  const [expanded, setExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Nav items with their sub-menus
  const navItems = [
    {
      id: "dashboard",
      icon: <Grid className="h-5 w-5" />,
      title: "Dashboard",
      href: "/admin/dashboard"
    },
    {
      id: "users",
      icon: <Users className="h-5 w-5" />,
      title: "Users",
      subMenu: [
        { title: "All Users", href: "/admin/user/alluser" }
      ]
    },
    {
      id: "tours",
      icon: <Luggage className="h-5 w-5" />,
      title: "Tours",
      subMenu: [
        { title: "All Packages", href: "/admin/tour/alltour" },
        { title: "Add New Package", href: "/admin/tour/addtour" }
      ]
    },
    {
      id: "hotels",
      icon: <Building className="h-5 w-5" />,
      title: "Hotels",
      subMenu: [
        { title: "All Hotels", href: "/admin/hotel/allhotel" },
        { title: "Add Hotel", href: "/admin/hotel/addhotel" }
      ]
    },
    {
      id: "cabs",
      icon: <Car className="h-5 w-5" />,
      title: "Cabs",
      subMenu: [
        { title: "All Cabs", href: "/admin/cab/allcab" },
        { title: "Add a Cab", href: "/admin/cab/addcab" }
      ]
    },
    {
      id: "blogs",
      icon: <BookOpen className="h-5 w-5" />,
      title: "Blogs",
      subMenu: [
        { title: "All Blogs", href: "/admin/blog/allblog" },
        { title: "Add Blogs", href: "/admin/blog/addblog" }
      ]
    },
    {
      id: "offers",
      icon: <Tag className="h-5 w-5" />,
      title: "Offers",
      subMenu: [
        { title: "All Offers", href: "/admin/offer/alloffers" },
        { title: "Add New Offers", href: "/admin/offer/addoffer" }
      ]
    },
    {
      id: "enquiry",
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Enquiry",
      subMenu: [
        { title: "Package", href: "/admin/enquiry/package" },
        { title: "Hotel", href: "/admin/enquiry/hotel" },
        { title: "Cab", href: "/admin/enquiry/cab" }
      ]
    },
    {
      id: "analytics",
      icon: <PieChart className="h-5 w-5" />,
      title: "Analytics",
      href: "/admin/analytics"
    },
    {
      id: "chart",
      icon: <LineChart className="h-5 w-5" />,
      title: "Chart",
      href: "/admin/chart"
    }
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/users`, { 
          withCredentials: true 
        });
        setUser(data);
      } catch (error) {
        console.error("User not authenticated");
        setUser(null);
      }
    };

    fetchUser();

    // Set active item based on current location
    const currentPath = location.pathname;
    const matchingItem = navItems.find(item => 
      item.href === currentPath || 
      (item.subMenu && item.subMenu.some(subItem => subItem.href === currentPath))
    );
    
    if (matchingItem) {
      setActiveItem(matchingItem.id);
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/logout`, {}, { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Not authorized as admin
          </h2>
          <Login />
        </div>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className={cn(
      "flex h-screen flex-col bg-white border-r",
      expanded ? "w-64" : "w-20",
      "transition-all duration-300 ease-in-out"
    )}>
      <div className="flex h-16 items-center px-4 border-b">
        <div className={cn(
          "flex items-center gap-2",
          expanded ? "justify-between w-full" : "justify-center"
        )}>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-indigo-600" />
            {expanded && <span className="font-semibold text-lg">Admin Panel</span>}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setExpanded(!expanded)}
            className="h-8 w-8"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="flex flex-col gap-1 px-2">
          {navItems.map((item) => (
            <div key={item.id}>
              {item.subMenu ? (
                <Collapsible 
                  open={activeItem === item.id} 
                  onOpenChange={() => setActiveItem(activeItem === item.id ? null : item.id)}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant={activeItem === item.id ? "secondary" : "ghost"}
                            className={cn(
                              "w-full justify-between",
                              !expanded && "px-2"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              {item.icon}
                              {expanded && <span>{item.title}</span>}
                            </div>
                            {expanded && <ChevronDown className={cn(
                              "h-4 w-4 transition-transform",
                              activeItem === item.id && "rotate-180"
                            )} />}
                          </Button>
                        </CollapsibleTrigger>
                      </TooltipTrigger>
                      {!expanded && (
                        <TooltipContent side="right">
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                  
                  <CollapsibleContent className="pl-10 space-y-1 mt-1">
                    {expanded && item.subMenu.map((subItem, idx) => (
                      <Link to={subItem.href} key={idx}>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-sm font-normal"
                        >
                          {subItem.title}
                        </Button>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to={item.href}>
                        <Button
                          variant={location.pathname === item.href ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start",
                            !expanded && "px-2 justify-center"
                          )}
                        >
                          {item.icon}
                          {expanded && <span className="ml-3">{item.title}</span>}
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    {!expanded && (
                      <TooltipContent side="right">
                        {item.title}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t p-4">
        <div className={cn(
          "flex items-center",
          expanded ? "justify-between" : "justify-center",
          "gap-2"
        )}>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFieXxlbnwwfHwwfHx8MA%3D%3D" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {expanded && (
              <div className="flex flex-col">
                <span className="font-medium text-sm">John</span>
                <span className="text-xs text-gray-500">Admin</span>
              </div>
            )}
          </div>
          {expanded && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <SidebarContent />
      </div>

      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon" className="fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Hello, Admin</h1>
          </div>
          
          {/* Your page content will be rendered here */}
          <div className="bg-gray-50 p-6 rounded-lg border">
            {/* Content placeholder */}
            <div className="text-center py-20 text-gray-500">
              Select an option from the sidebar to manage your content
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;