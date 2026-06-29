"use client";

export default function AnnouncementBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] flex h-8 items-center justify-center border-b border-white/10 bg-navy px-4 sm:h-9">
      <p className="truncate text-center text-[11px] uppercase tracking-[0.18em] text-ivory/75 sm:text-[12px]">
        Research use only — not for human or veterinary consumption
        <span className="mx-3 hidden text-lime/70 sm:inline">·</span>
        <span className="hidden sm:inline">Independently Janoshik tested</span>
      </p>
    </div>
  );
}
