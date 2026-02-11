import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  Phone,
  MapPin,
  Mail,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
} from "lucide-react";
import Header from "./components/Header";
import Home from "./pages/Home";
import ExperienceDetail from "./pages/ExperienceDetail";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CategoryPage from "./pages/CategoryPage";
import About from "./pages/About";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PartnerWithUs from "./pages/PartnerWithUs";
import Contact from "./pages/Contact";
import RedeemVoucher from "./pages/RedeemVoucher";
import Feedback from "./pages/Feedback";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/admin/dashboard", "/vendor/dashboard"];
  const hideFooterRoutes = ["/admin/dashboard", "/vendor/dashboard"];

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="app">
          <ScrollToTop />
          {!hideHeaderRoutes.includes(location.pathname) && <Header />}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/partner-with-us" element={<PartnerWithUs />} />
              <Route path="/experiences" element={<Products />} />
              <Route path="/category/:categorySlug" element={<Products />} />
              <Route path="/experience/:id" element={<ExperienceDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/redeem" element={<RedeemVoucher />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/vendor/dashboard" element={<VendorDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfUse />} />
            </Routes>
          </main>

          {!hideFooterRoutes.includes(location.pathname) && (
            <footer className="footer">
              <div className="container">
                <div className="footer-grid">
                  <div className="footer-col">
                    <h4>Contact Us:</h4>
                    <ul className="footer-contact">
                      <li>
                        <Phone size={16} /> +91 90513 71216
                      </li>
                      <li>
                        <MapPin size={16} /> Dynasty Business Park, 4th Floor,
                        Andheri Kurla Road, Andheri East, Mumbai — 400059
                      </li>
                      <li>
                        <Mail size={16} /> customercare@aureagifts.com
                      </li>
                    </ul>
                  </div>

                  <div className="footer-col">
                    <h4>Top Selling</h4>
                    <ul className="footer-links">
                      <li>
                        <Link to="/category/adventure">Adventure & Thrill</Link>
                      </li>
                      <li>
                        <Link to="/category/corporate">
                          Corporate Experience
                        </Link>
                      </li>
                      <li>
                        <Link to="/category/creative">Creative & Artistic</Link>
                      </li>
                      <li>
                        <Link to="/category/culinary">Culinary & Gourmet</Link>
                      </li>
                      <li>
                        <Link to="/category/culture">Culture & Heritage</Link>
                      </li>
                      <li>
                        <Link to="/category/gaming">
                          Gaming & Entertainment
                        </Link>
                      </li>
                      <li>
                        <Link to="/category/luxury">Luxury & Lifestyle</Link>
                      </li>
                      <li>
                        <Link to="/category/occasion">
                          Special Occasion Experiences
                        </Link>
                      </li>
                      <li>
                        <Link to="/category/wellness">
                          Wellness & Relaxation
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="footer-col">
                    <h4>Useful Info</h4>
                    <ul className="footer-links">
                      <li>
                        <Link to="/about">About Us</Link>
                      </li>
                      <li>
                        <Link to="/faqs">FAQs</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact Us</Link>
                      </li>
                      <li>
                        <Link to="/partner-with-us">Partner With Us</Link>
                      </li>
                      <li>
                        <Link to="/feedback">Feedback</Link>
                      </li>
                      <li>
                        <Link to="/redeem">Redeem Voucher</Link>
                      </li>
                      <li>
                        <Link to="/terms">Terms Of Use</Link>
                      </li>
                      <li>
                        <Link to="/privacy">Privacy Policy</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="footer-col">
                    <h4>Customer Area</h4>
                    <ul className="footer-links">
                      <li>
                        <Link to="/account">My Account</Link>
                      </li>
                      <li>
                        <Link to="/wishlist">Wishlist</Link>
                      </li>
                      <li>
                        <Link to="/cart">Shopping Cart</Link>
                      </li>
                      <li>
                        <Link to="/checkout">Checkout</Link>
                      </li>
                      <li>
                        <Link to="/history">Ordered History</Link>
                      </li>
                    </ul>
                    <div className="footer-social">
                      <a
                        href="https://www.facebook.com/profile.php?id=100088226359679&locale=en_GB"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon facebook"
                      >
                        <Facebook size={20} />
                      </a>
                      <a
                        href="https://www.instagram.com/aurea_gifting_experiences/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon instagram"
                      >
                        <Instagram size={20} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="footer-bottom">
                  <div className="footer-bottom-left">
                    <p>© Copyright 2026 Aurea.</p>
                  </div>
                  <div className="footer-trust">
                    <img
                      src="/trust-badge.png"
                      alt="Trust Badges"
                      className="trust-img"
                    />
                  </div>
                  <div className="footer-payment">
                    <img
                      src="/payment.png"
                      alt="Payment Methods"
                      className="payment-img"
                    />
                  </div>
                </div>
              </div>
            </footer>
          )}
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
