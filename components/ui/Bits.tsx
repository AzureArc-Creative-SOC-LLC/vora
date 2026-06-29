"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import SplitReveal from "./SplitReveal";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("eyebrow", className)}
    >
      <LuSparkles className="text-navy" size={15} />
      {children}
    </motion.span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  align = "center",
  light = false,
  className,
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <SplitReveal
        text={title}
        as="h2"
        className={cn(
          "display-2 max-w-[16ch]",
          light ? "text-lime" : "text-navy",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}

export function LimeButton({
  children,
  href = "#",
  className,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("btn-lime group", className)}>
      <span>{children}</span>
      <span className="icon-circle transition-transform duration-500 ease-smooth group-hover:rotate-45">
        <FiArrowUpRight size={18} />
      </span>
    </Link>
  );
}

export function GhostButton({
  children,
  href = "#",
  className,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("btn-ghost", className)}>
      {children}
    </Link>
  );
}

export { FiArrowUpRight };
