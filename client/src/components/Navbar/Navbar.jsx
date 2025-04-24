import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MobileNav from "../MobileNav/MobileNav";
import styles from "./Navbar.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import AuthContext from "../../store/auth-context";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const userType = authCtx.userType;

  const [width, setWidth] = useState(window.innerWidth);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showAdminsDropdown, setShowAdminsDropdown] = useState(false);
  const [showEventsDropdown, setShowAEventsDropdown] = useState(false);
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [showLegDropdown, setShowLegDropdown] = useState(false);
  const [showActDropdown, setShowActDropdown] = useState(false);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div id="navbar" className={styles.navbar}>
      {width >= 1300 ? (
        <div className={styles.logo} onClick={() => navigate("/")}></div>
      ) : (
        <div></div>
      )}
      <div
        className={styles["nav-links"]}
        style={{
          display: width >= 1300 ? "flex" : "none",
        }}
      >
        <NavLink
          to="/"
          className={pathname === "/" ? styles.active : styles.link}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            Home
          </span>
        </NavLink>
        <NavLink
          to="/about"
          className={pathname === "/about" ? styles.active : styles.link}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            About
          </span>
        </NavLink>

        <NavLink
          to="#"
          className={
            pathname.startsWith("/organization") ? styles.active : styles.link
          }
          style={{ position: "relative" }}
          onMouseEnter={() => setShowOrgDropdown(true)}
          onMouseLeave={() => setShowOrgDropdown(false)}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            Organization
            <RiArrowDropDownLine size={25} />
          </span>

          {showOrgDropdown && (
            <div className={styles.dropdown}>
              <ul>
                <li>
                  <NavLink
                    to="/governing"
                    className={
                      pathname === "/governing" ? styles.active : styles.link
                    }
                    style={{ fontSize: "18px" }}
                  >
                    Governing Council
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/advisory"
                    className={
                      pathname === "/advisory" ? styles.active : styles.link
                    }
                    style={{ fontSize: "18px" }}
                  >
                    Advisory Council
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/executive"
                    className={
                      pathname === "/executive" ? styles.active : styles.link
                    }
                    style={{ fontSize: "18px" }}
                  >
                    Executive Council
                  </NavLink>
                </li>

                {/* Legacy Executive Council with Sub-dropdown */}
                <li
                  style={{ position: "relative" }}
                  onMouseEnter={() => setShowLegDropdown(true)}
                  onMouseLeave={() => setShowLegDropdown(false)}
                >
                  <NavLink
                    to="#"
                    className={
                      pathname.startsWith("/legacy")
                        ? styles.active
                        : styles.link
                    }
                    style={{
                      fontSize: "18px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Legacy Executive Council
                    <RiArrowDropDownLine size={25} />
                  </NavLink>

                  {showLegDropdown && (
                    <div
                      className={styles.subDropdown}
                      style={{
                        display: "block",
                        position: "absolute",
                        top: "0",
                        left: "100%",
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 0 10px #ccc",
                        border: "1px solid #277bc0",
                        padding: "1rem",
                        zIndex: 20,
                      }}
                    >
                      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                        <li>
                          <NavLink
                            to="/presidents"
                            className={
                              pathname === "/presidents"
                                ? styles.active
                                : styles.link
                            }
                            style={{ fontSize: "18px" }}
                          >
                            Past Presidents
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/vp"
                            className={
                              pathname === "/vp" ? styles.active : styles.link
                            }
                            style={{ fontSize: "18px" }}
                          >
                            Past Vice President
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          )}
        </NavLink>

        <NavLink
          to="#"
          className={pathname === "#" ? styles.active : styles.link}
          style={{ position: "relative" }}
          onMouseEnter={() => setShowActDropdown(!showActDropdown)}
          onMouseLeave={() => setShowActDropdown(!showActDropdown)}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Activities
            <RiArrowDropDownLine size={25} />
          </span>
          {showActDropdown && (
            <div className={styles.dropdown}>
              <ul>
                <li>
                  <NavLink
                    to="/recent-act"
                    className={
                      pathname === "/recent-act" ? styles.active : styles.link
                    }
                    style={{ fontSize: "18px" }}
                  >
                    Recent Activites
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/past-act"
                    className={
                      pathname === "/past-act"
                        ? styles.active
                        : styles.link
                    }
                    style={{ fontSize: "18px" }}
                  >
                    Past Activities
                  </NavLink>
                </li>
               
                
              </ul>
            </div>
          )}
        </NavLink>

        {/* <NavLink
          to="/events"
          className={pathname === "/events" ? styles.active : styles.link}
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
        </NavLink> */}
        <NavLink
          to="#"
          className={pathname === "#" ? styles.active : styles.link}
          style={{ position: "relative" }}
          onMouseEnter={() => setShowAEventsDropdown(!showEventsDropdown)}
          onMouseLeave={() => setShowAEventsDropdown(!showEventsDropdown)}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            Events
            <RiArrowDropDownLine size={25} />
            {showEventsDropdown && (
              <div className={styles.dropdown}>
                <ul>
                  <li>
                    <NavLink
                      to="/udgam"
                      className={
                        pathname === "/udgam" ? styles.active : styles.link
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
                        pathname === "/ummeed" ? styles.active : styles.link
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
                        pathname === "/unnayan" ? styles.active : styles.link
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
                        pathname === "/utsaah" ? styles.active : styles.link
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
                        pathname === "/utsarg" ? styles.active : styles.link
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
                        pathname === "/muskan" ? styles.active : styles.link
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
                        pathname === "/eduvisit" ? styles.active : styles.link
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
                          ? styles.active
                          : styles.link
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
                        pathname === "/utsav" ? styles.active : styles.link
                      }
                      style={{ fontSize: "18px" }}
                    >
                      <b>उत्सव आयोजन</b>
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </span>
        </NavLink>
        <NavLink
          to="#"
          className={pathname === "#" ? styles.active : styles.link}
          style={{ position: "relative" }}
          onMouseEnter={() => setShowMoreDropdown(!showMoreDropdown)}
          onMouseLeave={() => setShowMoreDropdown(!showMoreDropdown)}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            More
            <RiArrowDropDownLine size={25} />
          </span>
          {showMoreDropdown && (
            <div className={styles.dropdown}>
              <ul>
                <li>
                  <NavLink
                    to="/article"
                    className={
                      pathname === "article" ? styles.active : styles.link
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
                        ? styles.active
                        : styles.link
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
                      pathname === "/constitution" ? styles.active : styles.link
                    }
                    style={{ fontSize: "18px" }}
                  >
                    <strong>परमार्थ का संविधान</strong>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/RTE/"
                    className={
                      pathname === "/RTE/" ? styles.active : styles.link
                    }
                    style={{ fontSize: "18px" }}
                  >
                    Admission Data
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/volunteers"
                    className={
                      pathname === "/volunteers" ? styles.active : styles.link
                    }
                    style={{ fontSize: "18px" }}
                  >
                    Volunteers Data
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/event-volunteers"
                    className={
                      pathname === "/event-volunteers"
                        ? styles.active
                        : styles.link
                    }
                    style={{ fontSize: "18px" }}
                  >
                    Event Volunteers Data
                  </NavLink>
                </li>

                {!isLoggedIn ? (
                  <li style={{ marginTop: "1.5rem" }}>
                    <NavLink to="/login" className={styles.login}>
                      Login
                    </NavLink>
                  </li>
                ) : (
                  <li style={{ marginTop: "1.5rem" }}>
                    <NavLink
                      to="/"
                      className={styles.login}
                      onClick={() => {
                        authCtx.logout();
                        toast.success("Successfully logged out");
                      }}
                    >
                      Logout
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          )}
        </NavLink>
        {isLoggedIn && (
          <NavLink
            to="#"
            className={pathname === "#" ? styles.active : styles.link}
            style={{ position: "relative" }}
            onMouseEnter={() => setShowAdminsDropdown(!showAdminsDropdown)}
            onMouseLeave={() => setShowAdminsDropdown(!showAdminsDropdown)}
          >
            <span
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
              <div className={styles.dropdown}>
                <ul>
                  {(userType === "master" || userType === "teachers") && (
                    <li>
                      <NavLink
                        to="/request-received"
                        className={
                          pathname === "/request-received"
                            ? styles.active
                            : styles.link
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
                            ? styles.active
                            : styles.link
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
                        to="/add-volunteer-data"
                        className={
                          pathname === "/add-volunteer-data"
                            ? styles.active
                            : styles.link
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
                        to="/add-event-volunteers-data"
                        className={
                          pathname === "/add-event-volunteers-data"
                            ? styles.active
                            : styles.link
                        }
                        style={{ fontSize: "18px" }}
                      >
                        Add Event Volunteers Data
                      </NavLink>
                    </li>
                  )}
                  {(userType === "master" || userType === "media") && (
                    <li>
                      <NavLink
                        to="/create-post"
                        className={
                          pathname === "/create-post"
                            ? styles.active
                            : styles.link
                        }
                        style={{ fontSize: "18px" }}
                      >
                        Create Post
                      </NavLink>
                    </li>
                  )}
                  {(userType === "master" || userType === "media") && (
                    <li>
                      <NavLink
                        to="/list-posts"
                        className={
                          pathname === "/list-posts"
                            ? styles.active
                            : styles.link
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
                            ? styles.active
                            : styles.link
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
                            ? styles.active
                            : styles.link
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
                          ? styles.active
                          : styles.link
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
      </div>
      {width >= 1300 && (
        <div
          className={styles["iet-logo"]}
          onClick={() => window.open("https://ietlucknow.ac.in/", "_blank")}
        ></div>
      )}

      {/* Mobile Hamburger Menu */}
      {width < 1300 && (
        <div style={{ display: "flex" }}>
          <div
            className={styles.logo}
            onClick={() => navigate("/")}
            style={{ marginRight: "1rem" }}
          ></div>
          <div
            className={styles["iet-logo"]}
            onClick={() => window.open("https://ietlucknow.ac.in/", "_blank")}
          ></div>
        </div>
      )}
      {width < 1300 && <MobileNav />}
    </div>
  );
};

export default Navbar;
