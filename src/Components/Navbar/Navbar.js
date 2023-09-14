import React, { useEffect, useState } from "react";
import "./navbar.css";
import secureLocalStorage from "react-secure-storage";

function NavBar() {
  const [location, setLocation] = useState("");
  const [admin, setAdmin] = useState(false);
  const [logAdm, setLogAdm] = useState("/login");

  const [width, setWidth] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(false);

  //Dynamically being called to update hook on resize
  function setDimensions() {
    setWidth(window.innerWidth);
  }

  function getLocalUser() {
    if (secureLocalStorage.getItem("user") == "Erlend") {
      setLogAdm("/admin");
    }
  }

  useEffect(() => {
    window.addEventListener("resize", setDimensions);

    //Cleanup
    return () => window.removeEventListener("resize", setDimensions);
  }, [window.innerWidth]);

  useEffect(() => {
    setLocation(window.location.pathname);
    /**Checks the web resource to determine if login has been successful, and determine if the original navbar should be displayed
     * or not.
     */
    if (window.location.pathname === "/admin") {
      setAdmin(true);
    }
  }, []);
  return (
    <nav
      className={
        admin == true ? "admin" : width > 1025 ? "nav" : "navbar mobile"
      }
    >
      {width < 1025 && (
        <>
          {/** Hamburger Menu*/}
          <div
            id={showMenu ? "hamburgerActive" : "hamburger"}
            onClick={() => setShowMenu(!showMenu)}
          >
            <div className={showMenu ? "lines first active" : "lines first"} />
            <div
              className={showMenu ? "lines second active" : "lines second"}
            />
            <div className={showMenu ? "lines third active" : "lines third"} />
          </div>
        </>
      )}
      <span
        className={width < 1025 ? "navbar-links-mobile" : "nav"}
        style={{ width: width < 1025 ? (showMenu ? "40%" : 0) : "100vw" }}
      >
        <div className={width > 1025 ? "nav-left" : null}>
          <a
            href="/"
            className={location == "/" ? "active" : "nav-link"}
            onClick={() => setShowMenu(false)}
          >
            <span>Hjem</span>
          </a>
          <a
            href="/statistics"
            className={location == "/statistics" ? "active" : "nav-link"}
            onClick={() => setShowMenu(false)}
          >
            <span>Statistics</span>
          </a>
          <a
            href="/tournaments"
            className={location == "/tournaments" ? "active" : "nav-link"}
            onClick={() => setShowMenu(false)}
          >
            <span>Tournaments</span>
          </a>
        </div>
        <div className={width > 1025 ? "nav-right" : null}>
          <a
            href={logAdm}
            className={location == "/login" ? "active" : "nav-link login"}
            onClick={() => {
              setShowMenu(false);
              getLocalUser();
            }}
          >
            <span>Login</span>
          </a>
        </div>
      </span>
    </nav>
  );
}

export default NavBar;
