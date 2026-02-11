import React, { useEffect } from "react";

const SEO = ({ title, description }) => {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    // Cleanup (optional: reset to default if needed on unmount, but usually not necessary for SPA nav)
    return () => {
      // Could reset to default app title if desired
    };
  }, [title, description]);

  return null;
};

export default SEO;
