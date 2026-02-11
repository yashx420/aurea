import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2, ChevronRight } from "lucide-react";
import styles from "./Hero.module.css";

const Hero = () => {
  const desktopImages = [
    "/hero-bg.png",
    "https://aurea.gift/wp-content/uploads/2026/01/MerakiWebsitePhotos_583e0b96-d5c0-434b-890e-1005d5e16695.webp", // Royal Couple Escape
    "https://aurea.gift/wp-content/uploads/2026/01/TIBC0535.jpg", // Bouldering
  ];

  const mobileImages = [
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1287&auto=format&fit=crop", // Santorini Vertical
    "https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=1287&auto=format&fit=crop", // Romantic Dinner Vertical
    "https://aurea.gift/wp-content/uploads/2026/01/TIBC0535.jpg", // Kept same
  ];

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const heroImages = isMobile ? mobileImages : desktopImages;

  React.useEffect(() => {
    // Preload local images
    heroImages.forEach((image) => {
      const img = new Image();
      img.src = image;
    });

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const charVariants = {
    hidden: { opacity: 0, y: 30, rotateX: 90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  const wordVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className={styles.hero}>
      {/* Absolute background layers */}
      <div className={styles.heroBackgroundContainer}>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            className={styles.heroBackground}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
          />
        </AnimatePresence>
      </div>

      <div className={styles.overlay}></div>

      <div className={`container ${styles.heroInner}`}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.span
            className={styles.subtitle}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Curated Excellence
          </motion.span>

          <motion.h1
            className={styles.title}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Split title for individual char animation */}
            <span className={styles.block}>
              {"Unforgettable".split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={charVariants}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>{" "}
            <span className={styles.highlight}>Experiences</span>
            <br />
            <motion.span
              className={styles.giftText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              You Can Gift
            </motion.span>
          </motion.h1>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Discover handpicked moments designed to spark joy and create
            lifelong memories. From culinary journeys to adrenaline-filled
            escapes.
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <button
              className={styles.primaryBtn}
              onClick={() =>
                document
                  .getElementById("explore")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Experiences <ChevronRight size={18} />
            </button>
            <a href="#how-it-works" className={styles.secondaryBtn}>
              How it Works
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className={styles.mouse}>
          <motion.div
            className={styles.wheel}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
        <span>Scroll to Discover</span>
      </motion.div>
    </section>
  );
};

export default Hero;
