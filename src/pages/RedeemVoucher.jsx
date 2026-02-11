import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Gift,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  CreditCard,
} from "lucide-react";
import styles from "./RedeemVoucher.module.css";

const RedeemVoucher = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    voucherCode: "",
    name: "",
    mobile: "",
    email: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Redeeming voucher:", formData);
    // Add logic to validate voucher here
    alert("Voucher redemption request submitted!");
  };

  return (
    <div className={styles.redeemPage}>
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            className={styles.formContainer}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className={styles.cardHeader}>
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <Gift size={32} className={styles.headerIcon} />
              </motion.div>
              <h1>Redeem Voucher</h1>
            </div>

            <form className={styles.redeemForm} onSubmit={handleSubmit}>
              <div className={styles.formSection}>
                <label className={styles.label}>Enter Voucher Code:</label>
                <div className={styles.inputGroup}>
                  <CreditCard size={18} className={styles.inputIcon} />
                  <input
                    type="text"
                    name="voucherCode"
                    value={formData.voucherCode}
                    onChange={handleChange}
                    placeholder="e.g. AUREA-GIFT-2026"
                    className={styles.mainInput}
                    required
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.formSection}>
                  <label className={styles.label}>Your Name:</label>
                  <div className={styles.inputGroup}>
                    <User size={18} className={styles.inputIcon} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name (optional)"
                    />
                  </div>
                </div>

                <div className={styles.formSection}>
                  <label className={styles.label}>Mobile Number:</label>
                  <div className={styles.inputGroup}>
                    <Phone size={18} className={styles.inputIcon} />
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter mobile number (optional)"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <label className={styles.label}>
                  Email to receive this gift:
                </label>
                <div className={styles.inputGroup}>
                  <Mail size={18} className={styles.inputIcon} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter recipient's email (optional)"
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.formSection}>
                  <label className={styles.label}>Experience Date:</label>
                  <div className={styles.inputGroup}>
                    <Calendar size={18} className={styles.inputIcon} />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={styles.dateInput}
                    />
                  </div>
                </div>

                <div className={styles.formSection}>
                  <label className={styles.label}>Preferred Time:</label>
                  <div className={styles.inputGroup}>
                    <Clock size={18} className={styles.inputIcon} />
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                    >
                      <option value="">Select time (optional)</option>
                      <option value="morning">Morning (9AM - 12PM)</option>
                      <option value="afternoon">Afternoon (12PM - 4PM)</option>
                      <option value="evening">Evening (4PM - 9PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                className={styles.submitBtn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Redeem
                <CheckCircle size={20} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RedeemVoucher;
