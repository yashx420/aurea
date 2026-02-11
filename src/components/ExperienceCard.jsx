import React from "react";
import { motion } from "framer-motion";
import { Clock, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./ExperienceCard.module.css";

const ExperienceCard = ({
  id,
  title,
  category,
  image,
  duration,
  price,
  groupSize,
  className = "",
}) => {
  return (
    <motion.div
      className={`${styles.card} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link to={`/experience/${id}`} className={styles.cardLink}>
        <div className={styles.imageWrapper}>
          <motion.img
            src={image}
            alt={title}
            className={styles.image}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          <div className={styles.categoryBadge}>{category}</div>
          <div className={styles.shine}></div>
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>

          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <Clock size={14} />
              <span>{duration}</span>
            </div>
            <div className={styles.metaItem}>
              <Users size={14} />
              <span>Up to {groupSize}</span>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.price}>
              <span className={styles.from}>From</span>
              <span className={styles.amount}>₹{price.toLocaleString()}</span>
            </div>
            <button className={styles.actionBtn}>Gift This</button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExperienceCard;
