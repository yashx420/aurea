import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import styles from "./Cart.module.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();

  const subtotal = getCartTotal();
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className={styles.cartPage}>
        <div className={`container ${styles.emptyCart}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ShoppingBag size={80} className={styles.emptyIcon} />
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added any experiences yet.</p>
            <Link to="/experiences" className={styles.shopBtn}>
              Explore Experiences <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className="container">
        <motion.h1
          className={styles.pageTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Shopping Cart
        </motion.h1>

        <div className={styles.cartLayout}>
          <div className={styles.cartItems}>
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={styles.cartItem}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.itemImage}
                />

                <div className={styles.itemDetails}>
                  <h3>{item.title}</h3>
                  <p className={styles.itemCategory}>{item.category}</p>
                  <p className={styles.itemPrice}>
                    ₹{item.price.toLocaleString()}
                  </p>
                </div>

                <div className={styles.itemActions}>
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className={styles.quantityBtn}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className={styles.quantityBtn}
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeBtn}
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className={styles.itemTotal}>
                  ₹{(item.price * item.quantity).toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={styles.cartSummary}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2>Order Summary</h2>

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Tax (GST 18%)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>

            <div className={styles.summaryDivider}></div>

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            <button className={styles.checkoutBtn}>
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <Link to="/experiences" className={styles.continueBtn}>
              Continue Shopping
            </Link>

            <button onClick={clearCart} className={styles.clearBtn}>
              Clear Cart
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
