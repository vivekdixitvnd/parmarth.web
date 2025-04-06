import React, { useContext, useState } from "react";
import "./MobileNav.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { RiArrowDropDownLine } from "react-icons/ri";
import AuthContext from "../../store/auth-context";
import toast from "react-hot-toast";

const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const userType = authCtx.userType;
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showAdminsDropdown, setShowAdminsDropdown] = useState(false);
  const [showEventsDropdown, setShowAEventsDropdown] = useState(false);

  return (
    <Menu right width={280}>
      <NavLink
        to="/"
        className={pathname === "/" ? "mobile-nav__active" : "mobile-nav__link"}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={
          pathname === "/about" ? "mobile-nav__active" : "mobile-nav__link"
        }
      >
        About
      </NavLink>
      <NavLink
        to="/team"
        className={
          pathname === "/about" ? "mobile-nav__active" : "mobile-nav__link"
        }
      >
        Team
      </NavLink>
      <NavLink
                to="/events"
                className={pathname === "/events" ? "mobile-nav__active" : "mobile-nav__link"}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  Recent Activity
                </span>
              </NavLink>
      <NavLink
        to="#"
        className={pathname === "#" ? "mobile-nav__active" : "mobile-nav__link"}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowAEventsDropdown(!showEventsDropdown)}
        >
           Events 
           <RiArrowDropDownLine size={25} />
           </span>
                      {showEventsDropdown && (
                        <div className="mobile-nav__dropdown">
                          <ul>
                            <li>
                              <NavLink
                                to="/udgam"
                                className={
                                  pathname === "/udgam" ? "mobile-nav__active" : "mobile-nav__link"
                                }
                                style={{ fontSize: "18px" }}
                              >
                                <b>उद्गम</b>
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/ummeed"
                                className={
                                  pathname === "/ummeed" ? "mobile-nav__active" : "mobile-nav__link"
                                }
                                style={{ fontSize: "18px" }}
                              >
                                <b>उम्मीद</b>
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/unnayan"
                                className={
                                  pathname === "/unnayan" ? "mobile-nav__active" : "mobile-nav__link"
                                }
                                style={{ fontSize: "18px" }}
                              >
                                <b>उन्नयन</b>
                              </NavLink>
                            </li>
                            
                            <li>
                              <NavLink
                                to="/utsaah"
                                className={
                                  pathname === "/utsaah" ? "mobile-nav__active" : "mobile-nav__link"
                                }
                                style={{ fontSize: "18px" }}
                              >
                                <b>उत्साह</b>
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/utsarg"
                                className={
                                  pathname === "/utsarg" ? "mobile-nav__active" : "mobile-nav__link"
                                }
                                style={{ fontSize: "18px" }}
                              >
                                <b>उत्सर्ग</b>
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/muskan"
                                className={
                                  pathname === "/muskan" ? "mobile-nav__active" : "mobile-nav__link"
                                }
                                style={{ fontSize: "18px" }}
                              >
                                <b>मुस्कान</b>
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/eduvisit"
                                className={
                                  pathname === "/eduvisit" ? "mobile-nav__active" : "mobile-nav__link"
                                }
                                style={{ fontSize: "18px" }}
                              >
                                <b>शैक्षणिक भ्रमण</b>
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/blooddonation"
                                className={
                                  pathname === "/booddonation"
                                    ? "mobile-nav__active" : "mobile-nav__link"
                                }
                                style={{ fontSize: "18px" }}
                              >
                                <b>रक्तदान महादान</b>
                                </NavLink>
                                </li>
                                
                            <li>
                              <NavLink
                                to="/utsav"
                                className={
                                  pathname === "/utsav"
                                   ? "mobile-nav__active" : "mobile-nav__link"
                                }
                                style={{ fontSize: "18px" }}
                              >
                                <b>उत्सव आयोजन</b>
                              </NavLink>
                            </li>                 
                          </ul>
                        </div>
                      )}

      </NavLink>
      <NavLink
        to="#"
        className={pathname === "#" ? "mobile-nav__active" : "mobile-nav__link"}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowMoreDropdown(!showMoreDropdown)}
        >
          More
          <RiArrowDropDownLine size={25} />
        </span>
        {showMoreDropdown && (
          <div className="mobile-nav__dropdown">
            <ul>
              <li>
                <NavLink
                  to="/article"
                  className={
                    pathname === "/article"
                      ? "mobile-nav__active"
                      : "mobile-nav__link"
                  }
                  style={{ fontSize: "18px" }}
                >
                  Articles
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/request-for-certificate"
                  className={
                    pathname === "/request-for-certificate"
                      ? "mobile-nav__active"
                      : "mobile-nav__link"
                  }
                  style={{ fontSize: "18px" }}
                >
                  Request for Certificate
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/constitution"
                  className={
                    pathname === "/constitution"
                      ? "mobile-nav__active"
                      : "mobile-nav__link"
                  }
                  style={{ fontSize: "18px" }}
                >
                  परमार्थ का संविधान
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/schooling/"
                  className={
                    pathname === "/schooling/"
                      ? "mobile-nav__active"
                      : "mobile-nav__link"
                  }
                  style={{ fontSize: "18px" }}
                >
                  Get RTE Data
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="#"
          className={
            pathname === "#" ? "mobile-nav__active" : "mobile-nav__link"
          }
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            onClick={() => setShowAdminsDropdown(!showAdminsDropdown)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Admin Options
            <RiArrowDropDownLine size={25} />
          </span>
          {showAdminsDropdown && (
            <div className="mobile-nav__dropdown">
              <ul>
                {(userType === "master" || userType === "teachers") && (
                  <li>
                    <NavLink
                      to="/request-received"
                      className={
                        pathname === "/request-received"
                          ? "mobile-nav__active"
                          : "mobile-nav__link"
                      }
                      style={{ fontSize: "18px" }}
                    >
                      Requests Received
                    </NavLink>
                  </li>
                )}
                {(userType === "master" || userType === "media") && (
                  <li>
                    <NavLink
                      to="/add-rte-data"
                      className={
                        pathname === "/add-rte-data"
                          ? "mobile-nav__active"
                          : "mobile-nav__link"
                      }
                      style={{ fontSize: "18px" }}
                    >
                      Add RTE Data
                    </NavLink>
                  </li>
                )}
                {(userType === "master" || userType === "teachers") && (
                  <li>
                    <NavLink
                      to="/volunteers-data"
                      className={
                        pathname === "/volunteers-data"
                          ? "mobile-nav__active"
                          : "mobile-nav__link"
                      }
                      style={{ fontSize: "18px" }}
                    >
                      Get Volunteers Data
                    </NavLink>
                  </li>
                )}
                {(userType === "master" ||
                  userType === "media") && (
                  <li>
                    <NavLink
                      to="/add-volunteer-data"
                      className={
                        pathname === "/add-volunteer-data"
                          ? "mobile-nav__active"
                          : "mobile-nav__link"
                      }
                      style={{ fontSize: "18px" }}
                    >
                      Add Volunteer Data
                    </NavLink>
                  </li>
                )}
                {(userType === "master" || userType === "teachers") && (
                  <li>
                    <NavLink
                      to="/event-volunteers-data"
                      className={
                        pathname === "/event-volunteers-data"
                          ? "mobile-nav__active"
                          : "mobile-nav__link"
                      }
                      style={{ fontSize: "18px" }}
                    >
                      Get Event Volunteers Data
                    </NavLink>
                  </li>
                )}
                {(userType === "master" ||
                  userType === "media") && (
                  <li>
                    <NavLink
                      to="/add-event-volunteers-data"
                      className={
                        pathname === "/add-event-volunteers-data"
                          ? "mobile-nav__active"
                          : "mobile-nav__link"
                      }
                      style={{ fontSize: "18px" }}
                    >
                      Add Event Volunteers Data
                    </NavLink>
                  </li>
                )}
                {(userType === "master" ||
                  userType === "media") && (
                  <li>
                    <NavLink
                      to="/list-posts"
                      className={
                        pathname === "/list-posts"
                          ? "mobile-nav__active"
                          : "mobile-nav__link"
                      }
                      style={{ fontSize: "18px" }}
                    >
                      List Posts
                    </NavLink>
                  </li>
                )}
                {userType === "master" && (
                  <li>
                    <NavLink
                      to="/create-user"
                      className={
                        pathname === "/create-user"
                          ? "mobile-nav__active"
                          : "mobile-nav__link"
                      }
                      style={{ fontSize: "18px" }}
                    >
                      Create User
                    </NavLink>
                  </li>
                )}
                {userType === "master" && (
                  <li>
                    <NavLink
                      to="/list-users"
                      className={
                        pathname === "/list-users"
                          ? "mobile-nav__active"
                          : "mobile-nav__link"
                      }
                      style={{ fontSize: "18px" }}
                    >
                      List Users
                    </NavLink>
                  </li>
                )}
                {/* <li>
                  <NavLink
                    to="/convert-url"
                    className={
                      pathname === "/convert-url"
                        ? "mobile-nav__active"
                        : "mobile-nav__link"
                    }
                    style={{ fontSize: "18px" }}
                  >
                    Convert URL
                  </NavLink>
                </li> */}
              </ul>
            </div>
          )}
        </NavLink>
      )}
      {isLoggedIn && (userType == "master" || userType == "media")  && pathname !== "/create-post" && (
        <button
          className="mobile-nav__create-post"
          onClick={() => navigate("/create-post")}
        >
          CREATE POST
        </button>
      )}
      {!isLoggedIn ? (
        <button
          className="mobile-nav__login"
          onClick={() => navigate("/login")}
        >
          LOGIN
        </button>
      ) : (
        <button
          className="mobile-nav__login"
          onClick={() => {
            authCtx.logout();
            navigate("/");
            toast.success("Successfully logged out");
          }}
        >
          LOGOUT
        </button>
      )}
    </Menu>
  );
};

export default MobileNav;
