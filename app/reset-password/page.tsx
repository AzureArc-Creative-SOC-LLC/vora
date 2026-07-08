"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FiArrowRight, FiLoader } from "react-icons/fi";
import AuthLayout from "@/components/auth/AuthLayout";
import { PasswordField } from "@/components/auth/AuthFields";
import { resetPassword } from "@/services/auth.service";
import { useToast } from "@/components/ui/Toast";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") || "";
  const toast = useToast();

  const [form, setForm] = useState({ password: "", repeat: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!token) {
      setError("This reset link is invalid or has expired.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.repeat) {
      setError("Passwords don’t match.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await resetPassword(token, form.password);
      toast.success("Password reset — please sign in.");
      router.push("/login");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not reset password.";
      setError(msg);
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Choose a new password for your account."
      footer={
        <>
          Changed your mind?{" "}
          <Link
            href="/login"
            className="font-semibold text-navy underline-offset-4 hover:underline"
          >
            Back to sign in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        {!token && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            Missing reset token. Open the link from your reset email.
          </p>
        )}
        <PasswordField
          label="New password"
          value={form.password}
          onChange={set("password")}
          autoComplete="new-password"
        />
        <PasswordField
          label="Repeat new password"
          value={form.repeat}
          onChange={set("repeat")}
          autoComplete="new-password"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-btn px-8 py-4 font-semibold text-navy transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:bg-[#e6f9a6] disabled:opacity-70"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" size={18} /> Saving…
            </>
          ) : (
            <>
              Reset password <FiArrowRight size={18} />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
