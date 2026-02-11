import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ExperienceCard from "../components/ExperienceCard";
import { experiences } from "../data/experiences";
import styles from "./CategoryPage.module.css";

const CategoryPage = () => {
  const { categorySlug } = useParams();

  // Scroll to top on category change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySlug]);

  // Normalize slug and filter
  const items = experiences.filter(
    (exp) =>
      exp.slug === categorySlug ||
      exp.category.toLowerCase().includes(categorySlug),
  );

  const getCategoryTitle = (slug) => {
    switch (slug) {
      case "adventure":
        return "Adventure & Thrill";
      case "culinary":
        return "Culinary & Gourmet";
      case "wellness":
        return "Wellness & Relaxation";
      case "corporate":
        return "Corporate Experiences";
      case "creative":
        return "Creative & Artistic";
      case "culture":
        return "Culture & Heritage";
      case "gaming":
        return "Gaming & Entertainment";
      case "luxury":
        return "Luxury & Lifestyle";
      case "occasion":
        return "Special Occasions";
      default:
        return "Experiences";
    }
  };

  return (
    <div className={styles.categoryPage}>
      <div className={styles.heroSmall}>
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.title}
          >
            {getCategoryTitle(categorySlug)}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={styles.breadcrumb}
          >
            <Link to="/">Home</Link> /{" "}
            <span>{getCategoryTitle(categorySlug)}</span>
          </motion.p>
        </div>
      </div>

      <div className="container section-padding">
        {items.length > 0 ? (
          <div className="experience-grid">
            {items.map((exp) => (
              <ExperienceCard key={exp.id} {...exp} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2>Coming Soon</h2>
            <p>
              We are currently curating exceptional experiences for this
              category.
            </p>
            <Link to="/" className="outline-btn">
              Return Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
