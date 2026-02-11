import React from "react";
import { motion } from "framer-motion";
import { Map, Utensils, Palette, Compass, Heart } from "lucide-react";
import styles from "./About.module.css";

const About = () => {
  const categories = [
    {
      icon: <Map size={32} />,
      title: "Travel & Getaways",
      desc: "Romantic escapes, relaxing retreats, adventure trips that spark lifelong memories.",
    },
    {
      icon: <Utensils size={32} />,
      title: "Dining & Gourmet",
      desc: "Fine dinners, culinary workshops, private chef tables, and unique foodie moments.",
    },
    {
      icon: <Palette size={32} />,
      title: "Wellness & Artistry",
      desc: "Spa days, creative classes, wellness retreats, pottery and painting experiences.",
    },
    {
      icon: <Compass size={32} />,
      title: "Adventure & Wonder",
      desc: "Hot air balloon rides, stargazing, nature treks — gifts for the curious soul.",
    },
  ];

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className={styles.heroTitle}
          >
            About Auréa
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={styles.heroSubtitle}
          >
            Moments that spark joy, laughter, and connection last far longer
            than anything you can buy.
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="container section-padding">
        <motion.div
          className={styles.introContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className={styles.leadText}>
            Aurea is India’s upcoming platform for experience gifting — where
            you’ll be able to gift memories, not objects.
          </p>
          <p>
            From a romantic weekend getaway to a gourmet dinner, a wellness
            escape, or an adventure under the stars — Aurea will make finding
            and gifting these moments effortless and elegant.
          </p>
        </motion.div>
      </section>

      {/* What We Do Section */}
      <section className={`${styles.whatWeDo} plum-gradient`}>
        <div className="container">
          <motion.div
            className="section-header invert"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">What We Do?</h2>
            <p className="subtitle white op-8">
              Auréa will help you say all this — in a way that feels personal
              and unforgettable.
            </p>
          </motion.div>

          <div className={styles.categoryGrid}>
            {categories.map((cat, index) => (
              <motion.div
                key={index}
                className={styles.categoryCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -5,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className={styles.iconWrapper}>{cat.icon}</div>
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="container section-padding">
        <motion.div
          className={styles.visionBox}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.visionIcon}>
            <Heart size={48} />
          </div>
          <h2>Our Vision</h2>
          <p className={styles.visionText}>
            To build a world where gifts create stories, not clutter. Where
            every celebration is about connection — not consumption. Where
            giving feels as good as receiving.
          </p>
          <p className={styles.visionQuote}>
            “Because the best gifts aren’t things — they’re memories.”
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
