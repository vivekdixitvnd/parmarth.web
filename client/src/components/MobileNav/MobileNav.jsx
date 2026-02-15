import React, { useContext, useEffect, useState } from "react";
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
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [showLegDropdown, setShowLegDropdown] = useState(false);
  const [showActDropdown, setShowActDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Disable body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    if (!menuOpen) {
      setShowAEventsDropdown(false);
      setShowAdminsDropdown(false);
      setShowLegDropdown(false);
      setShowMoreDropdown(false);
      setShowOrgDropdown(false);
      setShowActDropdown(false);
    }
  }, [menuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Custom overlay click handler to close menu
  const handleOverlayClick = () => setMenuOpen(false);

  return (
    <>
      <Menu
        right
        width={280}
        isOpen={menuOpen}
        onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
        // customBurgerIcon={<img src="/menu-icon.png" alt="Menu" />}
        // customCrossIcon={<img src="/cross-icon.png" alt="Close" />}
      >
        {/* All your NavLink code remains the same */}
        {/* --- shortened for brevity --- */}
        <NavLink
          to="/"
          className={
            pathname === "/" ? "mobile-nav__active" : "mobile-nav__link"
          }
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
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              setShowOrgDropdown(!showOrgDropdown);
              setShowAEventsDropdown(false);
              setShowAdminsDropdown(false);
              setShowLegDropdown(false);
              setShowMoreDropdown(false);
              setShowActDropdown(false);
            }}
          >
            Organization
            <RiArrowDropDownLine size={25} />
          </span>

          {showOrgDropdown && (
            <div className="mobile-nav__dropdown">
              <ul>
                <li>
                  <NavLink
                    to="/governing"
                    className={
                      pathname === "/governing"
                        ? "mobile-nav__active"
                        : "mobile-nav__link"
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
                      pathname === "/advisory"
                        ? "mobile-nav__active"
                        : "mobile-nav__link"
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
                      pathname === "/executive"
                        ? "mobile-nav__active"
                        : "mobile-nav__link"
                    }
                    style={{ fontSize: "18px" }}
                  >
                    Executive Council
                  </NavLink>
                </li>

                {/* Legacy Executive Council with Sub-dropdown */}
                <li style={{ position: "relative" }}>
                  <NavLink
                    to="#"
                    className={
                      pathname === "#"
                        ? "mobile-nav__active"
                        : "mobile-nav__link"
                    }
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                    }}
                    onClick={() => {
                      setShowLegDropdown(!showLegDropdown);
                      setShowAEventsDropdown(false);
                      setShowAdminsDropdown(false);
                      setShowMoreDropdown(false);
                      setShowActDropdown(false);
                    }}
                  >
                    Legacy Executive Council
                    <RiArrowDropDownLine size={25} />
                  </NavLink>

                  {showLegDropdown && (
                    <div
                      className="mobile-nav__dropdown"
                      style={{
                        display: "block",
                        position: "absolute",
                        top: "15px",
                        // right: "100%",
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 0 10px #ccc",
                        border: "1px solid #277bc0",
                        // paddingTop: "1rem",
                        marginTop: "1rem",
                        zIndex: 20,
                      }}
                    >
                      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                        <li>
                          <NavLink
                            to="/presidents"
                            className={
                              pathname === "/presidents"
                                ? "mobile-nav__active"
                                : "mobile-nav__link"
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
                              pathname === "/vp"
                                ? "mobile-nav__active"
                                : "mobile-nav__link"
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
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              setShowActDropdown(!showActDropdown);
              setShowOrgDropdown(false);
              setShowAEventsDropdown(false);
              setShowAdminsDropdown(false);
              setShowLegDropdown(false);
              setShowMoreDropdown(false);
            }}
          >
            Activites
            <RiArrowDropDownLine size={25} />
          </span>
          {showActDropdown && (
            <div className="mobile-nav__dropdown">
              <ul>
                <li>
                  <NavLink
                    to="/recent-act"
                    className={
                      pathname === "/recent-act"
                        ? "mobile-nav__active"
                        : "mobile-nav__link"
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
                        ? "mobile-nav__active"
                        : "mobile-nav__link"
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
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              setShowAEventsDropdown(!showEventsDropdown);
              setShowOrgDropdown(false);
              setShowAdminsDropdown(false);
              setShowLegDropdown(false);
              setShowMoreDropdown(false);
              setShowActDropdown(false);
            }}
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
                      pathname === "/udgam"
                        ? "mobile-nav__active"
                        : "mobile-nav__link"
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
                      pathname === "/ummeed"
                        ? "mobile-nav__active"
                        : "mobile-nav__link"
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
                      pathname === "/unnayan"
                        ? "mobile-nav__active"
                        : "mobile-nav__link"
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
                      pathname === "/utsaah"
                        ? "mobile-nav__active"
                        : "mobile-nav__link"
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
                      pathname === "/utsarg"
                        ? "mobile-nav__active"
                        : "mobile-nav__link"
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
                      pathname === "/muskan"
                        ? "mobile-nav__active"
                        : "mobile-nav__link"
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
                      pathname === "/eduvisit"
                        ? "mobile-nav__active"
                        : "mobile-nav__link"
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
                      pathname === "/bloddonation"
                        ? "mobile-nav__active"
                        : "mobile-nav__link"
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
                        ? "mobile-nav__active"
                        : "mobile-nav__link"
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
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              setShowMoreDropdown(!showMoreDropdown);
              setShowOrgDropdown(false);
              setShowAEventsDropdown(false);
              setShowAdminsDropdown(false);
              setShowLegDropdown(false);
              setShowActDropdown(false);
            }}
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
                    to="/RTE/"
                    className={
                      pathname === "/RTE/"
                        ? "mobile-nav__active"
                        : "mobile-nav__link"
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
                      pathname === "/volunteers"
                        ? "mobile-nav__active"
                        : "mobile-nav__link"
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
                      pathname === "/EventVolunteers"
                        ? "mobile-nav__active"
                        : "mobile-nav__link"
                    }
                    style={{ fontSize: "18px" }}
                  >
                    Event Volunteers Data
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
              onClick={() => {
                setShowAdminsDropdown(!showAdminsDropdown);
                setShowOrgDropdown(false);
                setShowAEventsDropdown(false);
                setShowLegDropdown(false);
                setShowMoreDropdown(false);
                setShowActDropdown(false);
              }}
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
                  {(userType === "master" || userType === "media") && (
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
                  {userType === "master" && (
                    <li>
                      <NavLink
                        to="/manage-organization"
                        className={
                          pathname === "/manage-organization"
                            ? "mobile-nav__active"
                            : "mobile-nav__link"
                        }
                        style={{ fontSize: "18px" }}
                      >
                        Manage Organization
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
        {isLoggedIn &&
          (userType == "master" || userType == "media") &&
          pathname !== "/create-post" && (
            <button
              className="mobile-nav__create-post"
              onClick={() => navigate("/create-post")}
            >
              CREATE POST
            </button>
          )}
        {isLoggedIn &&
          pathname !== "/change-pass" && (
            <button
              className="mobile-nav__create-post"
              onClick={() => navigate("/change-pass")}
            >
              CHANGE PASSWORD
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

      {menuOpen && (
        <div className="mobile-nav__overlay" onClick={handleOverlayClick}></div>
      )}
    </>
  );
};
export default MobileNav;
