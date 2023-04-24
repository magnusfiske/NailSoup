import { useState, useEffect } from "react";
import "./NavBar.css";
import "./NavFunc";
import { Burger } from "./burger.jsx";
import { NavLink } from "react-router-dom";

function NavBar() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 730);

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 730);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, [isMobile]);

  return (
    <div className="NavBar">
      <a href="./">
        <img src="#" className="Logotype" alt="Logotype" />
      </a>
      <div className="NaviIntro">
        <button onClick={() => setVisible(!visible)}>
          <Burger></Burger>
        </button>
        <p>Nail Soup</p>
        <div className="searchIcon">
          <img
            src="src/assets/components/navBar/pngegg.png"
            alt="Search recipe"
          />
        </div>
      </div>
      {!isMobile || visible ? (
        <ul>
          <li className="navOpt">
            <NavLink to="/">
              <p>Home</p>
            </NavLink>
          </li>
          <li className="navOpt">
            <NavLink to="/about">
              <p>About</p>
            </NavLink>
          </li>
          <li className="navOpt">
            <NavLink to="/contact">
              <p>Contact</p>
            </NavLink>
          </li>
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}

export { NavBar };
