"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMinus, FiPlus, FiTrash2, FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { useCart } from "@/components/cart/CartContext";
import ShopHeader from "@/components/cart/ShopHeader";
import Footer from "@/components/Footer";

export default function CartPage() {
  const { items, setQty, remove, subtotal, count, ready } = useCart();
  const shipping = items.length ? 12 : 0;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-ivory">
      <ShopHeader />

      <div className="container-x py-12 lg:py-16">
        <h1 className="font-serif text-4xl text-navy lg:text-5xl">Your Cart</h1>
        <p className="mt-3 text-navy/60">
          {ready && count > 0
            ? `${count} item${count > 1 ? "s" : ""} ready for checkout`
            : "Review your research order"}
        </p>

        {ready && items.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-[28px] border border-sand bg-white py-24 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-beige text-navy">
              <FiShoppingBag size={26} />
            </span>
            <p className="mt-6 font-serif text-2xl text-navy">Your cart is empty</p>
            <p className="mt-2 text-navy/55">
              Browse our research compounds to get started.
            </p>
            <Link href="/#products" className="btn-lime mt-7">
              Browse Products
              <span className="icon-circle">
                <FiArrowRight size={16} />
              </span>
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
            {/* items */}
            <div className="flex flex-col gap-4">
              <AnimatePresence initial={false}>
                {items.map((it) => (
                  <motion.div
                    key={it.slug}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-4 rounded-[24px] border border-sand bg-white p-4 sm:gap-6 sm:p-5"
                  >
                    <Link
                      href={`/products/${it.slug}`}
                      className="relative h-24 w-24 flex-none overflow-hidden rounded-2xl bg-beige sm:h-28 sm:w-28"
                    >
                      <Image
                        src={it.image}
                        alt={it.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/products/${it.slug}`}
                        className="font-serif text-xl text-navy hover:text-navy-muted"
                      >
                        {it.name}
                      </Link>
                      <p className="mt-1 text-sm text-navy/50">
                        £{it.price} GBP each
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <div className="flex items-center gap-1 rounded-full border border-sand p-1">
                          <button
                            aria-label="Decrease"
                            onClick={() => setQty(it.slug, it.qty - 1)}
                            className="grid h-10 w-10 place-items-center rounded-full text-navy hover:bg-beige"
                          >
                            <FiMinus size={14} />
                          </button>
                          <span className="w-7 text-center font-medium text-navy">
                            {it.qty}
                          </span>
                          <button
                            aria-label="Increase"
                            onClick={() => setQty(it.slug, it.qty + 1)}
                            className="grid h-10 w-10 place-items-center rounded-full text-navy hover:bg-beige"
                          >
                            <FiPlus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => remove(it.slug)}
                          className="flex items-center gap-1.5 text-sm text-navy/45 transition-colors hover:text-red-600"
                        >
                          <FiTrash2 size={15} /> Remove
                        </button>
                      </div>
                    </div>

                    <div className="self-stretch text-right">
                      <span className="font-serif text-2xl text-navy">
                        £{it.price * it.qty}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* summary */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[28px] border border-sand bg-white p-7">
                <h2 className="font-serif text-2xl text-navy">Order Summary</h2>
                <dl className="mt-6 space-y-4 text-[15px]">
                  <div className="flex justify-between">
                    <dt className="text-navy/60">Subtotal</dt>
                    <dd className="font-medium text-navy">£{subtotal} GBP</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-navy/60">Tracked UK shipping</dt>
                    <dd className="font-medium text-navy">£{shipping} GBP</dd>
                  </div>
                  <div className="my-2 h-px bg-sand" />
                  <div className="flex items-center justify-between">
                    <dt className="font-serif text-lg text-navy">Total</dt>
                    <dd className="font-serif text-2xl text-navy">£{total} GBP</dd>
                  </div>
                </dl>

                <Link
                  href="/checkout"
                  className="btn-lime mt-7 w-full justify-between"
                >
                  Checkout
                  <span className="icon-circle">
                    <FiArrowRight size={16} />
                  </span>
                </Link>
                <Link
                  href="/#products"
                  className="mt-3 block text-center text-sm text-navy/55 hover:text-navy"
                >
                  Continue shopping
                </Link>
              </div>

              <p className="mt-5 px-2 text-[12px] uppercase tracking-[0.14em] text-navy/40">
                For laboratory R&amp;D use only · Not for human or veterinary
                consumption
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
