import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("user"); // 'user', 'vendor', 'admin'

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate OAuth delay
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("userRole", role); // Simple mock auth
      if (role === "vendor") {
        navigate("/vendor/dashboard");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/"); // User goes to home
      }
    }, 1500);
  };

  const getTitle = () => {
    if (role === "vendor") return "Partner Login";
    if (role === "admin") return "Admin Console";
    return "Welcome Back";
  };

  return (
    <div className={styles.loginPage}>
      <motion.div
        className={styles.loginCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.logoSection}>
          <img src="/logo Aurea(1).png" alt="Auréa" className={styles.logo} />
        </div>

        <h2>{getTitle()}</h2>
        <p className={styles.subtitle}>
          {role === "user"
            ? "Sign in to access your account"
            : role === "vendor"
              ? "Manage your experiences"
              : "System Administration"}
        </p>

        {/* Removed top role selector */}

        <div className={styles.formContainer}>
          <button
            className={styles.googleBtn}
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.loader}></span>
            ) : (
              <>
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className={styles.googleIcon}
                />
                <span>Sign in with Google</span>
              </>
            )}
          </button>

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <form
            className={styles.emailForm}
            onSubmit={(e) => {
              e.preventDefault();
              handleGoogleLogin(); // Mock login for email too
            }}
          >
            <div className={styles.inputGroup}>
              <Mail size={18} className={styles.inputIcon} />
              <input type="email" placeholder="Email Address" />
            </div>
            <div className={styles.inputGroup}>
              <Lock size={18} className={styles.inputIcon} />
              <input type="password" placeholder="Password" />
            </div>
            <button className={styles.submitBtn}>
              Sign In{" "}
              {role !== "user" &&
                `as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
            </button>
          </form>

          <div className={styles.alternateRoles}>
            {role !== "vendor" && (
              <button
                className={styles.roleLink}
                onClick={() => setRole("vendor")}
              >
                Sign in as Partner
              </button>
            )}
            {role !== "admin" && (
              <button
                className={styles.roleLink}
                onClick={() => setRole("admin")}
              >
                Sign in as Admin
              </button>
            )}
            {role !== "user" && (
              <button
                className={styles.roleLink}
                onClick={() => setRole("user")}
              >
                Sign in as User
              </button>
            )}
          </div>
        </div>

        <p className={styles.footerText}>
          Protected by reCAPTCHA and subject to the Google{" "}
          <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a>.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
