"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { PRICING } from "@/lib/data";
import { SectionHeading } from "./ui/Bits";
import { cn } from "@/lib/utils";

export default function Pricing() {
  return (
    <section id="pricing" className="section-pad bg-ivory">
      <div className="container-x">
        <SectionHeading eyebrow="Wholesale & Supply" title="Research Supply" />

        <div className="mt-20 grid items-start gap-6 lg:grid-cols-3">
          {PRICING.map((p, i) => {
            const popular = p.popular;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "flex flex-col rounded-[30px] p-7 transition-all duration-500 ease-smooth sm:p-8",
                  popular
                    ? "bg-navy text-ivory shadow-[0_50px_90px_-50px_rgba(4,52,96,0.8)] lg:-mt-8 lg:mb-8"
                    : "border border-sand bg-white text-navy hover:-translate-y-1.5 hover:shadow-[0_40px_70px_-50px_rgba(4,52,96,0.5)]"
                )}
              >
                {popular && (
                  <div className="mb-6 rounded-full bg-white py-3 text-center font-serif text-lg italic text-navy">
                    Most Ordered
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl">
                      {p.n}. {p.name}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 max-w-[18ch] text-[15px]",
                        popular ? "text-ivory/70" : "text-navy/60"
                      )}
                    >
                      {p.desc}
                    </p>
                  </div>
                  <div className="relative h-20 w-24 flex-none overflow-hidden rounded-2xl">
                    <Image src={p.img} alt={p.name} fill sizes="120px" className="object-cover" />
                  </div>
                </div>

                <div
                  className={cn(
                    "my-7 h-px w-full",
                    popular ? "bg-white/15" : "bg-sand"
                  )}
                />

                <p className="font-serif text-5xl leading-none sm:text-[56px]">
                  {p.price}
                  <span
                    className={cn(
                      "ml-2 align-middle text-base font-sans",
                      popular ? "text-ivory/60" : "text-navy/50"
                    )}
                  >
                    USD
                  </span>
                </p>

                <a
                  href="#"
                  className="btn-lime group mt-7 w-full justify-between"
                >
                  <span>Order Now</span>
                  <span className="icon-circle transition-transform duration-500 group-hover:rotate-45">
                    <FiArrowUpRight size={18} />
                  </span>
                </a>

                <div
                  className={cn(
                    "mt-7 rounded-2xl p-6",
                    popular ? "bg-white/10" : "bg-beige"
                  )}
                >
                  <p className="font-serif text-xl">What&apos;s Included?</p>
                  <ul className="mt-4 space-y-3">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className={cn(
                          "flex items-center gap-3 text-[15px]",
                          popular ? "text-ivory/85" : "text-navy/80"
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            popular ? "bg-lime" : "bg-navy"
                          )}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
