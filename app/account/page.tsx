"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiLoader, FiPackage, FiArrowRight, FiLogOut } from "react-icons/fi";
import ShopHeader from "@/components/cart/ShopHeader";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/Toast";
import { getOrdersByEmail } from "@/services/order.service";
import { formatMoney, formatDate, statusTone } from "@/lib/format";
import type { OrderRow } from "@/types/api";

export default function AccountPage() {
  const { user, loading: authLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [error, setError] = useState("");

  // Protected route: bounce to login once auth state is resolved.
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login?redirect=/account");
    }
  }, [authLoading, isAuthenticated, router]);

  // Order history for the signed-in user's email.
  useEffect(() => {
    if (!user?.email) return;
    let active = true;
    setOrdersLoading(true);
    getOrdersByEmail(user.email)
      .then((rows) => {
        if (active) setOrders(rows);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : "Failed to load orders.");
      })
      .finally(() => {
        if (active) setOrdersLoading(false);
      });
    return () => {
      active = false;
    };
  }, [user?.email]);

  if (authLoading || !isAuthenticated || !user) {
    return (
      <main className="min-h-screen bg-ivory">
        <ShopHeader />
        <div className="container-x flex items-center justify-center py-32">
          <FiLoader className="animate-spin text-navy/50" size={26} />
        </div>
        <Footer />
      </main>
    );
  }

  const doLogout = () => {
    logout();
    toast.success("Signed out.");
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-ivory">
      <ShopHeader />

      <div className="container-x py-12 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl text-navy lg:text-5xl">My account</h1>
            <p className="mt-3 text-navy/60">
              Welcome back, {user.name?.split(" ")[0] || "researcher"}.
            </p>
          </div>
          <button
            onClick={doLogout}
            className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-5 py-2.5 text-[14px] font-semibold text-navy transition-colors hover:bg-navy hover:text-ivory"
          >
            <FiLogOut size={15} /> Log out
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          {/* Profile */}
          <section className="rounded-[28px] border border-sand bg-white p-7 sm:p-8">
            <h2 className="font-serif text-2xl text-navy">Profile</h2>
            <dl className="mt-6 space-y-4 text-[15px]">
              <Detail label="Name" value={user.name} />
              <Detail label="Email" value={user.email} />
              <Detail label="Phone" value={user.phone || "—"} />
              <Detail label="Date of birth" value={user.date_of_birth} />
              <Detail label="Nationality" value={user.nationality} />
              <Detail label="Country of residence" value={user.country_of_residence} />
            </dl>
          </section>

          {/* Order history */}
          <section className="rounded-[28px] border border-sand bg-white p-7 sm:p-8">
            <h2 className="font-serif text-2xl text-navy">Order history</h2>

            {ordersLoading ? (
              <div className="flex items-center justify-center py-16">
                <FiLoader className="animate-spin text-navy/50" size={24} />
              </div>
            ) : error ? (
              <p className="mt-6 text-navy/65">{error}</p>
            ) : orders.length === 0 ? (
              <div className="mt-6 flex flex-col items-center rounded-2xl border border-sand bg-ivory py-14 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-beige text-navy/60">
                  <FiPackage size={22} />
                </span>
                <p className="mt-4 font-serif text-xl text-navy">No orders yet</p>
                <p className="mt-1 text-navy/55">Your orders will appear here.</p>
                <Link href="/#products" className="btn-lime mt-6">
                  Browse Products
                  <span className="icon-circle">
                    <FiArrowRight size={16} />
                  </span>
                </Link>
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-3">
                {orders.map((o) => {
                  const st = statusTone(o.status);
                  const pay = statusTone(o.payment_status);
                  return (
                    <motion.div
                      key={o.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={`/track?order=${encodeURIComponent(o.order_number)}`}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-sand bg-ivory px-5 py-4 transition-colors hover:border-navy/30"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-medium text-navy">
                            {o.order_number}
                          </p>
                          <p className="text-[13px] text-navy/55">
                            {formatDate(o.created_at)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${st.className}`}
                          >
                            {st.label}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${pay.className}`}
                          >
                            {pay.label}
                          </span>
                          <span className="font-serif text-lg text-navy">
                            {formatMoney(o.total)}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-navy/55">{label}</dt>
      <dd className="text-right font-medium text-navy">{value || "—"}</dd>
    </div>
  );
}
