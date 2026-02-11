import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import Hero from "../components/Hero";
import ExperienceCard from "../components/ExperienceCard";
import {
  Search,
  Gift,
  CalendarCheck,
  Sparkles,
  Volume2,
  VolumeX,
  ArrowRight,
} from "lucide-react";
import { experiences } from "../data/experiences";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import SEO from "../components/SEO";

const Home = () => {
  const vendors = [
    "Decathlon",
    "f4f",
    "meetakriti",
    "dws",
    "no escape",
    "TIBC",
    "parabolica",
    "rocksport",
    "timezone",
    "vagabond",
  ];

  const vendorsTop = vendors.slice(0, 5);
  const vendorsBottom = vendors.slice(5);

  const featuredExperiences = experiences.slice(0, 3);
  const videoRef = useRef(null);
  const videoRef2 = useRef(null);
  const timelineRef = useRef(null);
  const [isMuted1, setIsMuted1] = useState(true);
  const [isMuted2, setIsMuted2] = useState(true);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end center"],
  });

  const scrollHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const { scrollYProgress: scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
    clamp: false,
  });

  // Utility to wrap a number between a min and max range
  const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };

  const VelocityMarquee = ({ children, baseVelocity = 100 }) => {
    const baseX = useMotionValue(0);
    const directionFactor = useRef(1);

    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      /**
       * Subtle velocity boost
       */
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();

      baseX.set(baseX.get() + moveBy);
    });

    /**
     * Looping logic: we repeat content multiple times, so wrap(0, -25, v) is enough to loop
     */
    const x = useTransform(baseX, (v) => `${wrap(0, -25, v)}%`);

    return (
      <div className={styles.marqueeWrapper}>
        <motion.div className={styles.tickerRow} style={{ x }}>
          {children}
          {children}
          {children}
          {children}
        </motion.div>
      </div>
    );
  };

  const tickerRef = useRef(null);

  const toggleMute1 = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted1;
      setIsMuted1(!isMuted1);
    }
  };

  const toggleMute2 = () => {
    if (videoRef2.current) {
      videoRef2.current.muted = !isMuted2;
      setIsMuted2(!isMuted2);
    }
  };

  return (
    <>
      <SEO
        title="Aurea - Gifted Moments"
        description="Discover curated experiences and gifted moments with Aurea. From adventure to wellness, find the perfect gift for every occasion."
      />
      <Hero />

      <section className={styles.tickerSection} ref={tickerRef}>
        <div className={styles.tickerOverlay}>
          <div className={styles.centralBadge}>
            <motion.div
              className={styles.badgeInner}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 12 }}
            >
              <span>10+ Trusted Providers</span>
            </motion.div>
          </div>
        </div>

        <div className={styles.tickerRows}>
          <VelocityMarquee baseVelocity={-5}>
            {vendorsTop.map((v, i) => (
              <div key={i} className={styles.tickerLogo}>
                <img src={`/vendors/${v}.png`} alt={v} />
              </div>
            ))}
          </VelocityMarquee>
          <VelocityMarquee baseVelocity={5}>
            {vendorsBottom.map((v, i) => (
              <div key={i} className={styles.tickerLogo}>
                <img src={`/vendors/${v}.png`} alt={v} />
              </div>
            ))}
          </VelocityMarquee>
        </div>
      </section>

      <section id="explore" className={`container ${styles.featuredSection}`}>
        <div className={styles.featuredWrapper}>
          {/* Left Column: Content & Experiences */}
          <div className={styles.featuredContent}>
            <motion.div
              className={styles.sectionHeader}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <span className={styles.subtitle}>Curated for You</span>
              <h2 className={styles.sectionTitle}>Featured Experiences</h2>
            </motion.div>

            <div className={styles.experienceGridLeft}>
              {featuredExperiences.map((exp) => (
                <ExperienceCard
                  key={exp.id}
                  {...exp}
                  className={styles.featuredCard}
                />
              ))}
            </div>

            <motion.div
              className={styles.viewAll}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/experiences">
                <button className={`outline-btn ${styles.viewAllBtn}`}>
                  View All Experiences
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Video Reel */}
          <motion.div
            className={styles.featuredVideo}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Video 1 */}
            <div className={styles.videoWrapper}>
              <video
                ref={videoRef}
                className={styles.videoPlayer}
                src="/home_video.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              <button
                className={styles.muteBtn}
                onClick={toggleMute1}
                aria-label={isMuted1 ? "Unmute Video 1" : "Mute Video 1"}
              >
                {isMuted1 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>

            {/* Video 2 */}
            <div className={styles.videoWrapper}>
              <video
                ref={(el) => (videoRef2.current = el)}
                className={styles.videoPlayer}
                src="/home_video_2.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              <button
                className={styles.muteBtn}
                onClick={toggleMute2}
                aria-label={isMuted2 ? "Unmute Video 2" : "Mute Video 2"}
              >
                {isMuted2 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className={styles.howItWorks}>
        <div className="container">
          <motion.div
            className={styles.howItWorksHeader}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
          >
            <span className={styles.howSubtitle}>The Journey</span>
            <h2 className={styles.howTitle}>Gifting Made Beautifully Simple</h2>
            <p className={styles.howDesc}>
              Choose the perfect experience voucher, send it instantly, and let
              your loved ones create unforgettable memories.
            </p>
          </motion.div>

          <div className={styles.timelineContainer} ref={timelineRef}>
            {/* Progress Line */}
            <div className={styles.timelineLine}>
              <motion.div
                className={styles.timelineProgress}
                style={{ height: scrollHeight }}
              />
            </div>

            {[
              {
                num: "01",
                icon: <Search className={styles.howIcon} />,
                title: "Browse curated experiences",
                p: "Explore handpicked adventures, dining, wellness and more across every occasion.",
                showArrow: true,
              },
              {
                num: "02",
                icon: <Gift className={styles.howIcon} />,
                title: "Gift instantly with a voucher",
                p: "Email a digital voucher or pair it with a premium printed card.",
              },
              {
                num: "03",
                icon: <CalendarCheck className={styles.howIcon} />,
                title: "Redeem the voucher",
                p: "Recipients choose their date & time and redeem securely online.",
                showArrow: true,
              },
              {
                num: "04",
                icon: <Sparkles className={styles.howIcon} />,
                title: "Create lasting memories",
                p: "Every voucher turns into a story they will talk about for years.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className={`${styles.timelineItem} ${i % 2 === 0 ? styles.left : styles.right}`}
              >
                {step.num === "01" || step.num === "03" ? (
                  <Link
                    to={step.num === "01" ? "/experiences" : "/redeem"}
                    className={styles.cardLink}
                  >
                    <motion.div
                      className={styles.journeyCard}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          type: "spring",
                          damping: 15,
                          stiffness: 80,
                          delay: 0.2,
                        },
                      }}
                      whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.2 },
                      }}
                      viewport={{ once: true, amount: 0.5 }}
                    >
                      <div className={styles.cardGlow}></div>
                      <div className={styles.stepNum}>{step.num}</div>
                      <div className={styles.iconBox}>{step.icon}</div>
                      <div className={styles.cardHeader}>
                        <h3>{step.title}</h3>
                        {step.showArrow && (
                          <ArrowRight size={20} className={styles.clickArrow} />
                        )}
                      </div>
                      <p>{step.p}</p>
                    </motion.div>
                  </Link>
                ) : (
                  <motion.div
                    className={styles.journeyCard}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        type: "spring",
                        damping: 15,
                        stiffness: 80,
                        delay: 0.2,
                      },
                    }}
                    whileHover={{
                      scale: 1.03,
                      transition: { duration: 0.2 },
                    }}
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <div className={styles.cardGlow}></div>
                    <div className={styles.stepNum}>{step.num}</div>
                    <div className={styles.iconBox}>{step.icon}</div>
                    <h3>{step.title}</h3>
                    <p>{step.p}</p>
                  </motion.div>
                )}
                <div className={styles.timelineDot}>
                  <div className={styles.dotInner}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
