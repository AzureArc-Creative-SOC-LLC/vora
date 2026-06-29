"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { LuShieldAlert } from "react-icons/lu";
import { FOOTER_LINKS } from "@/lib/data";
import BrandLogo from "@/components/ui/BrandLogo";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer id="footer" className="bg-navy text-ivory">
      <div className="container-x py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-10">
          {/* Brand */}
          <div>
            <BrandLogo dark />
            <h3 className="mt-8 font-serif text-4xl leading-tight text-ivory lg:text-5xl">
              Advancing Discovery
              <br />
              Through Precision Research
            </h3>
            <p className="mt-5 max-w-md text-ivory/65">
              Vora Labs develops, fills and independently verifies premium
              research peptides for controlled laboratory R&amp;D — every batch
              backed by a Janoshik certificate of analysis.
            </p>
            <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[13px] text-ivory/70">
              <LuShieldAlert size={18} className="flex-none text-lime" />
              Vora Labs does not operate on any social media. Order only via the
              official site — beware of impersonators.
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-serif text-2xl text-lime">Quick Links</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3.5">
              {FOOTER_LINKS.quick.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-ivory/70 transition-colors hover:text-lime"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-10 font-serif text-2xl text-lime">Utility</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3.5">
              {FOOTER_LINKS.utility.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-ivory/70 transition-colors hover:text-lime"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="font-serif text-2xl text-lime">Research Updates</p>
            <p className="mt-6 text-ivory/65">
              Join our research letter for batch releases, new COAs and restock
              alerts.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-5"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-transparent text-[15px] text-ivory placeholder:text-ivory/40 focus:outline-none"
              />
              <motion.button
                whileTap={{ scale: 0.94 }}
                type="submit"
                aria-label="Subscribe"
                className="grid h-11 w-11 flex-none place-items-center rounded-full bg-lime text-navy"
              >
                <FiArrowUpRight size={18} />
              </motion.button>
            </form>
            <div className="mt-8 space-y-2 text-ivory/65">
              <p>research@voralabs.com</p>
              <p>Tracked, cold-chain UK shipping</p>
              <p>United Kingdom</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-[13px] text-ivory/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Vora Labs. All rights reserved.</p>
          <p className="uppercase tracking-[0.14em]">
            For laboratory R&amp;D use only — not for human or veterinary
            consumption
          </p>
        </div>
      </div>
    </footer>
  );
}
