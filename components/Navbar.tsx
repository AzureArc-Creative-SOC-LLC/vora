"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiShoppingBag } from "react-icons/fi";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { NAV_LINKS } from "@/lib/data";
import { useCart } from "@/components/cart/CartContext";
import BrandLogo from "@/components/ui/BrandLogo";
import { cn } from "@/lib/utils";

function CartButton({ dark = false }: { dark?: boolean }) {
  const { count } = useCart();
  return (
    <Link
      href="/cart"
      aria-label="Cart"
      className={cn(
        "relative grid h-11 w-11 place-items-center rounded-full border transition-colors",
        dark
          ? "border-white/20 bg-white/10 text-ivory hover:bg-white/20"
          : "border-navy/15 bg-white text-navy hover:bg-navy hover:text-ivory"
      )}
    >
      <FiShoppingBag size={18} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-lime px-1 text-[11px] font-bold text-navy">
          {count}
        </span>
      )}
    </Link>
  );
}

function Logo({ dark = false }: { dark?: boolean }) {
  return <BrandLogo dark={dark} />;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 [padding-left:max(1rem,env(safe-area-inset-left))] [padding-right:max(1rem,env(safe-area-inset-right))]"
      >
        <nav
          className={cn(
            "mt-4 flex w-full max-w-[1320px] items-center justify-between rounded-full border border-white/80 bg-white/95 pl-7 pr-3 backdrop-blur-xl transition-all duration-500 ease-smooth",
            scrolled
              ? "py-2 shadow-[0_18px_50px_-30px_rgba(4,52,96,0.55)]"
              : "py-2.5 shadow-[0_10px_40px_-28px_rgba(4,52,96,0.45)]"
          )}
        >
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label} className="group relative">
                <Link
                  href={link.href}
                  className="relative flex items-center gap-1 px-4 py-2 text-[15px] text-navy/90 transition-colors hover:text-navy"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-navy transition-all duration-500 ease-smooth group-hover:w-full" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <CartButton />
            <Link
              href="#products"
              className="hidden items-center justify-center rounded-full border border-navy/30 bg-white px-7 py-3 text-[15px] font-semibold text-navy transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:bg-navy hover:text-ivory sm:flex"
            >
              Shop Now
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full bg-navy text-ivory lg:hidden"
            >
              <HiBars3 size={22} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-navy text-ivory lg:hidden"
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <Logo dark />
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-ivory"
              >
                <HiXMark size={24} />
              </button>
            </div>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
              }}
              className="mt-10 flex flex-col gap-1 px-6"
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.label}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-white/10"
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-5 font-serif text-3xl"
                  >
                    {link.label}
                    <FiArrowUpRight className="text-lime" />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="px-6 pt-10"
            >
              <Link
                href="#products"
                onClick={() => setOpen(false)}
                className="btn-lime w-full justify-between"
              >
                Shop Now
                <span className="icon-circle">
                  <FiArrowUpRight size={18} />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
