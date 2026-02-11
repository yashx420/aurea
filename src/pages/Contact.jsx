import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Clock,
  User,
  MessageSquare,
} from "lucide-react";
import styles from "./Contact.module.css";

import SEO from "../components/SEO";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Thank you for your message. We will get back to you soon!");
  };

  return (
    <div className={styles.contactPage}>
      <SEO
        title="Contact Us | Aurea"
        description="Get in touch with the Aurea team for inquiries, support, or partnership opportunities. We're here to help you."
      />
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
            <h1 className={styles.heroTitle}>Get in Touch</h1>
            <p className={styles.heroSubtitle}>
              We'd love to hear from you. Reach out to us for any queries,
              partnerships, or just to say hello.
            </p>
          </motion.div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.grid}>
            {/* Contact Info Column */}
            <motion.div
              className={styles.infoColumn}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.sectionTitle}>Contact Information</h2>
              <p className={styles.sectionDesc}>
                Find us at our office or connect with us through the channels
                below.
              </p>

              <div className={styles.infoCards}>
                <div className={styles.infoCard}>
                  <div className={styles.iconWrapper}>
                    <MapPin size={24} />
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Visit Us</h3>
                    <p>
                      Dynasty Business Park, 4th Floor,
                      <br />
                      Andheri Kurla Road, Andheri East,
                      <br />
                      Mumbai – 400059
                    </p>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.iconWrapper}>
                    <Phone size={24} />
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Call Us</h3>
                    <p>+91 90513 71216</p>
                    <span className={styles.subText}>
                      Mon-Fri from 9am to 6pm
                    </span>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.iconWrapper}>
                    <Mail size={24} />
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Email Us</h3>
                    <a
                      href="mailto:customercare@aureagifts.com"
                      className={styles.link}
                    >
                      customercare@aureagifts.com
                    </a>
                    <span className={styles.subText}>
                      We'll reply within 24 hours
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form Column */}
            <motion.div
              className={styles.formColumn}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form className={styles.form} onSubmit={handleSubmit}>
                <h3>Send us a Message</h3>

                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <div className={styles.inputWrapper}>
                    <User size={18} className={styles.inputIcon} />
                    <input
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <div className={styles.inputWrapper}>
                    <Mail size={18} className={styles.inputIcon} />
                    <input
                      type="email"
                      id="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject</label>
                  <div className={styles.inputWrapper}>
                    <MessageSquare size={18} className={styles.inputIcon} />
                    <select id="subject">
                      <option value="general">General Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="corporate">Corporate Gifting</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Send Message <Send size={18} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder - Optional/Visual */}
      {/* <section className={styles.mapSection}>
        <iframe 
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.889606869403!2d72.865!3d19.112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA2JzQzLjIiTiA3MsKwNTEnNTQuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
          width="100%" 
          height="450" 
          style={{border:0}} 
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
      </section> */}
    </div>
  );
};

export default Contact;
