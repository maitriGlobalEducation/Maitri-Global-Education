"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";

interface ContactSectionData {
  firstName: string;
  lastName: string;
  country: string;
  mobile: string;
  email: string;
  message: string;
  termsAccepted: boolean;
  marketingConsent: boolean;
  profilingConsent: boolean;
}

const initialFormData: ContactSectionData = {
  firstName: "",
  lastName: "",
  country: "",
  mobile: "",
  email: "",
  message: "",
  termsAccepted: false,
  marketingConsent: false,
  profilingConsent: false,
};

const countries = ["India", "United Kingdom", "United States"];

const inputClassName =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-[#f4511e] focus:ring-4 focus:ring-[#f4511e]/10 sm:text-base";

const labelClassName = "mb-2 block text-sm font-medium text-zinc-700";

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactSectionData>(initialFormData);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const updateField = <K extends keyof ContactSectionData>(
    field: K,
    value: ContactSectionData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSubmitMessage("");
    setSubmitError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.termsAccepted || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Failed to submit the contact form.");
      }

      setSubmitMessage(
        "Thank you! Your message has been submitted successfully.",
      );

      setFormData(initialFormData);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#faf9f7] py-16 sm:py-20 lg:py-28">
      {/* Subtle background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 size-96 rounded-full bg-orange-100/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 size-96 rounded-full bg-orange-50 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          {/* <span className="inline-flex items-center gap-2 rounded-full border border-[#d59425] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gold-gradient shadow-sm sm:text-sm">
            <span className="size-2 rounded-full bg-[#8A6420]" />
            Let&apos;s connect
          </span> */}

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
            Let&apos;s start a{" "}
            <span className="text-gold-gradient">conversation.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base">
            Have questions about studying abroad? Tell us a little about
            yourself, and our team will help you explore your next steps.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-[0_24px_80px_rgba(24,24,27,0.07)] lg:grid-cols-[0.82fr_1.18fr]">
          {/* Left panel */}
          <div className="relative flex min-h-105 flex-col justify-between overflow-hidden bg-[#171717] p-7 text-white sm:p-10 lg:min-h-full lg:p-12">
            <Image
              src="/Images/Contact/contact-left.avif"
              alt="Get in touch with Maitri Global Education"
              fill
              priority={false}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover opacity-40"
            />

            <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/90" />

            <div className="relative z-10">
              <div className="flex size-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="size-6"
                >
                  <path
                    d="M4 5.5h16v13H4z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m4.5 7 7.5 6 7.5-6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                We&apos;re here to help
              </p>

              <h3 className="mt-3 max-w-md text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Your global journey starts with a conversation.
              </h3>

              <p className="mt-5 max-w-md text-sm leading-7 text-zinc-200 sm:text-base">
                Whether you&apos;re choosing a course, exploring scholarships,
                or planning your future abroad, we&apos;re here to help you make
                informed decisions.
              </p>
            </div>

            <div className="relative z-10 mt-12 border-t border-white/20 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <span className="flex size-9 items-center justify-center rounded-full border-2 border-zinc-800 bg-orange-100 text-xs font-bold text-orange-700">
                    M
                  </span>
                  <span className="flex size-9 items-center justify-center rounded-full border-2 border-zinc-800 bg-white text-xs font-bold text-zinc-700">
                    G
                  </span>
                  <span className="flex size-9 items-center justify-center rounded-full border-2 border-zinc-800 bg-orange-500 text-xs font-bold text-white">
                    E
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Maitri Global Education
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-300">
                    Supporting your next step
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Contact form */}
          <div className="p-6 sm:p-9 lg:p-12">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">
                Get in touch
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Fill in the details below and send us your enquiry.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className={labelClassName}>
                    First name <span className="text-[#f4511e]">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="Your first name"
                    autoComplete="given-name"
                    required
                    value={formData.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className={labelClassName}>
                    Last name <span className="text-[#f4511e]">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Your last name"
                    autoComplete="family-name"
                    required
                    value={formData.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    className={inputClassName}
                  />
                </div>
              </div>

              {/* Country and phone */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="country" className={labelClassName}>
                    Country <span className="text-[#f4511e]">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    required
                    value={formData.country}
                    onChange={(e) => updateField("country", e.target.value)}
                    className={`${inputClassName} cursor-pointer`}
                  >
                    <option value="" disabled>
                      Select your country
                    </option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="mobile" className={labelClassName}>
                    Mobile number <span className="text-[#f4511e]">*</span>
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    name="mobile"
                    placeholder="Your phone number"
                    autoComplete="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => updateField("mobile", e.target.value)}
                    className={inputClassName}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClassName}>
                  Email address <span className="text-[#f4511e]">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={inputClassName}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className={labelClassName}>
                  How can we help? <span className="text-[#f4511e]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your plans or questions..."
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className={`${inputClassName} min-h-32 resize-y leading-6`}
                />
              </div>

              {/* Consent options */}
              <div className="space-y-4 border-t border-zinc-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                  Privacy & preferences
                </p>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-zinc-50 p-4 transition-colors hover:bg-orange-50/60">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    required
                    checked={formData.termsAccepted}
                    onChange={(e) =>
                      updateField("termsAccepted", e.target.checked)
                    }
                    className="mt-1 size-4 shrink-0 cursor-pointer accent-[#f4511e]"
                  />
                  <span className="text-xs leading-6 text-zinc-600 sm:text-sm">
                    I have read the{" "}
                    <Link
                      href="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#e94717] underline underline-offset-2 hover:text-[#c53610]"
                    >
                      Terms
                    </Link>{" "}
                    pursuant to Art. 13 of the GDPR 679/16 and agree to the
                    processing of my personal data.{" "}
                    <span className="font-semibold text-[#f4511e]">*</span>
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl p-2 transition-colors hover:bg-zinc-50">
                  <input
                    type="checkbox"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={(e) =>
                      updateField("marketingConsent", e.target.checked)
                    }
                    className="mt-1 size-4 shrink-0 cursor-pointer accent-[#f4511e]"
                  />
                  <span className="text-xs leading-6 text-zinc-500 sm:text-sm">
                    I agree to receive information about scholarships, courses,
                    talks, events, and other updates that may interest me.
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl p-2 transition-colors hover:bg-zinc-50">
                  <input
                    type="checkbox"
                    name="profilingConsent"
                    checked={formData.profilingConsent}
                    onChange={(e) =>
                      updateField("profilingConsent", e.target.checked)
                    }
                    className="mt-1 size-4 shrink-0 cursor-pointer accent-[#f4511e]"
                  />
                  <span className="text-xs leading-6 text-zinc-500 sm:text-sm">
                    I agree to the use of my personal data for profiling
                    activities.
                  </span>
                </label>
              </div>

              {/* Submission feedback */}
              {submitMessage && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-800"
                >
                  {submitMessage}
                </div>
              )}

              {submitError && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                >
                  {submitError}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-gold-gradient px-6 py-4 text-sm font-semibold shadow-lg shadow-orange-500/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#df4114] hover:shadow-xl hover:shadow-orange-500/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4511e] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-48"
              >
                {isSubmitting ? "Sending message..." : "Send your enquiry"}

                {!isSubmitting && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <path
                      d="M5 12h14m-6-6 6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              <p className="text-xs leading-5 text-zinc-400">
                Fields marked with <span className="text-[#f4511e]">*</span> are
                required.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
