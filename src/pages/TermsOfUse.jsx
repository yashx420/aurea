import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Scale,
  Package,
  Globe,
  CreditCard,
  Truck,
  Calendar,
  User,
  Clock,
  RefreshCw,
  XCircle,
  ShieldAlert,
  Gavel,
  Info,
} from "lucide-react";
import styles from "./TermsOfUse.module.css";
import SEO from "../components/SEO";

const TermsOfUse = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: "definitions",
      icon: <Info className={styles.icon} />,
      title: "1. Definitions",
      content: (
        <ul className={styles.definitionList}>
          <li>
            <strong>“Voucher”</strong> means a prepaid digital or physical
            certificate issued by Aurea that entitles the Customer to avail an
            experience, activity, service, or product offered by an independent
            partner (“Experience Partner”).
          </li>
          <li>
            <strong>“Experience Partner / Partner”</strong> means any third
            party offering goods or services through Aurea’s platform.
          </li>
          <li>
            <strong>“Gift Card”</strong> means a prepaid card of a fixed
            monetary value redeemable on Aurea or with Aurea’s Partners.
          </li>
          <li>
            <strong>“Agreement”</strong> means the legally binding contract
            formed upon successful purchase of a Product from Aurea.
          </li>
          <li>
            <strong>“Experience”</strong> means the specific activity, service,
            event, or package offered through Aurea.
          </li>
        </ul>
      ),
    },
    {
      id: "products",
      icon: <Package className={styles.icon} />,
      title: "2. Products Offered",
      content: (
        <div className={styles.subSections}>
          <div className={styles.subSection}>
            <p>
              2.1 Aurea sells the following types of Vouchers and Gift Cards:
            </p>
            <ul>
              <li>
                Aurea Gift Cards: Stored-value cards redeemable for any
                Aurea-listed experience.
              </li>
              <li>
                Partner Experience Vouchers: Entitles the Customer to avail a
                specific experience offered by an Experience Partner.
              </li>
              <li>
                Aurea Gift Boxes / Sets: Bundled selections of experiences where
                the recipient may choose one option.
              </li>
              <li>
                Category-Specific Vouchers: Culinary, Wellness, Adventure, etc.
              </li>
            </ul>
          </div>
          <p>2.2 All Vouchers are activated only upon full payment.</p>
          <p>2.3 Some Vouchers may be multi-option or multi-partner.</p>
          <p>
            2.4 Vouchers may be single-use or multi-use depending on the type
            issued.
          </p>
          <p>2.5 Vouchers cannot be recharged, reloaded, or topped up.</p>
        </div>
      ),
    },
    {
      id: "conditions",
      icon: <Globe className={styles.icon} />,
      title: "3. General Conditions",
      content: (
        <ul>
          <li>
            3.1 Aurea acts only as an intermediary. All Experiences are
            delivered by independent Experience Partners.
          </li>
          <li>
            3.2 Experience descriptions, safety conditions, and availability are
            provided by the Partner.
          </li>
          <li>
            3.3 Customers must read the Experience Terms of Use before booking.
          </li>
          <li>
            3.4 Purchasing a Voucher implies understanding and accepting all
            conditions.
          </li>
          <li>
            3.5 Aurea reserves the right to modify these Terms at any time.
          </li>
        </ul>
      ),
    },
    {
      id: "purchase",
      icon: <CreditCard className={styles.icon} />,
      title: "4. Purchase of Vouchers",
      content: (
        <div className={styles.subSections}>
          <p>
            4.1 Vouchers may be purchased on the Website, through authorized
            partners, or corporate reps.
          </p>
          <p>
            4.2 Payment methods include Debit/Credit Cards, UPI, Net Banking,
            and Wallets.
          </p>
          <p>
            4.3 Aurea may refuse a sale if fraudulent activity is suspected.
          </p>
          <p>
            4.4 The Agreement is completed only after successful payment and
            issuance.
          </p>
        </div>
      ),
    },
    {
      id: "delivery",
      icon: <Truck className={styles.icon} />,
      title: "5. Delivery of Vouchers",
      content: (
        <ul>
          <li>5.1 Digital Vouchers are sent via email/mobile.</li>
          <li>5.2 Physical Vouchers/Gift Boxes are delivered via courier.</li>
          <li>
            5.3 Aurea is not responsible for delays caused by courier companies.
          </li>
        </ul>
      ),
    },
    {
      id: "use",
      icon: <Calendar className={styles.icon} />,
      title: "6. Use of Vouchers",
      content: (
        <ul>
          <li>
            6.1 Customers must book the Experience directly with the Partner.
          </li>
          <li>
            6.2 Partners may deny service if the Voucher is expired or
            requirements are not met.
          </li>
          <li>
            6.3 If the cost exceeds the Voucher value, the Customer pays the
            difference.
          </li>
          <li>
            6.4 Prior booking is mandatory; Aurea doesn't guarantee specific
            dates.
          </li>
        </ul>
      ),
    },
    {
      id: "responsibilities",
      icon: <User className={styles.icon} />,
      title: "7. Customer Responsibilities",
      content: (
        <ul>
          <li>Provide accurate personal information</li>
          <li>Ensure the Voucher is kept secure</li>
          <li>Read all Experience-specific terms and safety instructions</li>
          <li>Arrive on time for the booked Experience</li>
          <li>Adhere to Partner rules and safety guidelines</li>
        </ul>
      ),
    },
    {
      id: "validity",
      icon: <Clock className={styles.icon} />,
      title: "8. Validity and Extension",
      content: (
        <ul>
          <li>8.1 Voucher validity is printed on the Voucher.</li>
          <li>8.2 Vouchers may be extended subject to administrative fees.</li>
          <li>8.3 Extensions can be requested via email or website.</li>
          <li>8.4 Expired Vouchers cannot be used, exchanged, or refunded.</li>
        </ul>
      ),
    },
    {
      id: "exchanges",
      icon: <RefreshCw className={styles.icon} />,
      title: "9. Exchanges & Upgrades",
      content: (
        <ul>
          <li>
            9.1 Exchanges for equal or higher value are allowed (difference to
            be paid).
          </li>
          <li>9.2 Exchanges are allowed only once per Voucher.</li>
          <li>9.3 Promotional Vouchers may not be exchangeable.</li>
        </ul>
      ),
    },
    {
      id: "cancellation",
      icon: <XCircle className={styles.icon} />,
      title: "10. Cancellation & Refund Policy",
      content: (
        <div className={styles.subSections}>
          <p>
            10.1 All Vouchers are non-refundable, except where required under
            Indian law.
          </p>
          <div className={styles.subSection}>
            <h4>10.2 Refunds may be allowed if:</h4>
            <ul>
              <li>
                The Partner permanently discontinues the Experience before
                booking
              </li>
              <li>Aurea is unable to provide an alternative of equal value</li>
              <li>Duplicate purchase due to gateway error</li>
            </ul>
          </div>
          <p>
            10.4 Failure to attend a booked experience makes the Voucher "used"
            and non-refundable.
          </p>
        </div>
      ),
    },
    {
      id: "liability",
      icon: <ShieldAlert className={styles.icon} />,
      title: "11. Liability & Partner Responsibility",
      content: (
        <div className={styles.subSections}>
          <p>
            11.1 Partners are solely responsible for Experience quality, safety,
            and licensing.
          </p>
          <p>
            11.2 Aurea is not liable for injuries or dissatisfaction arising
            from the Experience.
          </p>
          <p>12.2 Maximum liability is limited to the value of the Voucher.</p>
        </div>
      ),
    },
    {
      id: "jurisdiction",
      icon: <Gavel className={styles.icon} />,
      title: "12. Law & Jurisdiction",
      content: (
        <div className={styles.highlightCard}>
          <p>These Terms shall be governed by the laws of India.</p>
          <p>
            Any disputes shall be subject to the exclusive jurisdiction of
            courts in <strong>Kolkata, West Bengal</strong>.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.termsPage}>
      <SEO
        title="Terms & Conditions - Aurea Gifts"
        description="Read the terms and conditions governing the sale and use of Aurea experience vouchers and gift cards."
      />

      <div className={styles.heroSection}>
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.pageTitle}>Terms & Conditions</h1>
          <p className={styles.pageSubtitle}>
            Please read these terms carefully before using our services. Last
            updated: December 2025
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
              <div className={styles.introCard}>
                <p>
                  These Terms & Conditions (“Terms”) govern the sale and use of
                  Experience Vouchers, Gift Cards, and related products
                  (“Products”) by <strong>Aurea Gifts LLP</strong>.
                </p>
              </div>

              {sections.map((section, index) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  className={styles.section}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.05 }}
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

export default TermsOfUse;
