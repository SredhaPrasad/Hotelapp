import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get user role from sessionStorage
  const userRole = sessionStorage.getItem("role");

  // Logout Function
  function handleLogout() {
    sessionStorage.removeItem("logintoken");
    sessionStorage.removeItem("role");
    navigate("/login");
  }

  // Hide Navbar on Login Page
  if (location.pathname === "/login") {
    return null;
  }

  // Pages for General Users (Before Login)
  const basicPages = ["/", "/about", "/gallery", "/contact"];
  const isBasicPage = basicPages.includes(location.pathname);

  // Pages for Admin: Show only Hotels, Approval, Logout
  const adminPages = ["/admin", "/approval"];
  const isAdminPage = adminPages.includes(location.pathname) && userRole === "admin";

  // Pages for Hotel Dashboard: Show only My Hotel, Add Hotel, Logout
  const hotelPages = ["/Hotel", "/hoteladd"];
  const isHotelPage = hotelPages.includes(location.pathname) && userRole === "hotel";

  // Pages for Customer: Show only Home, Available Hotels, Contact Us, Logout
  const customerPages = ["/home", "/contact"];
  const isCustomerPage = customerPages.includes(location.pathname) && userRole === "user";

  return (
    <header>
      <div className="header">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
              <div className="full">
                <div className="center-desk">
                  <div className="logo">
                    <a href="/">
                      <img src="images/logo.png" alt="Logo" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
              <nav className="navigation navbar navbar-expand-md navbar-dark">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarsExample04"
                  aria-controls="navbarsExample04"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarsExample04">
                  <ul className="navbar-nav mr-auto">
                    {isBasicPage ? (
                      // Show Home, About, Gallery, Contact, and Login on Index, About, Gallery, Contact
                      <>
                        <li className="nav-item">
                          <a className="nav-link" href="/">
                            Home
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/about">
                            About Us
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/gallery">
                            Gallery
                          </a>
                        </li>
                        {/* <li className="nav-item">
                          <a className="nav-link" href="/contact">
                            Contact Us
                          </a>
                        </li> */}
                        <li className="nav-item">
                          <a className="nav-link" href="/login">
                            Login
                          </a>
                        </li>
                      </>
                    ) : isAdminPage ? (
                      // Show Only Hotels, Approval, and Logout on Admin & Approval Pages
                      <>
                        <li className="nav-item">
                          <a className="nav-link" href="/admin">
                            Hotels
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/approval">
                            Approval
                          </a>
                        </li>
                        <li className="nav-item">
                          <button className="nav-link btn-link" onClick={handleLogout}>
                            Logout
                          </button>
                        </li>
                      </>
                    ) : isHotelPage ? (
                      // Show Only MyHotel, AddHotel, and Logout on Hotel Pages
                      <>
                        <li className="nav-item">
                          <a className="nav-link" href="/Hotel">
                            My Hotel
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/hoteladd">
                            Add Hotel
                          </a>
                        </li>
                        <li className="nav-item">
                          <button className="nav-link btn-link" onClick={handleLogout}>
                            Logout
                          </button>
                        </li>
                      </>
                    ) : isCustomerPage ? (
                      // Show Only Home, Available Hotels, Contact Us, and Logout for Customers
                      <>
                        <li className="nav-item">
                          <a className="nav-link" href="/">
                            Home
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/home">
                            Available Hotels
                          </a>
                        </li>
                        {/* <li className="nav-item">
                          <a className="nav-link" href="/contact">
                            Contact Us
                          </a>
                        </li> */}
                        <li className="nav-item">
                          <button className="nav-link btn-link" onClick={handleLogout}>
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      // Role-Based Navigation for Other Pages
                      <>
                        <li className="nav-item">
                          <a className="nav-link" href="/">
                            Home
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/about">
                            About
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/gallery">
                            Gallery
                          </a>
                        </li>
                        {/* <li className="nav-item">
                          <a className="nav-link" href="/contact">
                            Contact Us
                          </a>
                        </li> */}

                        {/* User Role Based Links */}
                        {userRole === "admin" && (
                          <>
                            <li className="nav-item">
                              <a className="nav-link" href="/admin">
                                Hotels
                              </a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="/approval">
                                Approval
                              </a>
                            </li>
                          </>
                        )}

                        {userRole === "hotel" && (
                          <>
                            <li className="nav-item">
                              <a className="nav-link" href="/hoteladd">
                                Add Hotel
                              </a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="/Hotel">
                                My Hotel
                              </a>
                            </li>
                          </>
                        )}

                        {userRole === "user" && (
                          <>
                            <li className="nav-item">
                              <a className="nav-link" href="/home">
                                Available Hotels
                              </a>
                            </li>
                          </>
                        )}

                        {/* Logout Button */}
                        {userRole && (
                          <li className="nav-item">
                            <button className="nav-link btn-link" onClick={handleLogout}>
                              Logout
                            </button>
                          </li>
                        )}
                      </>
                    )}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
