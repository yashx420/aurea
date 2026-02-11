import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Star,
  MessageSquare,
  User,
  Mail,
  ChevronDown,
} from "lucide-react";
import styles from "./Feedback.module.css";
import SEO from "../components/SEO";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "UX/UI Experience",
    rating: 0,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  };

  const handleRating = (r) => {
    setFormData({ ...formData, rating: r });
  };

  if (submitted) {
    return (
      <div className={`${styles.feedbackPage} ${styles.successMode}`}>
        <SEO
          title="Feedback Received | Aurea"
          description="Thank you for your valuable feedback."
        />
        <div className={`container ${styles.successContainer}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={styles.successCard}
          >
            <div className={styles.successIcon}>
              <Send size={48} />
            </div>
            <h1>Thank You!</h1>
            <p>
              Your feedback is invaluable to us. We've received your submission
              and will use it to make Auréa even better.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className={styles.resetBtn}
            >
              Send Another Feedback
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.feedbackPage}>
      <SEO
        title="Share Your Feedback | Aurea"
        description="Help us improve. Share your thoughts, suggestions or experience with us."
      />

      <section className={styles.hero}>
        <div className="container">
          <motion.span
            className={styles.subtitle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Voice of the Guest
          </motion.span>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Your Feedback Matters
          </motion.h1>
          <motion.p
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Help us shape the future of gifting and experiences. Share your
            thoughts, report an issue, or suggest a new feature.
          </motion.p>
        </div>
      </section>

      <section className={`container ${styles.formSection}`}>
        <motion.div
          className={styles.formCard}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>
                  <User size={16} /> Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>
                  <Mail size={16} /> Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>
                  <MessageSquare size={16} /> Feedback Type
                </label>
                <div className={styles.selectWrapper}>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    <option>UX/UI Experience</option>
                    <option>Experience Suggestion</option>
                    <option>Technical Issue</option>
                    <option>Customer Support</option>
                    <option>Other</option>
                  </select>
                  <ChevronDown size={18} className={styles.selectArrow} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Overall Satisfaction</label>
                <div className={styles.ratingStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRating(star)}
                      className={
                        formData.rating >= star
                          ? styles.activeStar
                          : styles.star
                      }
                    >
                      <Star
                        size={24}
                        fill={formData.rating >= star ? "currentColor" : "none"}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Message</label>
              <textarea
                required
                rows="6"
                placeholder="What's on your mind? Be as descriptive as possible..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              ></textarea>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Submit Feedback <Send size={18} />
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default Feedback;
