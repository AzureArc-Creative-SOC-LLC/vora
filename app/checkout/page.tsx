"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheck, FiLock } from "react-icons/fi";
import { useCart } from "@/components/cart/CartContext";
import ShopHeader from "@/components/cart/ShopHeader";
import OrderModal from "@/components/cart/OrderModal";
import Footer from "@/components/Footer";

export default function CheckoutPage() {
  const { items, subtotal, clear, ready } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const shipping = items.length ? 12 : 0;
  const total = subtotal + shipping;

  const handleSuccess = (id: string) => {
    setOrderId(id);
    setPlaced(true);
    setModalOpen(false);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ----- Order placed confirmation -----
  if (placed) {
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

  // ----- Empty guard -----
  if (ready && items.length === 0) {
    return (
      <main className="min-h-screen bg-ivory">
        <ShopHeader />
        <div className="container-x flex flex-col items-center py-24 text-center">
          <h1 className="font-serif text-3xl text-navy">Nothing to check out</h1>
          <p className="mt-3 text-navy/60">Your cart is empty.</p>
          <Link href="/#products" className="btn-lime mt-8">
            Browse Products
            <span className="icon-circle">
              <FiArrowRight size={16} />
            </span>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory">
      <ShopHeader />
      <div className="container-x py-12 lg:py-16">
        <h1 className="font-serif text-4xl text-navy lg:text-5xl">Checkout</h1>
        <p className="mt-3 text-navy/60">Review your order and place it securely.</p>

        <div className="mx-auto mt-10 max-w-xl">
          <div className="rounded-[28px] border border-sand bg-white p-7 sm:p-8">
            <h2 className="font-serif text-2xl text-navy">Your Order</h2>
            <div className="mt-6 flex flex-col gap-4">
              {items.map((it) => (
                <div key={it.slug} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 flex-none overflow-hidden rounded-xl bg-beige">
                    <Image
                      src={it.image}
                      alt={it.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                    <span className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-navy px-1 text-[11px] font-bold text-ivory">
                      {it.qty}
                    </span>
                  </div>
                  <p className="min-w-0 flex-1 text-[15px] text-navy">{it.name}</p>
                  <span className="font-medium text-navy">£{it.price * it.qty}</span>
                </div>
              ))}
            </div>

            <div className="my-6 h-px bg-sand" />
            <dl className="space-y-3 text-[15px]">
              <div className="flex justify-between">
                <dt className="text-navy/60">Subtotal</dt>
                <dd className="font-medium text-navy">£{subtotal} GBP</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-navy/60">Tracked UK shipping</dt>
                <dd className="font-medium text-navy">£{shipping} GBP</dd>
              </div>
              <div className="flex items-center justify-between pt-2">
                <dt className="font-serif text-lg text-navy">Total</dt>
                <dd className="font-serif text-2xl text-navy">£{total} GBP</dd>
              </div>
            </dl>

            <button
              onClick={() => setModalOpen(true)}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-btn px-8 py-4 font-semibold text-navy transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:bg-[#e6f9a6]"
            >
              Place Order <FiArrowRight size={18} />
            </button>
            <Link
              href="/cart"
              className="mt-3 block text-center text-sm text-navy/55 hover:text-navy"
            >
              Back to cart
            </Link>
          </div>

          <p className="mt-5 flex items-center justify-center gap-2 text-[13px] text-navy/45">
            <FiLock size={13} /> Demo checkout — no real payment is processed.
          </p>
        </div>
      </div>

      <OrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
        items={items}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
      />

      <Footer />
    </main>
  );
}
