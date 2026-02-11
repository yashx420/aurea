import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Gift,
  User,
  ChevronDown,
  ShoppingCart,
  Moon,
  Sun,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import styles from "./Header.module.css";

const Header = () => {
  const { getCartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check user role
    const role = localStorage.getItem("userRole");
    setUserRole(role);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.headerInner}`}>
        <Link to="/" className={styles.logo}>
          <img
            src="/logo Aurea(1).png"
            alt="Auréa Gifting"
            className={styles.logoImg}
            fetchPriority="high"
            loading="eager"
          />
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navActive : ""}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            About Us
          </Link>
          <div
            className={styles.dropdown}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className={styles.dropbtn}>
              Explore Experiences{" "}
              <ChevronDown size={14} className={styles.chevron} />
            </button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className={styles.dropdownContent}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to="/experiences"
                    className={styles.allLink}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    All Experiences
                  </Link>
                  <Link
                    to="/category/adventure"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Adventure & Thrill
                  </Link>
                  <Link
                    to="/category/corporate"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Corporate Experience
                  </Link>
                  <Link
                    to="/category/creative"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Creative & Artistic
                  </Link>
                  <Link
                    to="/category/culinary"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Culinary & Gourmet
                  </Link>
                  <Link
                    to="/category/culture"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Culture & Heritage
                  </Link>
                  <Link
                    to="/category/gaming"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Gaming & Entertainment
                  </Link>
                  <Link
                    to="/category/luxury"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Luxury & Lifestyle
                  </Link>
                  <Link
                    to="/category/occasion"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Special Occasion Experiences
                  </Link>
                  <Link
                    to="/category/wellness"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Wellness & Relaxation
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link to="/partner-with-us" onClick={() => setIsMenuOpen(false)}>
            Partner With Us
          </Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
            Contact Us
          </Link>
          <Link to="/redeem" onClick={() => setIsMenuOpen(false)}>
            Redeem Voucher
          </Link>
        </nav>

        <div className={styles.actions}>
          {userRole === "vendor" || userRole === "admin" ? (
            <Link
              to={
                userRole === "vendor" ? "/vendor/dashboard" : "/admin/dashboard"
              }
              className={styles.dashboardLink}
            >
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className={styles.iconBtn} aria-label="Account">
              <User size={20} />
            </Link>
          )}
          <button
            onClick={toggleTheme}
            className={styles.themeBtn}
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link
            to="/cart"
            className={styles.cartBtn}
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </Link>

          <button
            className={styles.menuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
