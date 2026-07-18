"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiLoader } from "react-icons/fi";
import AuthLayout from "@/components/auth/AuthLayout";
import { AuthField, AuthSelect, PasswordField } from "@/components/auth/AuthFields";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/Toast";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Ireland",
  "Germany",
  "France",
  "Netherlands",
  "Spain",
  "Italy",
  "Australia",
  "Other",
];

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    dob: "",
    nationality: "",
    country: "United Kingdom",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    if (!form.firstName.trim() || !form.lastName.trim())
      return "Enter your first and last name.";
    if (!EMAIL_RE.test(form.email.trim())) return "Enter a valid email address.";
    if (form.password.length < 6)
      return "Password must be at least 6 characters.";
    if (form.password !== form.repeatPassword) return "Passwords don’t match.";
    if (!form.dob) return "Enter your date of birth.";
    if (!form.nationality.trim()) return "Enter your nationality.";
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
      const user = await register({
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email.trim(),
        password: form.password,
        date_of_birth: form.dob,
        nationality: form.nationality.trim(),
        country_of_residence: form.country,
      });
      toast.success(`Account created — welcome, ${user.name?.split(" ")[0] || ""}.`);
      router.push("/");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Registration failed.";
      setError(msg);
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join VORA and access premium research peptides."
      note="For laboratory R&D use only"
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-navy underline-offset-4 hover:underline"
          >
            Log in here
          </Link>
        </>
      }
    >
      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <AuthField
            label="First name"
            value={form.firstName}
            onChange={set("firstName")}
            placeholder="Jordan"
            autoComplete="given-name"
          />
          <AuthField
            label="Last name"
            value={form.lastName}
            onChange={set("lastName")}
            placeholder="Avery"
            autoComplete="family-name"
          />
        </div>

        <AuthField
          label="Email"
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
          autoComplete="new-password"
        />
        <PasswordField
          label="Repeat password"
          value={form.repeatPassword}
          onChange={set("repeatPassword")}
          autoComplete="new-password"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <AuthField
            label="Date of birth"
            type="date"
            value={form.dob}
            onChange={set("dob")}
          />
          <AuthField
            label="Nationality"
            value={form.nationality}
            onChange={set("nationality")}
            placeholder="British"
          />
        </div>

        <AuthSelect
          label="Country of residence"
          value={form.country}
          onChange={set("country")}
          options={COUNTRIES}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-btn px-8 py-4 font-semibold text-navy transition-all duration-500 ease-smooth hover:-translate-y-0.5 hover:bg-[#e6f9a6] disabled:opacity-70"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" size={18} /> Creating account…
            </>
          ) : (
            <>
              Create research account <FiArrowRight size={18} />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
