"use client";

import { useState } from "react";

const inputCls =
  "w-full rounded-xl border border-sand bg-white px-4 py-3 text-[15px] text-navy outline-none transition-colors placeholder:text-navy/30 focus:border-navy/40";

export function AuthField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  required = true,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-navy/70">
        {label}
      </span>
      <input
        required={required}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={inputCls}
      />
    </label>
  );
}

export function AuthSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-navy/70">
        {label}
      </span>
      <select value={value} onChange={onChange} className={inputCls}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

export function PasswordField({
  label,
  value,
  onChange,
  placeholder = "••••••••",
  autoComplete = "current-password",
  forgotHref,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  forgotHref?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-[13px] font-medium text-navy/70">
        {label}
        {forgotHref && (
          <a
            href={forgotHref}
            className="font-medium text-navy/55 hover:text-navy"
          >
            Forgot?
          </a>
        )}
      </span>
      <div className="flex items-center rounded-xl border border-sand bg-white pr-2 transition-colors focus-within:border-navy/40">
        <input
          required
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full rounded-xl bg-transparent px-4 py-3 text-[15px] text-navy outline-none placeholder:text-navy/30"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-navy/55 transition-colors hover:bg-beige hover:text-navy"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </label>
  );
}
