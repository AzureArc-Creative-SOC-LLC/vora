"use client";

import Link from "next/link";
import { FiArrowLeft, FiShoppingBag } from "react-icons/fi";
import BrandLogo from "@/components/ui/BrandLogo";
import { useCart } from "@/components/cart/CartContext";

export default function ShopHeader() {
  const { count, ready } = useCart();
  return (
    <header className="sticky top-0 z-50 border-b border-sand/70 bg-ivory/90 backdrop-blur-xl">
      <div className="container-x flex h-20 items-center justify-between">
        <BrandLogo />

        <div className="flex items-center gap-3">
          <Link
            href="/#products"
            className="hidden items-center gap-2 text-[15px] font-medium text-navy/80 transition-colors hover:text-navy sm:flex"
          >
            <FiArrowLeft size={16} /> Back to Shop
          </Link>
          <Link
            href="/cart"
            aria-label={`Cart${ready && count > 0 ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`}
            className="relative grid h-11 w-11 place-items-center rounded-full border border-navy/15 bg-white text-navy transition-colors hover:bg-navy hover:text-ivory"
          >
            <FiShoppingBag size={18} />
            {ready && count > 0 && (
              <span
                aria-hidden
                className="absolute -right-1 -top-1 grid min-w-[20px] h-5 place-items-center rounded-full bg-navy px-1 text-[11px] font-semibold leading-none text-ivory ring-2 ring-white"
              >
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
