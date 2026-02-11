import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  Gift,
  ShoppingCart,
  Check,
  X,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import styles from "./ExperienceDetail.module.css";
import SEO from "../components/SEO";
import ExperienceCard from "../components/ExperienceCard";
import { experiences } from "../data/experiences";

const ExperienceDetail = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("description");
  const [giftType, setGiftType] = useState("digital"); // 'digital' or 'physical'
  const [addedToCart, setAddedToCart] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setIsReviewModalOpen(false);
    setReviewRating(0);
    setReviewText("");
    setReviewerName("");
    alert("Thank you for your review! It has been submitted for approval.");
  };

  // Find the experience by ID
  const experience = experiences.find((exp) => exp.id === parseInt(id));

  // Filter related experiences by same vendor
  const relatedExperiences = experiences
    .filter(
      (exp) => exp.vendor === experience?.vendor && exp.id !== experience?.id,
    )
    .slice(0, 3); // Limit to 3 items

  // Dummy reviews data
  const dummyReviews = [
    {
      id: 1,
      name: "Aditi S.",
      rating: 5,
      date: "2 days ago",
      text: "Absolutely loved it! The instructions were clear and the experience was seamless. Highly recommend for a weekend activity.",
    },
    {
      id: 2,
      name: "Rahul M.",
      rating: 4,
      date: "1 week ago",
      text: "Great value for money. My family enjoyed it thoroughly. The venue was a bit crowded but the service was excellent.",
    },
    {
      id: 3,
      name: "Sneha K.",
      rating: 5,
      date: "2 weeks ago",
      text: "A perfect gift for my husband. He had a blast! Will definitely book again.",
    },
  ];

  // Determine inclusions and redemption based on category or defaults if not present
  const inclusions = experience?.inclusions || [
    "Experience voucher valid for 12 months",
    "Flexible booking options",
    "Inclusive of all taxes",
    "Digital instant delivery",
  ];

  const redemption =
    experience?.redemption ||
    "Vouchers can be redeemed online or by contacting our concierge. Please book at least 48 hours in advance. Valid for 12 months from date of purchase.";

  // Helper to render bold text
  const renderFormattedText = (text) => {
    return text.split(/(\*\*.*?\*\*)/).map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  if (!experience) {
    return (
      <div
        className="container"
        style={{ padding: "100px 0", textAlign: "center" }}
      >
        <h2>Experience not found</h2>
        <button
          className="primary-btn"
          onClick={() => navigate("/experiences")}
        >
          Browse All Experiences
        </button>
      </div>
    );
  }

  const [selectedVariant, setSelectedVariant] = useState(
    experience?.variants ? experience.variants[0] : null,
  );

  const [selectedVenue, setSelectedVenue] = useState(
    experience?.venueOptions ? experience.venueOptions[0] : null,
  );

  // Update selected variant/venue if experience changes
  useEffect(() => {
    if (experience?.variants) {
      setSelectedVariant(experience.variants[0]);
    } else {
      setSelectedVariant(null);
    }

    if (experience?.venueOptions) {
      setSelectedVenue(experience.venueOptions[0]);
    } else {
      setSelectedVenue(null);
    }
  }, [experience]);

  const currentPrice = selectedVariant
    ? selectedVariant.price
    : experience?.price;

  const handleAddToCart = () => {
    addToCart({
      ...experience,
      price: currentPrice,
      variant: selectedVariant ? selectedVariant.name : null,
      venue: selectedVenue || null,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className={styles.wrapper}>
      <SEO
        title={`${experience.title} | Aurea`}
        description={experience.description.substring(0, 160)}
      />

      {/* MOBILE ONLY LAYOUT BLOCK */}
      <div className={styles.mobileView}>
        {/* 1. Image at the top */}
        <div
          className={styles.mobileHeroImage}
          onClick={() => setIsImageModalOpen(true)}
        >
          <img src={experience.image} alt={experience.title} />
          <div className={styles.imageEnlargeBadge}>
            <Maximize2 size={12} /> Click to Enlarge
          </div>
        </div>

        {/* 2. Info Section */}
        <div className={styles.mobileInfoSection}>
          <span className={styles.mobileCategory}>{experience.category}</span>
          <h1 className={styles.mobileTitle}>{experience.title}</h1>
          <p className={styles.mobileVendor}>Sold by: {experience.vendor}</p>

          <div className={styles.mobileQuickMeta}>
            <div className={styles.mMetaItem}>
              <Clock size={16} /> {experience.duration}
            </div>
            <div className={styles.mMetaItem}>
              <Users size={16} /> Up to {experience.groupSize}
            </div>
            <div className={styles.mMetaItem}>
              <MapPin size={16} /> {experience.location}
            </div>
          </div>
        </div>

        {/* 3. Pricing & Booking Card */}
        <div className={styles.mobileBookingSection}>
          <div className={styles.mobileBookingCard}>
            <div className={styles.mPriceHeader}>
              <span>Price per head</span>
              <span className={styles.mAmount}>
                ₹{currentPrice.toLocaleString()}
              </span>
            </div>

            {experience.variants && (
              <div className={styles.mVariantSelector}>
                <label>Booking Type</label>
                <div className={styles.mVariantOptions}>
                  {experience.variants.map((v, i) => (
                    <button
                      key={i}
                      className={
                        selectedVariant?.name === v.name
                          ? styles.mActiveVar
                          : ""
                      }
                      onClick={() => setSelectedVariant(v)}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.mGiftToggle}>
              <button
                className={giftType === "digital" ? styles.mActiveToggle : ""}
                onClick={() => setGiftType("digital")}
              >
                E-Voucher
              </button>
              <button
                className={giftType === "physical" ? styles.mActiveToggle : ""}
                onClick={() => setGiftType("physical")}
              >
                Physical Pack
              </button>
            </div>

            <button className={styles.mPrimaryBtn} onClick={handleAddToCart}>
              {addedToCart ? (
                <>
                  <Check size={18} /> Added!
                </>
              ) : (
                <>
                  <ShoppingCart size={18} /> Add to Cart
                </>
              )}
            </button>
          </div>
        </div>

        {/* 4. Details */}
        <div className={styles.mobileDetailsSection}>
          <div className={styles.mTabs}>
            <button
              className={activeTab === "description" ? styles.mActiveTab : ""}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={activeTab === "inclusions" ? styles.mActiveTab : ""}
              onClick={() => setActiveTab("inclusions")}
            >
              What's Included
            </button>
          </div>

          <div className={styles.mTabContent}>
            {activeTab === "description" ? (
              <div className={styles.mDescription}>
                {experience.description.split("\n").map((line, i) => {
                  if (line.startsWith("### ")) {
                    return (
                      <h3 key={i} className={styles.mDescHeader}>
                        {renderFormattedText(line.replace("### ", ""))}
                      </h3>
                    );
                  }
                  if (line.startsWith("- ")) {
                    return (
                      <div key={i} className={styles.mDescListItem}>
                        <div className={styles.mBullet}>•</div>
                        <div>{renderFormattedText(line.replace("- ", ""))}</div>
                      </div>
                    );
                  }
                  if (line.trim() === "") {
                    return <br key={i} />;
                  }
                  return (
                    <p key={i} className={styles.mDescParagraph}>
                      {renderFormattedText(line)}
                    </p>
                  );
                })}
              </div>
            ) : (
              <ul className={styles.mInclusions}>
                {inclusions.map((item, i) => (
                  <li key={i}>
                    <CheckCircle2 size={16} /> {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 5. Related */}
        {relatedExperiences.length > 0 && (
          <div className={styles.mobileRelatedSection}>
            <h3>More from {experience.vendor}</h3>
            <div className={styles.mRelatedScroll}>
              {relatedExperiences.map((exp) => (
                <div key={exp.id} className={styles.mRelatedCardWrap}>
                  <ExperienceCard {...exp} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* DESKTOP ONLY LAYOUT BLOCK */}
      <div className={styles.desktopView}>
        <section className={styles.hero}>
          <motion.div
            className={styles.backdrop}
            style={{ backgroundImage: `url(${experience.image})` }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          />
          <motion.div
            className={styles.backdropOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1 }}
          />

          <div className={`container ${styles.heroInner}`}>
            <motion.div
              className={styles.heroTextContent}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className={styles.categoryBadge}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {experience.category}
              </motion.div>
              <motion.h1
                className={styles.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {experience.title}
              </motion.h1>
              <motion.div
                className={styles.soldBy}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Sold by: {experience.vendor}
              </motion.div>

              <motion.div
                className={styles.quickMeta}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <span>
                  <Clock size={16} /> {experience.duration}
                </span>
                <span>
                  <Users size={16} /> Up to {experience.groupSize}
                </span>
                <span>
                  <MapPin size={16} /> {experience.location}
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              className={styles.heroImageWrapper}
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <img
                src={experience.image}
                alt={experience.title}
                className={styles.heroImage}
                onClick={() => setIsImageModalOpen(true)}
              />
            </motion.div>
          </div>
        </section>

        <section className={`container ${styles.mainContent}`}>
          <motion.div
            className={styles.detailsCol}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className={styles.tabs}>
              <button
                className={activeTab === "description" ? styles.activeTab : ""}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={activeTab === "inclusions" ? styles.activeTab : ""}
                onClick={() => setActiveTab("inclusions")}
              >
                What's Included
              </button>
            </div>

            <div className={styles.tabContent}>
              {activeTab === "description" && (
                <motion.div
                  className={styles.description}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {experience.description.split("\n").map((line, index) => {
                    if (line.startsWith("### ")) {
                      return (
                        <h3 key={index} className={styles.descHeader}>
                          {renderFormattedText(line.replace("### ", ""))}
                        </h3>
                      );
                    }
                    if (line.startsWith("- ")) {
                      return (
                        <div key={index} className={styles.descListItem}>
                          <div className={styles.bullet}>•</div>
                          <div>
                            {renderFormattedText(line.replace("- ", ""))}
                          </div>
                        </div>
                      );
                    }
                    if (line.trim() === "") {
                      return <br key={index} />;
                    }
                    return (
                      <p key={index} className={styles.descParagraph}>
                        {renderFormattedText(line)}
                      </p>
                    );
                  })}
                </motion.div>
              )}
              {activeTab === "inclusions" && (
                <motion.ul
                  className={styles.list}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 },
                    },
                  }}
                >
                  {inclusions.map((item, i) => (
                    <motion.li
                      key={i}
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <CheckCircle2 size={18} className={styles.checkIcon} />{" "}
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
              {activeTab === "redemption" && (
                <div className={styles.redemption}>
                  <p>{redemption}</p>
                </div>
              )}
            </div>

            <motion.div
              className={styles.reviewsSection}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.reviewsHeaderTitle}>
                <h3 className={styles.sectionTitle}>Reviews</h3>
                <button
                  className={styles.writeReviewBtn}
                  onClick={() => setIsReviewModalOpen(true)}
                >
                  Write a Review
                </button>
              </div>

              <div className={styles.reviewSummary}>
                <div className={styles.bigRating}>4.8</div>
                <div className={styles.ratingMeta}>
                  <div className={styles.starsWrapper}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        fill={star < 5 ? "#d4af37" : "none"}
                        stroke="#d4af37"
                      />
                    ))}
                  </div>
                  <span className={styles.reviewCount}>Based on 3 reviews</span>
                </div>
              </div>

              <div className={styles.reviewsList}>
                {dummyReviews.map((review) => (
                  <div key={review.id} className={styles.reviewItem}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewerName}>{review.name}</div>
                      <div className={styles.reviewRating}>
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill="currentColor"
                            className={styles.starIcon}
                          />
                        ))}
                      </div>
                    </div>
                    <div className={styles.reviewDate}>{review.date}</div>
                    <p className={styles.reviewText}>{review.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.sidebar}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className={styles.bookingCard}>
              <div className={styles.priceHeader}>
                <span className={styles.from}>Price per head</span>
                <span className={styles.amount}>
                  ₹{currentPrice.toLocaleString()}
                </span>
              </div>

              {/* Variant Selector */}
              {experience.variants && (
                <div className={styles.variantSelector}>
                  <span className={styles.label}>Booking Type</span>
                  <div className={styles.variantOptions}>
                    {experience.variants.map((variant, index) => (
                      <button
                        key={index}
                        className={
                          selectedVariant?.name === variant.name
                            ? styles.activeVariant
                            : styles.variantButton
                        }
                        onClick={() => setSelectedVariant(variant)}
                      >
                        {variant.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Venue Selector */}
              {experience.venueOptions && (
                <div className={styles.variantSelector}>
                  <span className={styles.label}>Select Venue</span>
                  <div className={styles.selectWrapper}>
                    <select
                      className={styles.selectDropdown}
                      value={selectedVenue || ""}
                      onChange={(e) => setSelectedVenue(e.target.value)}
                    >
                      {experience.venueOptions.map((venue, index) => (
                        <option key={index} value={venue}>
                          {venue}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className={styles.giftTypeSelector}>
                <button
                  className={
                    giftType === "digital" ? styles.activeSelector : ""
                  }
                  onClick={() => setGiftType("digital")}
                >
                  E-Voucher
                </button>
                <button
                  className={
                    giftType === "physical" ? styles.activeSelector : ""
                  }
                  onClick={() => setGiftType("physical")}
                >
                  Physical Pack
                </button>
              </div>

              <p className={styles.disclaimer}>
                {giftType === "digital"
                  ? "Sent instantly to your email. Perfect for last-minute gifting."
                  : "Premium gift box delivered to their doorstep (3-7 days)."}
              </p>

              <button
                className={styles.primaryAction}
                onClick={handleAddToCart}
              >
                {addedToCart ? (
                  <>
                    <Check size={20} /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} /> Add to Cart
                  </>
                )}
              </button>

              <button
                className={styles.secondaryAction}
                onClick={() => navigate("/cart")}
              >
                View Cart
              </button>

              <p className={styles.secureText}>Guaranteed Safe Checkout</p>
            </div>
          </motion.div>
        </section>

        {/* More Listings by Seller Section */}
        {relatedExperiences.length > 0 && (
          <section className={styles.relatedSection}>
            <div className="container">
              <motion.h2
                className={styles.relatedTitle}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                More from {experience.vendor}
              </motion.h2>
              <motion.div
                className={styles.relatedGrid}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2 },
                  },
                }}
              >
                {relatedExperiences.map((exp) => (
                  <motion.div
                    key={exp.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <ExperienceCard {...exp} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}
      </div>

      {/* Full Screen Image Modal - MOVED OUTSIDE DESKTOP VIEW */}
      {isImageModalOpen && (
        <div
          className={styles.imageModalOverlay}
          onClick={() => setIsImageModalOpen(false)}
        >
          <button
            className={styles.closeButton}
            onClick={() => setIsImageModalOpen(false)}
          >
            <X size={32} />
          </button>
          <img
            src={experience.image}
            alt={experience.title}
            className={styles.modalImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Write a Review Modal - MOVED OUTSIDE DESKTOP VIEW */}
      {isReviewModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsReviewModalOpen(false)}
        >
          <div
            className={styles.reviewModal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalCloseBtn}
              onClick={() => setIsReviewModalOpen(false)}
            >
              <X size={24} />
            </button>

            <h3 className={styles.modalTitle}>Write a Review</h3>
            <p className={styles.modalSubtitle}>How was your experience?</p>

            <form onSubmit={handleSubmitReview} className={styles.reviewForm}>
              <div className={styles.formGroup}>
                <label>Rating</label>
                <div className={styles.ratingSelect}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={styles.starBtn}
                      onClick={() => setReviewRating(star)}
                    >
                      <Star
                        size={32}
                        fill={star <= reviewRating ? "#d4af37" : "none"}
                        stroke={star <= reviewRating ? "#d4af37" : "#ccc"}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Your Name</label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Review</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us about your experience..."
                  rows={5}
                  required
                  className={styles.formTextarea}
                />
              </div>

              <button type="submit" className={styles.submitReviewBtn}>
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceDetail;
