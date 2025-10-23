import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProduct, getProductById } from "../../redux/slices/productSlice";
import { motion } from "framer-motion";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import "./Product.css";
import axios from "axios";
import Lottie from "lottie-react";
import successAnim from "../../assets/animations/success.json"; // ✅ animasyon importu
import { addToBasket, calculateBasket } from "../../redux/slices/basketSlice";

/* --- SplitText bileşeni --- */
function SplitText({ text }) {
  const words = useMemo(() => text?.split(" ") ?? [], [text]);
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };
  const word = {
    hidden: { opacity: 0, y: "0.8em", scale: 0.98 },
    visible: { opacity: 1, y: "0em", scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <motion.h1 className="split-heading" variants={container} initial="hidden" animate="visible">
      {words.map((w, i) => (
        <span className="word-clip" key={`${w}-${i}`}>
          <motion.span className="word" variants={word}>
            {w}
          </motion.span>
          <span className="space">&nbsp;</span>
        </span>
      ))}
    </motion.h1>
  );
}

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, selectedProduct, loading } = useSelector((store) => store.product);
  const { price, image, title, description } = selectedProduct;
  const [count, setCount] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    const payload = {
      id,
      price,
      image,
      title,
      description,
      count
    }
    dispatch(addToBasket(payload));
    dispatch(calculateBasket());
    try {
      const res = await axios.get("/success.json");
      console.log("Sepete eklendi:", res.data);

      setAdded(true);
      setTimeout(() => setAdded(false), 2500); // animasyon süresi kadar
    } catch (err) {
      console.error("Sepete ekleme hatası:", err);
    }
  };

  useEffect(() => {
    if (products && products.length > 0) {
      const found = products.find((p) => String(p.id) === String(id));
      if (found) {
        dispatch(selectProduct(found));
        return;
      }
    }
    dispatch(getProductById(id));
  }, [products, id, dispatch]);

  if (loading || !selectedProduct || !selectedProduct.id) {
    return (
      <div className="product-details loading">
        <div className="skeleton-img" />
        <div className="skeleton-text" />
      </div>
    );
  }



  const increase = () => setCount((prev) => prev + 1);
  const reduce = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="product-details">
      <motion.img
        src={image}
        alt={title}
        className="product-img"
        initial={{ opacity: 0, x: 0, scale: 0.86 }}
        animate={{ opacity: 1, x: -140, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />

      <div className="product-texts">
        <SplitText text={title} />

        <motion.p
          className="desc"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {description}
        </motion.p>

        <motion.p
          className="price"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
        >
          {price} ₺
        </motion.p>

        <div className="action-box">
          <motion.div
            className="quantity-box"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <CiCircleMinus onClick={reduce} className="icon" />
            <input type="number" value={count} readOnly className="qty-input" />
            <CiCirclePlus onClick={increase} className="icon" />
          </motion.div>

          <motion.button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            whileTap={{ scale: 0.95 }}
          >
            Sepete Ekle
          </motion.button>

          {/* 🔹 Lottie animasyon (tik işareti) */}
          {added && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="success-toast"
            >
              <Lottie
                animationData={successAnim}
                loop={false}
                style={{ width: 45, height: 45 }}
              />
              <span className="success-text">Sepete eklendi!</span>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
