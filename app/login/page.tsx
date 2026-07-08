"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FiArrowRight, FiLoader } from "react-icons/fi";
import AuthLayout from "@/components/auth/AuthLayout";
import { AuthField, PasswordField } from "@/components/auth/AuthFields";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/Toast";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const { login } = useAuth();
  const toast = useToast();

  const [form, setForm] = useState({ email: "", password: "" });
  const [keep, setKeep] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    if (!EMAIL_RE.test(form.email.trim())) return "Enter a valid email address.";
    if (!form.password) return "Enter your password.";
    return "";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // duplicate-submit guard
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const user = await login(
        { email: form.email.trim(), password: form.password },
        keep
      );
      toast.success(`Welcome back, ${user.name?.split(" ")[0] || "researcher"}.`);
      router.push(redirect);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Sign in failed.";
      setError(msg);
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account"
      note="Sessions stored securely on this device"
      footer={
        <>
          New to VORA?{" "}
          <Link
            href="/register"
            className="font-semibold text-navy underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        <AuthField
          label="Email address"
          type="email"
          value={form.email}
          onChange={set("email")}
          placeholder="you@lab.com"
          autoComplete="email"
        />
        <PasswordField
          label="Password"
          value={form.password}
          onChange={set("password")}
          forgotHref="/forgot-password"
          autoComplete="current-password"
        />

        <label className="mt-1 flex cursor-pointer items-center gap-2.5 text-[14px] text-navy/70">
          <input
            type="checkbox"
            checked={keep}
            onChange={(e) => setKeep(e.target.checked)}
            className="h-4 w-4 rounded border-sand text-navy accent-navy"
          />
          Keep me signed in on this device
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-btn px-8 py-4 font-semibold text-navy transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:bg-[#e6f9a6] disabled:opacity-70"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" size={18} /> Signing in…
            </>
          ) : (
            <>
              Sign in <FiArrowRight size={18} />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
