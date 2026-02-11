import React, { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronDown, X } from "lucide-react";
import ExperienceCard from "../components/ExperienceCard";
import { experiences } from "../data/experiences";
import styles from "./Products.module.css";
import SEO from "../components/SEO";

const Products = () => {
  const { categorySlug } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");

  // Header defined before state initialization for use in useState
  // Map category names to banner images (using high-res versions where possible)
  const bannerImages = {
    "Adventure & Thrill": "/banners/adventure.png",
    "Creative & Artistic": "/banners/creative.png",
    "Culinary & Gourmet": "/banners/culinary.png",
    "Wellness & Relaxation": "/banners/wellness.png",
    "Gaming & Entertainment": "/banners/gaming.png",
    "Corporate Experience": "/banners/corporate.png",
    "Luxury & Lifestyle": "/banners/luxury.png",
    "Culture & Heritage": "/banners/culture.png",
    default: "/banners/default.png", // Banner for "All Experiences"
  };

  const getCategoryFromSlug = (slug) => {
    switch (slug) {
      case "adventure":
        return "Adventure & Thrill";
      case "culinary":
        return "Culinary & Gourmet";
      case "wellness":
        return "Wellness & Relaxation";
      case "corporate":
        return "Corporate Experience";
      case "creative":
        return "Creative & Artistic";
      case "culture":
        return "Culture & Heritage";
      case "gaming":
        return "Gaming & Entertainment";
      case "luxury":
        return "Luxury & Lifestyle";
      case "occasion":
        return "Special Occasion Experiences";
      default:
        return "All";
    }
  };

  const [selectedCategory, setSelectedCategory] = useState(() => {
    return categorySlug ? getCategoryFromSlug(categorySlug) : "All";
  });

  const [sortOrder, setSortOrder] = useState("default");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync selectedCategory with URL param if it changes
  useEffect(() => {
    if (categorySlug) {
      const catName = getCategoryFromSlug(categorySlug);
      setSelectedCategory(catName);
    } else {
      // If navigating to /experiences, we might want to reset, or keep current.
      // Usually reset to All if no slug.
      if (!categorySlug) setSelectedCategory("All");
    }
    // Only reset filters if the SLUG actually changes, implying a navigation event
    setSearchTerm("");
    setSelectedLocation("All");
    setSelectedDuration("All");
    window.scrollTo(0, 0);
  }, [categorySlug]);

  // Preload banner image for faster loading
  useEffect(() => {
    const currentBanner =
      bannerImages[selectedCategory] || bannerImages["default"];
    if (currentBanner) {
      const img = new Image();
      img.src = currentBanner;
    }
  }, [selectedCategory]);

  // Extract unique locations and categories
  const locations = ["All", ...new Set(experiences.map((exp) => exp.location))];

  const durations = ["All", "Short (< 4 Hours)", "Day Trip (Full Day)"];

  const filteredExperiences = useMemo(() => {
    return experiences
      .filter((exp) => {
        const matchesSearch = exp.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesLocation =
          selectedLocation === "All" || exp.location === selectedLocation;
        const matchesCategory =
          selectedCategory === "All" || exp.category === selectedCategory;

        let matchesDuration = true;
        if (selectedDuration === "Short (< 4 Hours)") {
          matchesDuration =
            exp.duration.includes("Hour") ||
            exp.duration.match(/\b[1-3]\s*Hours?/);
        } else if (selectedDuration === "Day Trip (Full Day)") {
          matchesDuration = exp.duration.toLowerCase().includes("day");
        }

        return (
          matchesSearch && matchesLocation && matchesDuration && matchesCategory
        );
      })
      .sort((a, b) => {
        if (sortOrder === "price-low") return a.price - b.price;
        if (sortOrder === "price-high") return b.price - a.price;
        return 0;
      });
  }, [
    searchTerm,
    selectedLocation,
    selectedDuration,
    selectedCategory,
    sortOrder,
  ]);

  const categoryCounts = useMemo(() => {
    const counts = {};
    experiences.forEach((exp) => {
      counts[exp.category] = (counts[exp.category] || 0) + 1;
    });
    return counts;
  }, []);

  const displayTitle =
    selectedCategory === "All" ? "All Experiences" : selectedCategory;

  // Get current banner image or fallback to default
  const currentBanner =
    bannerImages[selectedCategory] || bannerImages["default"];

  return (
    <div className={styles.productsPage}>
      <SEO
        title={`${displayTitle} | Aurea`}
        description={`Explore our curated collection of ${displayTitle.toLowerCase()} experiences. Find the perfect gift or adventure.`}
      />
      <div
        className={styles.heroSmall}
        style={
          currentBanner ? { backgroundImage: `url(${currentBanner})` } : {}
        }
      >
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.pageTitle}
          >
            {displayTitle}
          </motion.h1>
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link> / <span>{displayTitle}</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* Mobile Filter Toggle */}
          <button
            className={styles.mobileFilterBtn}
            onClick={() => setIsMobileFilterOpen(true)}
          >
            <Filter size={18} /> Filters
          </button>

          {/* Sidebar Filters */}
          <aside
            className={`${styles.sidebar} ${isMobileFilterOpen ? styles.open : ""}`}
          >
            <div className={styles.sidebarHeader}>
              <h3>Filters</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setIsMobileFilterOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.filterGroup}>
              <div className={styles.searchBox}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h4>Location</h4>
              <div className={styles.selectWrapper}>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className={styles.selectArrow} />
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h4>Duration</h4>
              <div className={styles.selectWrapper}>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                >
                  {durations.map((dur) => (
                    <option key={dur} value={dur}>
                      {dur}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className={styles.selectArrow} />
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h4>Categories</h4>
              <ul className={styles.categoryList}>
                <li className={selectedCategory === "All" ? styles.active : ""}>
                  <Link to="/experiences">
                    <span>All Categories</span>
                    <span className={styles.count}>({experiences.length})</span>
                  </Link>
                </li>
                {Object.entries(categoryCounts).map(([cat, count]) => {
                  // Convert category name to slug
                  const categorySlug = cat
                    .toLowerCase()
                    .replace(/ & /g, "-")
                    .replace(/&/g, "")
                    .replace(/ /g, "-")
                    .replace(/special-occasion-experiences/, "occasion");

                  // Map specific category names to their proper slugs
                  let slug = categorySlug;
                  if (cat === "Adventure & Thrill") slug = "adventure";
                  if (cat === "Culinary & Gourmet") slug = "culinary";
                  if (cat === "Wellness & Relaxation") slug = "wellness";
                  if (cat === "Corporate Experience") slug = "corporate";
                  if (cat === "Creative & Artistic") slug = "creative";
                  if (cat === "Culture & Heritage") slug = "culture";
                  if (cat === "Gaming & Entertainment") slug = "gaming";
                  if (cat === "Luxury & Lifestyle") slug = "luxury";
                  if (cat === "Special Occasion Experiences") slug = "occasion";

                  return (
                    <li
                      key={cat}
                      className={selectedCategory === cat ? styles.active : ""}
                    >
                      <Link to={`/category/${slug}`}>
                        <span>{cat}</span>
                        <span className={styles.count}>({count})</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Main Grid */}
          <main className={styles.mainContent}>
            <div className={styles.topBar}>
              <p className={styles.resultCount}>
                Showing {filteredExperiences.length} result(s)
              </p>
              <div className={styles.sortWrapper}>
                <span>Sort by:</span>
                <div className={styles.sortSelect}>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown size={14} className={styles.selectArrow} />
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {filteredExperiences.length > 0 ? (
                <motion.div
                  className="experience-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {filteredExperiences.map((exp) => (
                    <ExperienceCard key={exp.id} {...exp} />
                  ))}
                </motion.div>
              ) : (
                <div className={styles.noResults}>
                  <h3>No experiences found</h3>
                  <p>Try adjusting your search or filters.</p>
                  <button
                    className="cta-btn"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedLocation("All");
                      setSelectedCategory("All");
                      setSelectedDuration("All");
                    }}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
