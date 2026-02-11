import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus,
  Settings,
  BarChart3,
  LogOut,
  Search,
  Home,
} from "lucide-react";
import styles from "./VendorDashboard.module.css";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const stats = [
    { label: "Total Experiences", value: "12" },
    { label: "Active Listings", value: "10" },
    { label: "Views (30d)", value: "1,240" },
    { label: "Redemptions", value: "45" },
  ];

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <img src="/logo Aurea(1).png" alt="Auréa" className={styles.logo} />
          <span className={styles.partner}>Partner Portal</span>
        </div>

        <nav className={styles.sideNav}>
          <button
            className={activeTab === "overview" ? styles.active : ""}
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard size={20} /> Overview
          </button>
          <button
            className={activeTab === "listings" ? styles.active : ""}
            onClick={() => setActiveTab("listings")}
          >
            <BarChart3 size={20} /> My Experiences
          </button>
          <button
            className={activeTab === "add" ? styles.active : ""}
            onClick={() => setActiveTab("add")}
          >
            <FilePlus size={20} /> Add New Listing
          </button>
          <button
            className={activeTab === "settings" ? styles.active : ""}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={20} /> Profile Settings
          </button>
        </nav>

        <button className={styles.navSecondary} onClick={() => navigate("/")}>
          <Home size={20} /> Back to Home
        </button>

        <button className={styles.logout} onClick={handleLogout}>
          <LogOut size={20} /> Logout
        </button>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className={styles.userProfile}>
            <span>Grand Gourmet Catering</span>
            <div className={styles.avatar}>GG</div>
          </div>
        </header>

        {activeTab === "overview" && (
          <div className={styles.overview}>
            <div className={styles.statsGrid}>
              {stats.map((stat, i) => (
                <div key={i} className={styles.statCard}>
                  <p>{stat.label}</p>
                  <h3>{stat.value}</h3>
                </div>
              ))}
            </div>

            <div className={styles.recentActivity}>
              <h2>Recent Redemptions</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Voucher Code</th>
                    <th>Experience</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>AUR-88291</td>
                    <td>Farm to Table Meal</td>
                    <td>Jan 28, 2026</td>
                    <td>
                      <span className={styles.statusCompleted}>Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>AUR-77120</td>
                    <td>Private Chef Table</td>
                    <td>Jan 25, 2026</td>
                    <td>
                      <span className={styles.statusCompleted}>Completed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "add" && (
          <div className={styles.formCard}>
            <h2>Create New Experience Listing</h2>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label>Experience Title</label>
                <input
                  type="text"
                  placeholder="e.g. Sunset Yoga & Meditation"
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Category</label>
                  <select>
                    <option>Wellness & Relaxation</option>
                    <option>Culinary & Gourmet</option>
                    <option>Adventure & Thrill</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Price (₹)</label>
                  <input type="number" placeholder="2500" />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  rows="5"
                  placeholder="Detail the magic of this experience..."
                ></textarea>
              </div>
              <div className={styles.formGroup}>
                <label>Upload Images</label>
                <div className={styles.uploadBox}>
                  <span>Click to upload or drag and drop</span>
                </div>
              </div>
              <button type="submit" className={styles.submitBtn}>
                Submit for Approval
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default VendorDashboard;
