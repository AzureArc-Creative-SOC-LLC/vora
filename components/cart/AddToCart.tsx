"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMinus, FiPlus, FiCheck, FiShoppingBag } from "react-icons/fi";
import { useCart } from "./CartContext";
import type { Product } from "@/lib/products";

export default function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      {/* qty stepper */}
      <div className="flex items-center justify-between rounded-full border border-sand bg-white px-2 py-2 sm:w-auto">
        <button
          aria-label="Decrease"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="grid h-11 w-11 place-items-center rounded-full text-navy transition-colors hover:bg-beige"
        >
          <FiMinus size={16} />
        </button>
        <span className="w-10 text-center font-serif text-xl text-navy">{qty}</span>
        <button
          aria-label="Increase"
          onClick={() => setQty((q) => q + 1)}
          className="grid h-11 w-11 place-items-center rounded-full text-navy transition-colors hover:bg-beige"
        >
          <FiPlus size={16} />
        </button>
      </div>

      <button
        onClick={handleAdd}
        className="inline-flex flex-1 items-center justify-center rounded-full bg-lime-btn px-8 py-4 font-semibold text-navy transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:bg-[#e6f9a6] hover:shadow-[0_22px_40px_-22px_rgba(4,52,96,0.5)] sm:flex-none"
      >
        <AnimatePresence mode="wait" initial={false}>
          {added ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-2"
            >
              <FiCheck size={18} /> Added to cart
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-2"
            >
              <FiShoppingBag size={17} /> Add to Cart
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <Link
        href="/cart"
        className="btn-ghost justify-center sm:flex-none"
      >
        View Cart
      </Link>
    </div>
  );
}
