import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Settings,
  Award,
  ShieldCheck,
  Clock,
  Leaf,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import styles from "./PartnerWithUs.module.css";
import { Link } from "react-router-dom";

const PartnerWithUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    {
      icon: <Users size={32} />,
      title: "Access to Premium Clients",
      desc: "Reach enterprise clients in search of unique experiences.",
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Vendor Brand Elevation",
      desc: "Boost your brand visibility and outreach.",
    },
    {
      icon: <Settings size={32} />,
      title: "Operations Support",
      desc: "Voucher distribution, marketing, booking & customer support.",
    },
  ];

  const guidelines = [
    {
      icon: <Award size={28} />,
      title: "Quality Standards",
      desc: "Experiences must be unique, well-run, and consistently delivered.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Safety & Compliance",
      desc: "Appropriate insurance, participant waivers, adherence to local regulations, and transparent eligibility.",
    },
    {
      icon: <Clock size={28} />,
      title: "Operations",
      desc: "Reliable booking & scheduling, clear cancellation/reschedule policy, timely communications, and on-site professionalism.",
    },
    {
      icon: <Leaf size={28} />,
      title: "Sustainability & Ethics",
      desc: "Preference for eco-friendly practices, ethical sourcing, and honest transparency about materials and methods.",
    },
  ];

  return (
    <div className={styles.partnerPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.heroBadge}>Join Our Network</span>
            <h1 className={styles.heroTitle}>
              Partner with Auréa to Deliver Premium, Curated Gifting Experiences
            </h1>
            <p className={styles.heroSubtitle}>
              Join our curated network of premium experience providers—from
              adventure sports to culinary tours—and help us deliver
              extraordinary moments.
            </p>
            <div className={styles.heroActions}>
              <button className={styles.primaryBtn}>
                Apply to Join <ArrowRight size={18} />
              </button>
              <button className={styles.secondaryBtn}>Learn More</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className={styles.benefitsSection}>
        <div className="container">
          <div className="section-header">
            <span className="subtitle gold-text">Benefits</span>
            <h2 className="section-title white">Why Partner with Auréa</h2>
          </div>

          <div className={styles.benefitsGrid}>
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                className={styles.benefitCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className={styles.iconWrapper}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className={styles.guidelinesSection}>
        <div className="container">
          <div className="section-header invert">
            <span className="subtitle gold-text">Requirements</span>
            <h2 className="section-title white">Vendor Guidelines</h2>
            <p className="section-desc white op-8">
              We maintain high standards to ensure exceptional experiences for
              our clients.
            </p>
          </div>

          <div className={styles.guidelinesGrid}>
            {guidelines.map((item, index) => (
              <motion.div
                key={index}
                className={styles.guidelineCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.guidelineHeader}>
                  <div className={styles.guidelineIcon}>{item.icon}</div>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Ready to grow with us?</h2>
            <p>
              Connect with our specific partnerships team to start the
              conversation.
            </p>
            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <span className={styles.label}>Email Us</span>
                <a
                  href="mailto:customercare@aureagifts.com"
                  className={styles.link}
                >
                  customercare@aureagifts.com
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.label}>Call Us</span>
                <a href="tel:+919051371216" className={styles.link}>
                  +91 90513 71216
                </a>
              </div>
            </div>
            <button className={styles.applyBtn}>Start Application</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnerWithUs;
