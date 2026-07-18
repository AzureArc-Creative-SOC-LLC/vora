"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiArrowRight, FiLoader } from "react-icons/fi";
import type { CartItem } from "./CartContext";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.microservices.tech";
  // "http://localhost:5003";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: (id: string) => void;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

export default function OrderModal({
  open,
  onClose,
  onSuccess,
  items,
  subtotal,
  shipping,
  total,
}: Props) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/central/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({ name: i.name, price: i.price, qty: i.qty })),
          subtotal,
          shipping,
          total,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong");
      onSuccess(data.orderNumber || String(data.orderId || ""));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not place order");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={() => !loading && onClose()}
          />

          {/* card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-sand bg-ivory p-7 shadow-[0_50px_120px_-40px_rgba(4,52,96,0.7)] sm:p-9"
          >
            <button
              onClick={() => !loading && onClose()}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full text-navy/50 transition-colors hover:bg-beige hover:text-navy"
            >
              <FiX size={18} />
            </button>

            <h2 className="font-serif text-3xl text-navy">Complete your order</h2>
            <p className="mt-2 text-[15px] text-navy/60">
              Enter your details and we&apos;ll confirm your order by email.
            </p>

            <form onSubmit={submit} className="mt-7 flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="First name"
                  value={form.firstName}
                  onChange={set("firstName")}
                  placeholder="Jordan"
                />
                <Field
                  label="Last name"
                  value={form.lastName}
                  onChange={set("lastName")}
                  placeholder="Avery"
                />
              </div>
              <Field
                label="Email address"
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="you@lab.com"
              />
              <Field
                label="Mobile number"
                type="tel"
                value={form.mobile}
                onChange={set("mobile")}
                placeholder="+44 ..."
              />

              <div className="mt-1 flex items-center justify-between rounded-2xl bg-beige px-5 py-3.5">
                <span className="text-[15px] text-navy/70">Total</span>
                <span className="font-serif text-2xl text-navy">${total.toFixed(2)} USD</span>
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-btn px-8 py-4 font-semibold text-navy transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:bg-[#e6f9a6] disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin" size={18} /> Placing order…
                  </>
                ) : (
                  <>
                    Place Order <FiArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-navy/60">
        {label}
      </span>
      <input
        required
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-sand bg-white px-4 py-3 text-[15px] text-navy outline-none transition-colors placeholder:text-navy/30 focus:border-navy/40"
      />
    </label>
  );
}
