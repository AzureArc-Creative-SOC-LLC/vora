"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiLoader, FiPackage, FiTruck } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import ShopHeader from "@/components/cart/ShopHeader";
import Footer from "@/components/Footer";
import { getOrderByNumber } from "@/services/order.service";
import { ApiError } from "@/lib/apiClient";
import { formatMoney, formatDate, statusTone } from "@/lib/format";
import type { OrderDetailResponse } from "@/types/api";

export default function TrackPage() {
  return (
    <Suspense fallback={null}>
      <TrackOrder />
    </Suspense>
  );
}

function StatusBadge({ status }: { status: string | null | undefined }) {
  const { className, label } = statusTone(status);
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[13px] font-semibold ${className}`}
    >
      {label}
    </span>
  );
}

function TrackOrder() {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<OrderDetailResponse | null>(null);

  const lookup = useCallback(async (orderNumber: string) => {
    const trimmed = orderNumber.trim();
    if (!trimmed) return;
    setLoading(true);
    setError("");
    setData(null);
    try {
      const result = await getOrderByNumber(trimmed);
      setData(result);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setError("No order found with that number. Check it and try again.");
      } else {
        setError(err instanceof Error ? err.message : "Could not look up that order.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Deep-link support: /track?order=ORD-...
  useEffect(() => {
    const initial = params.get("order");
    if (initial) {
      setQuery(initial);
      lookup(initial);
    }
  }, [params, lookup]);

  const order = data?.order;

  return (
    <main className="min-h-screen bg-ivory">
      <ShopHeader />

      <div className="container-x py-12 lg:py-16">
        <h1 className="font-serif text-4xl text-navy lg:text-5xl">Track your order</h1>
        <p className="mt-3 text-navy/60">
          Enter your order number to see its status and details.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            lookup(query);
          }}
          className="mt-8 flex max-w-xl gap-2"
        >
          <div className="flex flex-1 items-center rounded-full border border-sand bg-white px-4 transition-colors focus-within:border-navy/40">
            <FiSearch className="text-navy/35" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. ORD-20250101-120000000-ABC123"
              className="w-full bg-transparent px-3 py-3.5 text-[15px] text-navy outline-none placeholder:text-navy/30"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-lime-btn px-7 py-3.5 font-semibold text-navy transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:bg-[#e6f9a6] disabled:opacity-70"
          >
            {loading ? <FiLoader className="animate-spin" size={18} /> : "Track"}
          </button>
        </form>

        {error && (
          <div className="mt-8 max-w-xl rounded-2xl border border-sand bg-white p-6 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-beige text-navy/60">
              <FiPackage size={22} />
            </span>
            <p className="mt-4 text-navy/70">{error}</p>
          </div>
        )}

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start"
          >
            {/* Left: status + items */}
            <div className="flex flex-col gap-6">
              <section className="rounded-[28px] border border-sand bg-white p-7 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[13px] uppercase tracking-wider text-navy/50">
                      Order
                    </p>
                    <p className="mt-1 font-serif text-2xl text-navy">
                      {order.order_number}
                    </p>
                    <p className="mt-1 text-[13px] text-navy/55">
                      Placed {formatDate(order.created_at)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge status={order.status} />
                    <span className="text-[12px] text-navy/45">Order status</span>
                  </div>
                </div>

                <div className="my-6 h-px bg-sand" />

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-[13px] text-navy/50">Payment</p>
                    <div className="mt-1">
                      <StatusBadge status={order.payment_status} />
                    </div>
                  </div>
                  <div>
                    <p className="text-[13px] text-navy/50">Method</p>
                    <p className="mt-1.5 text-[15px] text-navy">{order.payment_method}</p>
                  </div>
                  <div>
                    <p className="text-[13px] text-navy/50">Tracking number</p>
                    <p className="mt-1.5 flex items-center gap-1.5 text-[15px] text-navy">
                      {order.tracking_number ? (
                        <>
                          <FiTruck size={15} /> {order.tracking_number}
                        </>
                      ) : (
                        <span className="text-navy/45">Not yet assigned</span>
                      )}
                    </p>
                  </div>
                </div>
              </section>

              {data.items.length > 0 && (
                <section className="rounded-[28px] border border-sand bg-white p-7 sm:p-8">
                  <h2 className="font-serif text-2xl text-navy">Items</h2>
                  <div className="mt-5 flex flex-col divide-y divide-sand">
                    {data.items.map((it) => (
                      <div key={it.id} className="flex items-center justify-between gap-4 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-[15px] text-navy">{it.name}</p>
                          <p className="text-[13px] text-navy/50">
                            Qty {it.quantity} · {formatMoney(it.unit_price)}
                          </p>
                        </div>
                        <span className="font-medium text-navy">
                          {formatMoney(it.line_total)}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right: customer + shipping + totals */}
            <aside className="flex flex-col gap-6">
              <section className="rounded-[28px] border border-sand bg-white p-7 sm:p-8">
                <h2 className="font-serif text-2xl text-navy">Summary</h2>
                <dl className="mt-5 space-y-3 text-[15px]">
                  <div className="flex justify-between">
                    <dt className="text-navy/60">Subtotal</dt>
                    <dd className="font-medium text-navy">{formatMoney(order.subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-navy/60">Shipping</dt>
                    <dd className="font-medium text-navy">{formatMoney(order.shipping)}</dd>
                  </div>
                  {order.discount_amount && Number(order.discount_amount) > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-navy/60">
                        Discount{order.promo_code ? ` (${order.promo_code})` : ""}
                      </dt>
                      <dd className="font-medium text-green-700">
                        −{formatMoney(order.discount_amount)}
                      </dd>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-t border-sand pt-3">
                    <dt className="font-serif text-lg text-navy">Total</dt>
                    <dd className="font-serif text-2xl text-navy">
                      {formatMoney(order.total)}
                    </dd>
                  </div>
                </dl>
              </section>

              <section className="rounded-[28px] border border-sand bg-white p-7 sm:p-8">
                <h2 className="font-serif text-2xl text-navy">Shipping to</h2>
                <div className="mt-4 space-y-1 text-[15px] text-navy/75">
                  <p className="text-navy">{order.customer_name}</p>
                  {order.shipping_address && <p>{order.shipping_address}</p>}
                  <p>
                    {[order.shipping_city, order.shipping_zip]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  {order.shipping_country && <p>{order.shipping_country}</p>}
                  <p className="pt-2 text-[13px] text-navy/55">
                    {order.customer_email}
                    {order.customer_phone ? ` · ${order.customer_phone}` : ""}
                  </p>
                </div>
              </section>
            </aside>
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  );
}
