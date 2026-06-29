import Link from "next/link";
import { LuAtom } from "react-icons/lu";
import { cn } from "@/lib/utils";

export default function BrandLogo({
  dark = false,
  href = "/",
}: {
  dark?: boolean;
  href?: string;
}) {
  return (
    <Link href={href} className="group flex items-center gap-2.5">
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-xl transition-transform duration-500 ease-smooth group-hover:rotate-12",
          dark ? "bg-lime text-navy" : "bg-navy text-lime"
        )}
      >
        <LuAtom size={20} strokeWidth={2} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[21px] font-extrabold tracking-tight",
            dark ? "text-ivory" : "text-navy"
          )}
        >
          VORA
        </span>
        <span
          className={cn(
            "mt-0.5 text-[9px] font-semibold uppercase tracking-[0.34em]",
            dark ? "text-ivory/55" : "text-navy/50"
          )}
        >
          Labs
        </span>
      </span>
    </Link>
  );
}
