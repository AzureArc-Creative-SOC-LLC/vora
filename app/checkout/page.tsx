"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiLoader, FiTag, FiX } from "react-icons/fi";
import { useCart } from "@/components/cart/CartContext";
import ShopHeader from "@/components/cart/ShopHeader";
import OrderPlacedModal from "@/components/cart/OrderPlacedModal";
import Footer from "@/components/Footer";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.microservices.tech";

export default function CheckoutPage() {
  const { items, subtotal, clear, ready } = useCart();

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postcode: "",
    country: "United Kingdom",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  // promo code
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [appliedPromoPercent, setAppliedPromoPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);

  const shipping = items.length ? 12 : 0;
  const discount = appliedPromo
    ? Math.round((subtotal * appliedPromoPercent) / 100)
    : 0;
  const total = subtotal + shipping - discount;

  const applyPromo = async () => {
    const code = promoInput.trim().toUpperCase();
    setPromoError("");
    if (!code) return;
    setPromoLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/promos/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 404 || data.valid === false) {
        setAppliedPromo("");
        setAppliedPromoPercent(0);
        setPromoError("That code isn’t valid.");
        return;
      }
      if (!res.ok || !data.ok) {
        setAppliedPromo("");
        setAppliedPromoPercent(0);
        setPromoError(data.error || "Couldn’t check that code. Try again.");
        return;
      }
      setAppliedPromo(code);
      setAppliedPromoPercent(Number(data.percent) || 0);
      setPromoInput(code);
    } catch {
      setPromoError("Network error. Please try again.");
    } finally {
      setPromoLoading(false);
    }
  };

  const removePromo = () => {
    setAppliedPromo("");
    setAppliedPromoPercent(0);
    setPromoInput("");
    setPromoError("");
  };

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/central/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            mobile: form.mobile,
          },
          shippingAddress: {
            line1: form.address,
            line2: form.apartment,
            city: form.city,
            postcode: form.postcode,
            country: form.country,
          },
          promoCode: appliedPromo,
          items: items.map((i) => ({ name: i.name, price: i.price, qty: i.qty })),
          subtotal,
          shipping,
          discount,
          total,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong");
      setOrderId(data.orderNumber || String(data.orderId || ""));
      setPlaced(true);
      clear();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not place order");
    } finally {
      setLoading(false);
    }
  };

  // ----- Empty guard (only when there is no placed order yet) -----
  if (ready && items.length === 0 && !placed) {
    return (
      <main className="min-h-screen bg-ivory">
        <ShopHeader />
        <div className="container-x flex flex-col items-center py-24 text-center">
          <h1 className="font-serif text-3xl text-navy">Nothing to check out</h1>
          <p className="mt-3 text-navy/60">Your cart is empty.</p>
          <Link href="/#products" className="btn-lime mt-8">
            Browse Products
            <span className="icon-circle">
              <FiArrowRight size={16} />
            </span>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory">
      <ShopHeader />

      <div className="container-x py-12 lg:py-16">
        <h1 className="font-serif text-4xl text-navy lg:text-5xl">Checkout</h1>
        <p className="mt-3 text-navy/60">
          Enter your shipping details and place your order securely.
        </p>

        <form
          onSubmit={submit}
          className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start"
        >
          {/* ---------- Left: details ---------- */}
          <div className="flex flex-col gap-6">
            {/* Contact */}
            <section className="rounded-[28px] border border-sand bg-white p-7 sm:p-8">
              <SectionTitle>Contact</SectionTitle>
              <div className="mt-5 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
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
              </div>
            </section>

            {/* Shipping */}
            <section className="rounded-[28px] border border-sand bg-white p-7 sm:p-8">
              <SectionTitle>Shipping address</SectionTitle>
              <div className="mt-5 grid gap-4">
                <Field
                  label="Address line 1"
                  value={form.address}
                  onChange={set("address")}
                  placeholder="123 Research Park"
                />
                <Field
                  label="Address line 2"
                  optional
                  value={form.apartment}
                  onChange={set("apartment")}
                  placeholder="Unit 4B"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="City"
                    value={form.city}
                    onChange={set("city")}
                    placeholder="London"
                  />
                  <Field
                    label="Postcode"
                    value={form.postcode}
                    onChange={set("postcode")}
                    placeholder="SW1A 1AA"
                  />
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-medium text-navy/60">
                    Country
                  </span>
                  <select
                    value={form.country}
                    onChange={set("country")}
                    className="w-full rounded-xl border border-sand bg-white px-4 py-3 text-[15px] text-navy outline-none transition-colors focus:border-navy/40"
                  >
                    <option>United Kingdom</option>
                    <option>Ireland</option>
                    <option>France</option>
                    <option>Germany</option>
                    <option>Netherlands</option>
                    <option>Spain</option>
                    <option>Other (EU)</option>
                  </select>
                </label>
              </div>
            </section>

          </div>

          {/* ---------- Right: order summary ---------- */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[28px] border border-sand bg-white p-7 sm:p-8">
              <h2 className="font-serif text-2xl text-navy">Your order</h2>

              <div className="mt-6 flex flex-col gap-4">
                {items.map((it) => (
                  <div key={it.slug} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 flex-none overflow-hidden rounded-xl bg-beige">
                      <Image
                        src={it.image}
                        alt={it.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                      <span className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-navy px-1 text-[11px] font-bold text-ivory">
                        {it.qty}
                      </span>
                    </div>
                    <p className="min-w-0 flex-1 text-[15px] text-navy">{it.name}</p>
                    <span className="font-medium text-navy">
                      £{it.price * it.qty}
                    </span>
                  </div>
                ))}
              </div>

              <div className="my-6 h-px bg-sand" />

              {/* promo code */}
              {appliedPromo ? (
                <div className="mb-5 flex items-center justify-between rounded-2xl bg-lime/40 px-4 py-3">
                  <span className="flex items-center gap-2 text-[14px] font-medium text-navy">
                    <FiTag size={15} /> {appliedPromo} applied
                    <span className="text-navy/55">· {appliedPromoPercent}% off</span>
                  </span>
                  <button
                    type="button"
                    onClick={removePromo}
                    aria-label="Remove promo code"
                    className="grid h-7 w-7 place-items-center rounded-full text-navy/55 hover:bg-white hover:text-navy"
                  >
                    <FiX size={15} />
                  </button>
                </div>
              ) : (
                <div className="mb-5">
                  <div className="flex gap-2">
                    <div className="flex flex-1 items-center rounded-xl border border-sand bg-white px-3 transition-colors focus-within:border-navy/40">
                      <FiTag className="text-navy/35" size={15} />
                      <input
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            applyPromo();
                          }
                        }}
                        placeholder="Promo code"
                        className="w-full bg-transparent px-2 py-2.5 text-[15px] uppercase text-navy outline-none placeholder:normal-case placeholder:text-navy/30"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={applyPromo}
                      disabled={promoLoading}
                      className="rounded-xl border border-navy/15 px-5 text-[14px] font-semibold text-navy transition-colors hover:bg-navy hover:text-ivory disabled:opacity-60"
                    >
                      {promoLoading ? "…" : "Apply"}
                    </button>
                  </div>
                  {promoError && (
                    <p className="mt-2 text-[13px] text-red-600">{promoError}</p>
                  )}
                </div>
              )}

              <dl className="space-y-3 text-[15px]">
                <div className="flex justify-between">
                  <dt className="text-navy/60">Subtotal</dt>
                  <dd className="font-medium text-navy">£{subtotal} GBP</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-navy/60">Tracked UK shipping</dt>
                  <dd className="font-medium text-navy">£{shipping} GBP</dd>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-navy/60">Discount ({appliedPromo})</dt>
                    <dd className="font-medium text-green-700">−£{discount} GBP</dd>
                  </div>
                )}
                <div className="flex items-center justify-between pt-2">
                  <dt className="font-serif text-lg text-navy">Total</dt>
                  <dd className="font-serif text-2xl text-navy">£{total} GBP</dd>
                </div>
              </dl>

              {error && <p className="mt-5 text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading || !items.length}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-btn px-8 py-4 font-semibold text-navy transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:bg-[#e6f9a6] disabled:opacity-70"
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

              <Link
                href="/cart"
                className="mt-3 block text-center text-sm text-navy/55 hover:text-navy"
              >
                Back to cart
              </Link>
            </div>

            <p className="mt-5 px-2 text-[12px] uppercase tracking-[0.14em] text-navy/40">
              For laboratory R&amp;D use only · Not for human or veterinary
              consumption
            </p>
          </aside>
        </form>
      </div>

      <OrderPlacedModal open={placed} orderId={orderId} email={form.email} />

      <Footer />
    </main>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#b59e7d]">
      {children}
    </h2>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = true,
  optional = false,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-navy/70">
        {label}
        {optional && <span className="font-normal text-navy/40"> (optional)</span>}
      </span>
      <input
        required={optional ? false : required}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-sand bg-white px-4 py-3 text-[15px] text-navy outline-none transition-colors placeholder:text-navy/30 focus:border-navy/40"
      />
    </label>
  );
}
