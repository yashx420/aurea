import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  FileText,
  Settings,
  LogOut,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  Image as ImageIcon,
  Home,
} from "lucide-react";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("vendors"); // Default to vendors for now

  // Mock State for Vendors
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "Serenity Spa",
      status: "pending",
      email: "contact@serenity.com",
    },
    {
      id: 2,
      name: "Peak Adventures",
      status: "pending",
      email: "info@peakadv.com",
    },
    {
      id: 3,
      name: "Gourmet Kitchen",
      status: "approved",
      email: "chef@gourmet.com",
    },
  ]);

  // Mock State for Listings
  const [listings, setListings] = useState([]);
  const [showCreateListing, setShowCreateListing] = useState(false);

  // New Listing Form State
  const [newListing, setNewListing] = useState({
    title: "",
    category: "Wellness & Relaxation",
    price: "",
    vendorEmail: "",
    description: "",
    variations: [],
    whatsIncluded: [],
    redemptionRules: "",
    tags: [],
    mainImage: null,
    galleryImages: [],
  });

  const [variationInput, setVariationInput] = useState({ name: "", price: "" });
  const [whatsIncludedInput, setWhatsIncludedInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const handleAddVariation = () => {
    if (variationInput.name && variationInput.price) {
      setNewListing({
        ...newListing,
        variations: [...newListing.variations, variationInput],
      });
      setVariationInput({ name: "", price: "" });
    }
  };

  const handleRemoveVariation = (index) => {
    const newVars = [...newListing.variations];
    newVars.splice(index, 1);
    setNewListing({ ...newListing, variations: newVars });
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const handleApproveVendor = (id) => {
    setVendors(
      vendors.map((v) => (v.id === id ? { ...v, status: "approved" } : v)),
    );
  };

  const handleRejectVendor = (id) => {
    setVendors(
      vendors.map((v) => (v.id === id ? { ...v, status: "rejected" } : v)),
    );
  };

  // Helper for dynamic lists (What's Included, Tags)
  const handleAddItem = (type) => {
    if (type === "whatsIncluded" && whatsIncludedInput.trim()) {
      setNewListing({
        ...newListing,
        whatsIncluded: [...newListing.whatsIncluded, whatsIncludedInput.trim()],
      });
      setWhatsIncludedInput("");
    } else if (type === "tags" && tagInput.trim()) {
      setNewListing({
        ...newListing,
        tags: [...newListing.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveItem = (type, index) => {
    if (type === "whatsIncluded") {
      const newItems = [...newListing.whatsIncluded];
      newItems.splice(index, 1);
      setNewListing({ ...newListing, whatsIncluded: newItems });
    } else if (type === "tags") {
      const newItems = [...newListing.tags];
      newItems.splice(index, 1);
      setNewListing({ ...newListing, tags: newItems });
    }
  };

  const handleCreateListing = (e) => {
    e.preventDefault();
    setListings([
      ...listings,
      { ...newListing, id: Date.now(), status: "active" },
    ]);
    setShowCreateListing(false);
    // Reset form
    setNewListing({
      title: "",
      category: "Wellness & Relaxation",
      price: "",
      vendorEmail: "",
      description: "",
      variations: [],
      whatsIncluded: [],
      redemptionRules: "",
      tags: [],
      mainImage: null,
      galleryImages: [],
    });
    alert("Listing Created Successfully!");
  };

  const handleVendorSelect = (e) => {
    const email = e.target.value;
    let rules = newListing.redemptionRules;

    // Auto-fill redemption rules if empty and a vendor is selected
    if (email && !rules) {
      rules =
        "1. Voucher is valid for 3 months from date of purchase.\n2. Prior reservation is mandatory.\n3. Present voucher upon arrival.";
    }

    setNewListing({
      ...newListing,
      vendorEmail: email,
      redemptionRules: rules,
    });
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <img src="/logo Aurea(1).png" alt="Auréa" className={styles.logo} />
          <span className={styles.admin}>Admin Console</span>
        </div>

        <nav className={styles.sideNav}>
          <button
            className={activeTab === "vendors" ? styles.active : ""}
            onClick={() => {
              setActiveTab("vendors");
              setShowCreateListing(false);
            }}
          >
            <Users size={20} /> Vendors
          </button>
          <button
            className={activeTab === "listings" ? styles.active : ""}
            onClick={() => {
              setActiveTab("listings");
              setShowCreateListing(false);
            }}
          >
            <FileText size={20} /> Listings
          </button>
          <button
            className={activeTab === "settings" ? styles.active : ""}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={20} /> Settings
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
          <h1>
            {showCreateListing
              ? "Create New Listing"
              : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <div className={styles.adminProfile}>
            <span>Super Admin</span>
          </div>
        </header>

        <div className={styles.content}>
          {/* VENDORS TAB */}
          {activeTab === "vendors" && (
            <div className={styles.approvalSection}>
              <h2>Vendor Management</h2>
              <div className={styles.approvalList}>
                {vendors.map((vendor) => (
                  <div key={vendor.id} className={styles.approvalItem}>
                    <div className={styles.itemInfo}>
                      <h3>{vendor.name}</h3>
                      <p>{vendor.email}</p>
                      <span
                        className={`${styles.statusBadge} ${styles[vendor.status]}`}
                      >
                        {vendor.status.charAt(0).toUpperCase() +
                          vendor.status.slice(1)}
                      </span>
                    </div>
                    {vendor.status === "pending" && (
                      <div className={styles.itemActions}>
                        <button
                          className={styles.approveBtn}
                          onClick={() => handleApproveVendor(vendor.id)}
                        >
                          <CheckCircle size={18} /> Approve
                        </button>
                        <button
                          className={styles.rejectBtn}
                          onClick={() => handleRejectVendor(vendor.id)}
                        >
                          <XCircle size={18} /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LISTINGS TAB */}
          {activeTab === "listings" && !showCreateListing && (
            <div>
              <div className={styles.actionsBar}>
                <button
                  className={styles.createBtn}
                  onClick={() => setShowCreateListing(true)}
                >
                  <Plus size={18} /> Create New Listing
                </button>
              </div>
              <div className={styles.listingsGrid}>
                {listings.length === 0 ? (
                  <p className={styles.emptyState}>No listings created yet.</p>
                ) : (
                  listings.map((listing) => (
                    <div key={listing.id} className={styles.listingCard}>
                      {listing.mainImage && (
                        <img
                          src={listing.mainImage}
                          alt={listing.title}
                          className={styles.cardIterimage}
                        />
                      )}
                      <div className={styles.cardContent}>
                        <h3>{listing.title}</h3>
                        <p>Price: ₹{listing.price}</p>
                        <p className={styles.textSm}>{listing.category}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* CREATE LISTING FORM */}
          {showCreateListing && (
            <div className={styles.formCard}>
              <form className={styles.form} onSubmit={handleCreateListing}>
                <div className={styles.formGroup}>
                  <label>Listing Title *</label>
                  <input
                    type="text"
                    required
                    value={newListing.title}
                    onChange={(e) =>
                      setNewListing({ ...newListing, title: e.target.value })
                    }
                    placeholder="e.g. Couples Spa Retreat"
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Category *</label>
                    <select
                      value={newListing.category}
                      onChange={(e) =>
                        setNewListing({
                          ...newListing,
                          category: e.target.value,
                        })
                      }
                    >
                      <option>Wellness & Relaxation</option>
                      <option>Culinary & Gourmet</option>
                      <option>Adventure & Thrill</option>
                      <option>Creative & Artistic</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Base Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={newListing.price}
                      onChange={(e) =>
                        setNewListing({ ...newListing, price: e.target.value })
                      }
                      placeholder="2500"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Vendor Email *</label>
                  <select
                    required
                    value={newListing.vendorEmail}
                    onChange={handleVendorSelect}
                  >
                    <option value="">Select Vendor</option>
                    {vendors
                      .filter((v) => v.status === "approved")
                      .map((v) => (
                        <option key={v.id} value={v.email}>
                          {v.name} ({v.email})
                        </option>
                      ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Description *</label>
                  <textarea
                    required
                    rows="4"
                    value={newListing.description}
                    onChange={(e) =>
                      setNewListing({
                        ...newListing,
                        description: e.target.value,
                      })
                    }
                    placeholder="Detailed description of the experience..."
                  ></textarea>
                </div>

                {/* WHAT'S INCLUDED */}
                <div className={styles.formGroup}>
                  <label>What's Included</label>
                  <div className={styles.variationInput}>
                    <input
                      type="text"
                      placeholder="Add an item (e.g. Welcome Drink)"
                      value={whatsIncludedInput}
                      onChange={(e) => setWhatsIncludedInput(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => handleAddItem("whatsIncluded")}
                      className={styles.addBtn}
                    >
                      Add
                    </button>
                  </div>
                  {newListing.whatsIncluded.length > 0 && (
                    <ul className={styles.variationList}>
                      {newListing.whatsIncluded.map((item, i) => (
                        <li key={i}>
                          <span>• {item}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem("whatsIncluded", i)}
                            className={styles.iconBtn}
                          >
                            <Trash2 size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* REDEMPTION RULES */}
                <div className={styles.formGroup}>
                  <label>Redemption Rules</label>
                  <textarea
                    rows="4"
                    value={newListing.redemptionRules}
                    onChange={(e) =>
                      setNewListing({
                        ...newListing,
                        redemptionRules: e.target.value,
                      })
                    }
                    placeholder="Rules for redeeming this voucher..."
                  ></textarea>
                  <p className={styles.helperText}>
                    *Will auto-fill with standard rules when vendor is selected
                    (if empty).
                  </p>
                </div>

                {/* TAGS */}
                <div className={styles.formGroup}>
                  <label>Tags</label>
                  <div className={styles.variationInput}>
                    <input
                      type="text"
                      placeholder="Add a tag (e.g. Best Seller)"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => handleAddItem("tags")}
                      className={styles.addBtn}
                    >
                      Add
                    </button>
                  </div>
                  {newListing.tags.length > 0 && (
                    <div className={styles.tagsContainer}>
                      {newListing.tags.map((tag, i) => (
                        <span key={i} className={styles.tagBadge}>
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveItem("tags", i)}
                            className={styles.tagRemoveBtn}
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* VARIATIONS */}
                <div className={styles.formGroup}>
                  <label>Price Variations (Optional)</label>
                  <div className={styles.variationInput}>
                    <input
                      type="text"
                      placeholder="Name (e.g. Weekend)"
                      value={variationInput.name}
                      onChange={(e) =>
                        setVariationInput({
                          ...variationInput,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={variationInput.price}
                      onChange={(e) =>
                        setVariationInput({
                          ...variationInput,
                          price: e.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={handleAddVariation}
                      className={styles.addBtn}
                    >
                      Add
                    </button>
                  </div>
                  {newListing.variations.length > 0 && (
                    <ul className={styles.variationList}>
                      {newListing.variations.map((v, i) => (
                        <li key={i}>
                          <span>
                            {v.name}: ₹{v.price}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveVariation(i)}
                            className={styles.iconBtn}
                          >
                            <Trash2 size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* IMAGES */}
                <div className={styles.formGroup}>
                  <label>Main Image *</label>
                  <div className={styles.fileUpload}>
                    <ImageIcon size={20} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "main")}
                      required={!newListing.mainImage}
                    />
                    {newListing.mainImage && (
                      <span className={styles.successText}>Image Selected</span>
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Gallery Images</label>
                  <div className={styles.fileUpload}>
                    <ImageIcon size={20} />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleImageUpload(e, "gallery")}
                    />
                    <span>
                      {newListing.galleryImages.length} images selected
                    </span>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => setShowCreateListing(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.submitBtn}>
                    Create Listing
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
