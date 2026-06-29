"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import ShopHeader from "./ShopHeader";
import Footer from "@/components/Footer";

export default function OrderPlaced({ orderId }: { orderId: string }) {
  return (
    <main className="min-h-screen bg-ivory">
      <ShopHeader />
      <div className="container-x flex flex-col items-center py-24 text-center">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="grid h-20 w-20 place-items-center rounded-full bg-lime text-navy"
        >
          <FiCheck size={38} />
        </motion.span>
        <h1 className="mt-8 font-serif text-4xl text-navy lg:text-5xl">
          Order Placed
        </h1>
        <p className="mt-4 max-w-md text-navy/65">
          Thank you — your research order has been received and a confirmation
          email is on its way. It is being prepared for tracked, cold-chain
          dispatch.
        </p>
        <div className="mt-8 rounded-2xl border border-sand bg-white px-8 py-5">
          <p className="text-sm uppercase tracking-wider text-navy/50">
            Order Reference
          </p>
          <p className="mt-1 font-serif text-2xl text-navy">{orderId}</p>
        </div>
        <Link href="/#products" className="btn-lime mt-10">
          Continue Shopping
          <span className="icon-circle">
            <FiArrowRight size={16} />
          </span>
        </Link>
      </div>
      <Footer />
    </main>
  );
}
