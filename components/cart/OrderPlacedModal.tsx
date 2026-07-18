"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiCheck } from "react-icons/fi";

type Props = {
  open: boolean;
  orderId: string;
  email?: string;
};

export default function OrderPlacedModal({ open, orderId, email }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" />

          {/* card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-sand bg-ivory p-8 text-center shadow-[0_50px_120px_-40px_rgba(4,52,96,0.7)] sm:p-10"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
              className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-lime text-navy"
            >
              <FiCheck size={38} />
            </motion.span>

            <h2 className="mt-7 font-serif text-3xl text-navy lg:text-4xl">
              Order Placed
            </h2>
            <p className="mt-3 text-[15px] text-navy/65">
              Thank you — your research order has been received
              {email ? (
                <>
                  {" "}
                  and a confirmation email is on its way to{" "}
                  <span className="text-navy">{email}</span>
                </>
              ) : (
                " and a confirmation email is on its way"
              )}
              . It is being prepared for release with full batch traceability.
            </p>

            <div className="mt-7 rounded-2xl border border-sand bg-white px-8 py-5">
              <p className="text-sm uppercase tracking-wider text-navy/50">
                Order Reference
              </p>
              <p className="mt-1 font-serif text-2xl text-navy">{orderId}</p>
            </div>

            <Link href="/#products" className="btn-lime mt-8 w-full justify-center">
              Continue Shopping
              <span className="icon-circle">
                <FiArrowRight size={16} />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
