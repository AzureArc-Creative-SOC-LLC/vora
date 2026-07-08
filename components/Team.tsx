"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LuMail, LuFlaskConical } from "react-icons/lu";
import { TEAM } from "@/lib/data";
import { SectionHeading } from "./ui/Bits";

export default function Team() {
  return (
    <section id="team" className="section-pad bg-ivory">
      <div className="container-x">
        <SectionHeading eyebrow="Our Team" title="The Scientists" />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[30px]">
                <Image
                  src={m.img}
                  alt={m.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1.4s] ease-smooth group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent opacity-100 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex translate-y-0 items-center justify-center gap-3 p-6 opacity-100 transition-all duration-500 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                  {[LuMail, LuFlaskConical].map((Icon, idx) => (
                    <span
                      key={idx}
                      className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-navy transition-colors hover:bg-lime"
                    >
                      <Icon size={16} />
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-5">
                <h3 className="font-serif text-2xl text-navy">{m.name}</h3>
                <p className="mt-1 text-navy/60">{m.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
