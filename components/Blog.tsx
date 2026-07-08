"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { BLOG } from "@/lib/data";
import { SectionHeading } from "./ui/Bits";

export default function Blog() {
  return (
    <section id="blog" className="section-pad bg-ivory">
      <div className="container-x">
        <SectionHeading eyebrow="Research & Insights" title="From The Lab" />

        <div className="mt-16 grid gap-7 md:grid-cols-3">
          {BLOG.map((b, i) => (
            <motion.article
              key={b.title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[26px]">
                <Image
                  src={b.img}
                  alt={b.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1.4s] ease-smooth group-hover:scale-110"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1.5 text-[13px] font-semibold text-navy backdrop-blur">
                  {b.category}
                </span>
              </div>

              <div className="mt-5 flex items-center gap-3 text-[13px] text-navy/55">
                <span>{b.date}</span>
                <span className="h-1 w-1 rounded-full bg-navy/30" />
                <span>{b.read} Read</span>
              </div>

              <h3 className="mt-3 font-serif text-2xl leading-snug text-navy transition-colors group-hover:text-navy-muted">
                {b.title}
              </h3>

              <div className="mt-5 flex items-center justify-between border-t border-sand pt-5">
                <span className="text-[14px] text-navy/70">By {b.author}</span>
                <span className="grid h-11 w-11 place-items-center rounded-full border border-sand text-navy transition-all duration-500 group-hover:bg-navy group-hover:text-lime">
                  <FiArrowUpRight size={18} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
