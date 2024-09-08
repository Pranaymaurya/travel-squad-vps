import React, { useState, useEffect, useRef } from "react";
import "boxicons/css/boxicons.min.css";
import "./Sidebar.css";
import axios from "axios";
import Login from "../Login/Login";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => { 
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const sidebarRef = useRef(null);
  const sidebarBtnRef = useRef(null);
  const arrowRefs = useRef([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/users`,{ withCredentials: true }); // Endpoint to fetch user profile
        setUser(data); // Assuming response contains user data when authenticated
      } catch (error) {
        console.error("User not authenticated");
        setUser(null);
      }
    };

    fetchUser();

    const handleArrowClick = (e) => {
      let arrowParent = e.target.parentElement.parentElement; // selecting main parent of arrow
      arrowParent.classList.toggle("showMenu");
    };

    const handleSidebarToggle = () => {
      sidebarRef.current.classList.toggle("close");
    };

    // Add event listeners
    if (sidebarBtnRef.current) {
      sidebarBtnRef.current.addEventListener("click", handleSidebarToggle);
    }
    arrowRefs.current.forEach((arrow) => {
      if (arrow) {
        arrow.addEventListener("click", handleArrowClick);
      }
    });

    // Cleanup event listeners on component unmount
    return () => {
      if (sidebarBtnRef.current) {
        sidebarBtnRef.current.removeEventListener("click", handleSidebarToggle);
      }
      arrowRefs.current.forEach((arrow) => {
        if (arrow) {
          arrow.removeEventListener("click", handleArrowClick);
        }
      });
    };
  }, []);

  return (
    <>
      {user ? (
        <>
          <div ref={sidebarRef} className="sidebar close">
            <div className="logo-details">
              <i class="bx bxs-cog"></i>
              <span className="logo_name">Admin Panel</span>
            </div>
            <ul className="nav-links">
              <li>
                <a href="#">
                  <i className="bx bx-grid-alt"></i>
                  <span className="link_name">Dashboad</span>
                </a>
                <ul className="sub-menu blank">
                  <li>
                    <a className="link_name" href="#">
                      Dashboard
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <div className="iocn-link">
                  <a href="#">
                    <i class="bx bx-user"></i>
                    <span className="link_name">Users</span>
                  </a>
                  <i
                    className="bx bxs-chevron-down arrow"
                    ref={(el) => arrowRefs.current.push(el)}
                  ></i>
                </div>
                <ul className="sub-menu">
                  <li>
                    <a className="link_name" href="#">
                      Users
                    </a>
                  </li>
                  <li>
                    <a href="/admin/user/alluser">All Users</a>
                  </li>
                  {/* <li>
                    <a href="#">Ad New Users</a>
                  </li> */}
                </ul>
              </li>
              <li>
                <div className="iocn-link">
                  <a href="#">
                    <i class="bx bx-trip"></i>
                    <span className="link_name">Tours</span>
                  </a>
                  <i
                    className="bx bxs-chevron-down arrow"
                    ref={(el) => arrowRefs.current.push(el)}
                  ></i>
                </div>
                <ul className="sub-menu">
                  <li>
                    <a className="link_name" href="#">
                      Tours
                    </a>
                  </li>
                  <li>
                    <a href="/admin/tour/alltour">All Packages</a>
                  </li>
                  <li>
                    <a href="/admin/tour/addtour">Add New Package</a>
                  </li>
                  {/* <li>
                <a href="/admin/tour/allpackagecategory">All Pac Categories</a>
              </li>
              <li>
                <a href="/admin/tour/addpackagecategory">Add Pac Categories</a>
              </li> */}
                </ul>
              </li>
              <li>
                <div className="iocn-link">
                  <a href="#">
                    <i class="bx bx-building-house"></i>
                    <span className="link_name">Hotels</span>
                  </a>
                  <i
                    className="bx bxs-chevron-down arrow"
                    ref={(el) => arrowRefs.current.push(el)}
                  ></i>
                </div>
                <ul className="sub-menu">
                  <li>
                    <a className="link_name" href="#">
                      Hotels
                    </a>
                  </li>
                  <li>
                    <a href="/admin/hotel/allhotel">All Hotels</a>
                  </li>
                  <li>
                    <a href="/admin/hotel/addhotel">Add Hotel</a>
                  </li>
                  {/* <li>
                    <a href="#">Add Country</a>
                  </li> */}
                </ul>
              </li>
              <li>
                <div className="iocn-link">
                  <a href="#">
                    <i class="bx bx-taxi"></i>
                    <span className="link_name">Cabs</span>
                  </a>
                  <i
                    className="bx bxs-chevron-down arrow"
                    ref={(el) => arrowRefs.current.push(el)}
                  ></i>
                </div>
                <ul className="sub-menu">
                  <li>
                    <a className="link_name" href="#">
                      Cabs
                    </a>
                  </li>
                  <li>
                    <a href="/admin/cab/allcab">All Cabs</a>
                  </li>
                  <li>
                    <Link to={"/admin/cab/addcab"}>Add a Cab</Link>
                  </li>
                  {/* <li>
                    <a href="#">Add Cab Categories</a>
                  </li> */}
                </ul>
              </li>
              <li>
                <div className="iocn-link">
                  <a href="#">
                    <i className="bx bx-book-alt"></i>
                    <span className="link_name">Blogs</span>
                  </a>
                  <i
                    className="bx bxs-chevron-down arrow"
                    ref={(el) => arrowRefs.current.push(el)}
                  ></i>
                </div>
                <ul className="sub-menu">
                  <li>
                    <a className="link_name" href="#">
                      Blogs
                    </a>
                  </li>
                  <li>
                    <a href="/admin/blog/allblog">All Blogs</a>
                  </li>
                  <li>
                    <a href="/admin/blog/addblog">Add Blogs</a>
                  </li>
                </ul>
              </li>
              <li>
                <div className="iocn-link">
                  <a href="#">
                    <i class="bx bx-purchase-tag"></i>
                    <span className="link_name">Offers</span>
                  </a>
                  <i
                    className="bx bxs-chevron-down arrow"
                    ref={(el) => arrowRefs.current.push(el)}
                  ></i>
                </div>
                <ul className="sub-menu">
                  <li>
                    <a className="link_name" href="#">
                      Offers
                    </a>
                  </li>
                  <li>
                    <a href="/admin/offer/alloffers">All Offers</a>
                  </li>
                  <li>
                    <a href="#">Add New Offers</a>
                  </li>
                </ul>
              </li>
              <li>
                <div className="iocn-link">
                  <a href="#">
                    <i className="bx bx-collection"></i>
                    <span className="link_name">Enquiry</span>
                  </a>
                  <i
                    className="bx bxs-chevron-down arrow"
                    ref={(el) => arrowRefs.current.push(el)}
                  ></i>
                </div>
                <ul className="sub-menu">
                  <li>
                    <a className="link_name" href="#">
                      Enquiry
                    </a>
                  </li>
                  <li>
                    <a href="#">Package</a>
                  </li>
                  <li>
                    <a href="#">Hotel</a>
                  </li>
                  <li>
                    <a href="#">Cab</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">
                  <i className="bx bx-pie-chart-alt-2"></i>
                  <span className="link_name">Analytics</span>
                </a>
                <ul className="sub-menu blank">
                  <li>
                    <a className="link_name" href="#">
                      Analytics
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">
                  <i className="bx bx-line-chart"></i>
                  <span className="link_name">Chart</span>
                </a>
                <ul className="sub-menu blank">
                  <li>
                    <a className="link_name" href="#">
                      Chart
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <div className="profile-details">
                  <div className="profile-content">
                    <img
                      src="https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFieXxlbnwwfHwwfHx8MA%3D%3D"
                      alt="profileImg"
                    />
                  </div>
                  <div className="name-job">
                    <div className="profile_name">John</div>
                    <div className="job">Admin</div>
                  </div>
                  <i className="bx bx-log-out"></i>
                </div>
              </li>
            </ul>
          </div>
          <section className="home-section">
            <div className="home-content">
              <i className="bx bx-menu" ref={sidebarBtnRef}></i>
              <span className="text">Hello! Admin</span>
            </div>
          </section>
        </>
      ) : (
        <>
          Not autherized as admin
          <Login />
        </>
      )}
    </>
  );
};

export default Sidebar;
