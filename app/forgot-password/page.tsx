"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiLoader, FiMail } from "react-icons/fi";
import AuthLayout from "@/components/auth/AuthLayout";
import { AuthField } from "@/components/auth/AuthFields";
import { forgotPassword } from "@/services/auth.service";
import { useToast } from "@/components/ui/Toast";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const message = await forgotPassword(email.trim());
      setSent(message);
      toast.success("Reset link sent if the account exists.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we’ll send you a reset link."
      footer={
        <>
          Remembered it?{" "}
          <Link
            href="/login"
            className="font-semibold text-navy underline-offset-4 hover:underline"
          >
            Back to sign in
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="flex flex-col items-center text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-lime text-navy">
            <FiMail size={26} />
          </span>
          <p className="mt-5 text-[15px] text-navy/70">{sent}</p>
          <Link href="/login" className="btn-lime mt-7 w-full justify-center">
            Back to sign in
            <span className="icon-circle">
              <FiArrowRight size={16} />
            </span>
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="flex flex-col gap-4">
          <AuthField
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@lab.com"
            autoComplete="email"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-btn px-8 py-4 font-semibold text-navy transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:bg-[#e6f9a6] disabled:opacity-70"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" size={18} /> Sending…
              </>
            ) : (
              <>
                Send reset link <FiArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
