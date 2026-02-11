import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  UserCheck,
  RefreshCw,
} from "lucide-react";
import styles from "./PrivacyPolicy.module.css";
import SEO from "../components/SEO";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: "introduction",
      icon: <FileText className={styles.icon} />,
      title: "1. Introduction",
      content: (
        <p>
          Aurea Gifts LLP (“Aurea”, “We”, “Us”) is committed to protecting your
          personal data. This Privacy Policy describes how we collect, use,
          store, and share information about Users who interact with our Website
          or purchase Vouchers.
        </p>
      ),
    },
    {
      id: "data-collection",
      icon: <Eye className={styles.icon} />,
      title: "2. Data We Collect",
      content: (
        <div className={styles.subSections}>
          <div className={styles.subSection}>
            <h4>2.1 Personal Identifiable Information (PII)</h4>
            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Mobile number</li>
              <li>Billing/shipping address</li>
              <li>
                Identity details for specific high-risk experiences (if required
                by Partner)
              </li>
            </ul>
          </div>
          <div className={styles.subSection}>
            <h4>2.2 Payment Information</h4>
            <p>
              Aurea does <strong>NOT</strong> store full card or bank details.
            </p>
            <ul>
              <li>UPI/BHIM transaction IDs</li>
              <li>
                Partial masked card details (collected by payment gateway only)
              </li>
              <li>GST details for corporate clients</li>
            </ul>
          </div>
          <div className={styles.subSection}>
            <h4>2.3 Usage & Technical Data</h4>
            <ul>
              <li>IP address</li>
              <li>Device/browser information</li>
              <li>Website usage analytics</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "lawful-basis",
      icon: <Shield className={styles.icon} />,
      title: "3. Lawful Basis of Data Collection",
      content: (
        <p>
          Under India’s DPDP Act 2023, we collect data only when:
          <ul>
            <li>You give consent</li>
            <li>It is required for providing a service bought by you</li>
            <li>It is necessary for legal or tax compliance</li>
            <li>It is required for fraud prevention or security</li>
          </ul>
        </p>
      ),
    },
    {
      id: "how-we-use",
      icon: <UserCheck className={styles.icon} />,
      title: "4. How We Use Your Data",
      content: (
        <p>
          We use personal data to:
          <ul>
            <li>Process orders and deliver Vouchers</li>
            <li>Enable experience booking with Partners</li>
            <li>Provide customer support</li>
            <li>Prevent fraud and illegal activity</li>
            <li>Send transactional emails/SMS</li>
            <li>Improve website functionality</li>
            <li>Display personalized experience recommendations</li>
          </ul>
          <strong>We do not sell your data to third parties.</strong>
        </p>
      ),
    },
    {
      id: "sharing",
      icon: <RefreshCw className={styles.icon} />,
      title: "5. Sharing of Data",
      content: (
        <p>
          We may share your data only with:
          <ul>
            <li>
              Experience Partners (only the minimum necessary for booking)
            </li>
            <li>Payment gateways</li>
            <li>Courier companies</li>
            <li>IT service providers, hosting providers</li>
            <li>Government authorities when legally required</li>
          </ul>
          All third parties are contractually bound to maintain confidentiality.
        </p>
      ),
    },
    {
      id: "security",
      icon: <Lock className={styles.icon} />,
      title: "6. Data Storage & Security",
      content: (
        <ul>
          <li>
            Data is stored on secure servers located in India or compliant
            international locations.
          </li>
          <li>
            We implement encryption, access controls, firewalls, and internal
            security policies.
          </li>
          <li>
            Only authorized employees may access data on a need-to-know basis.
          </li>
        </ul>
      ),
    },
    {
      id: "retention",
      icon: <div className={styles.icon}>🕒</div>,
      title: "7. Data Retention",
      content: (
        <p>
          We retain data only as long as:
          <ul>
            <li>Required for providing the service</li>
            <li>Required under Indian tax or regulatory laws</li>
            <li>Required for dispute resolution</li>
          </ul>
          Customer can request deletion after legal retention periods expire.
        </p>
      ),
    },
    {
      id: "rights",
      icon: <UserCheck className={styles.icon} />,
      title: "8. User Rights (Under DPDP Act 2023)",
      content: (
        <p>
          You have the right to:
          <ul>
            <li>Request access to your data</li>
            <li>Request correction of inaccurate data</li>
            <li>Withdraw consent</li>
            <li>Request deletion (after legal retention periods)</li>
            <li>
              Nominate a person to exercise rights in case of death/incapacity
            </li>
          </ul>
          Requests can be emailed to: <strong>support@aureagifts.com</strong>
        </p>
      ),
    },
    {
      id: "cookies",
      icon: <div className={styles.icon}>🍪</div>,
      title: "9. Cookies",
      content: (
        <p>
          Aurea uses cookies for:
          <ul>
            <li>Functional website operation</li>
            <li>Login sessions</li>
            <li>Analytics</li>
            <li>Personalization</li>
          </ul>
          You may disable cookies in your browser settings.
        </p>
      ),
    },
    {
      id: "grievance",
      icon: <UserCheck className={styles.icon} />,
      title: "10. Grievance Officer",
      content: (
        <div className={styles.contactCard}>
          <p>As per IT Rules 2011, Aurea appoints a Grievance Officer:</p>
          <p>
            <strong>Name:</strong> Surojit Ghosh
          </p>
          <p>
            <strong>Email:</strong> support@aureagifts.com
          </p>
          <p>
            <strong>Response time:</strong> Within 15 working days
          </p>
        </div>
      ),
    },
    {
      id: "updates",
      icon: <RefreshCw className={styles.icon} />,
      title: "11. Updates to this Policy",
      content: (
        <p>
          We may update this Privacy Policy periodically. Continued use of the
          Website constitutes acceptance of the updated Policy.
        </p>
      ),
    },
  ];

  return (
    <div className={styles.privacyPage}>
      <SEO
        title="Privacy Policy - Aurea Gifting"
        description="Learn how Aurea protects your personal data and your rights under the DPDP Act 2023."
      />

      <div className={styles.heroSection}>
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.pageTitle}>Privacy Policy</h1>
          <p className={styles.pageSubtitle}>
            Your privacy is our priority. Last updated: February 2026
          </p>
        </motion.div>
      </div>

      <div className={styles.mainContent}>
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.sidebar}>
              <nav className={styles.nav}>
                <h3>Sections</h3>
                <ul>
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`}>{section.title}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className={styles.contentBody}>
              {sections.map((section, index) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  className={styles.section}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={styles.sectionHeader}>
                    {section.icon}
                    <h2>{section.title}</h2>
                  </div>
                  <div className={styles.sectionContent}>{section.content}</div>
                </motion.section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
