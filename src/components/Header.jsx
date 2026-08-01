import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../css/header.css";
import logo from "../images/logo.webp";
// import stickyLogo from "../images/logo_black.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header-laravel ${isSticky ? "sticky" : ""}`}>
      {/* Menu Icon (Left Side) */}
      <div className={`menu-toggle-laravel ${menuOpen ? "hide-menu" : ""}`} onClick={toggleMenu}>
        {!menuOpen && (
          <div className="menu-icon-laravel">
            <span className="icon-bar-laravel"></span>
            <span className="icon-bar-laravel"></span>
            <span className="icon-bar-laravel"></span>
          </div>
        )}
      </div>

      {/* Logo (Centered) */}
      <div className="logo">
        <Link to="/"> {/* Replace <a> with <Link> */}
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Close Icon (Right Side) */}
      {menuOpen && (
        <div className="close-toggle-laravel" onClick={toggleMenu}>
          <span className="close-icon-laravel">✕</span>
        </div>
      )} 

      {/* Navigation Menu */}
      <nav className={`nav-laravel ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/" onClick={closeMenu}>home</Link></li> {/* Use Link instead of a */}
          <li><Link to="/about-us" onClick={closeMenu}>about us</Link></li> {/* Use Link instead of a */}
          <li><Link to="/services" onClick={closeMenu}>services</Link></li> {/* Use Link instead of a */}
          <li><Link to="/contact" onClick={closeMenu}>contact</Link></li> {/* Use Link instead of a */}
          <li><Link to="/blog" onClick={closeMenu}>blogs</Link></li>
        </ul>
        <Link to="/apply-now">
          <button className="btn-apply-now">APPLY NOW</button>
        </Link>
        <Link to="/repay-loan">
          <button className="btn-pay-now">PAY NOW</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
