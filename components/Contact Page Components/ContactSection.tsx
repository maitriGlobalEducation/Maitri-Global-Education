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

// Add or replace countries as needed.
const countries = ["India", "United Kingdom", "United States"];

const inputClassName = `
  h-13
  w-full
  rounded-lg
  border
  border-[#1f2937]
  bg-white
  px-3
  text-sm
  text-[#172033]
  outline-none
  transition-all
  duration-200
  placeholder:text-[#667085]
  focus:border-[#f4511e]
  focus:ring-2
  focus:ring-[#f4511e]/10
  sm:text-base
`;

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactSectionData>(initialFormData);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = <K extends keyof ContactSectionData>(
    field: K,
    value: ContactSectionData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.termsAccepted || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      //
      // const response = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
      //
      // if (!response.ok) {
      //   throw new Error("Failed to submit contact form");
      // }
      //
      // setFormData(initialFormData);

      console.log("Contact form data:", formData);
    } catch (error) {
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#fafafa] py-14 sm:py-18 lg:py-24">
      <div className="mx-auto max-w-7xl lg:max-w-[1560px] px-5 sm:px-8 lg:px-10">
        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-12
            lg:grid-cols-[0.8fr_1.4fr]
            lg:justify-between
          "
        >
          {/* LEFT CONTENT */}
          <div
            className="
              flex
              flex-col
              items-center
              text-center
              lg:items-center
            "
          >
            {/* Contact Image */}
            <div
              className="
                group
                relative
                h-45
                w-65
                overflow-hidden
                rounded-xl
                shadow-[0_8px_25px_rgba(0,0,0,0.10)]
                sm:h-50
                sm:w-75
              "
            >
              <Image
                src="/Images/Contact/contact-left.avif"
                alt="Get in touch with Maitri Global Education"
                fill
                sizes="(max-width: 640px) 260px, 300px"
                className="
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />
            </div>

            {/* Heading */}
            <h2
              className="
                mt-6
                text-2xl
                font-bold
                text-[#f4511e]
                sm:text-3xl
              "
            >
              Get In Touch
            </h2>

            <p className="mt-2 text-sm text-[#344054] sm:text-base">
              Contact us for any queries
            </p>
          </div>

          {/* RIGHT FORM */}
          <div
            className="
              rounded-2xl
              border
              border-[#f0f0f0]
              bg-white
              p-5
              shadow-[0_6px_25px_rgba(0,0,0,0.07)]
              sm:p-7
              lg:p-8
            "
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name + Last Name */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Name *"
                  aria-label="First name"
                  autoComplete="given-name"
                  required
                  value={formData.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  className={inputClassName}
                />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name *"
                  aria-label="Last name"
                  autoComplete="family-name"
                  required
                  value={formData.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  className={inputClassName}
                />
              </div>

              {/* Country + Mobile */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <select
                  name="country"
                  aria-label="Country"
                  autoComplete="country-name"
                  required
                  value={formData.country}
                  onChange={(e) => updateField("country", e.target.value)}
                  className={inputClassName}
                >
                  <option value="" disabled>
                    Country *
                  </option>

                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile *"
                  aria-label="Mobile number"
                  autoComplete="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => updateField("mobile", e.target.value)}
                  className={inputClassName}
                />
              </div>

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email *"
                aria-label="Email address"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={inputClassName}
              />

              {/* Message */}
              <textarea
                name="message"
                placeholder="Message *"
                aria-label="Message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => updateField("message", e.target.value)}
                className="
                  min-h-30
                  w-full
                  resize-y
                  rounded-lg
                  border
                  border-[#1f2937]
                  bg-white
                  p-3
                  text-sm
                  text-[#172033]
                  outline-none
                  transition-all
                  duration-200
                  placeholder:text-[#667085]
                  focus:border-[#f4511e]
                  focus:ring-2
                  focus:ring-[#f4511e]/10
                  sm:text-base
                "
              />

              {/* Consent Checkboxes */}
              <div className="space-y-3 pt-1">
                {/* Required Terms */}
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    required
                    checked={formData.termsAccepted}
                    onChange={(e) =>
                      updateField("termsAccepted", e.target.checked)
                    }
                    className="
                      mt-1
                      size-4
                      shrink-0
                      cursor-pointer
                      accent-[#f4511e]
                    "
                  />

                  <span className="text-sm leading-5 text-[#344054]">
                    I have read the{" "}
                    <Link
                      href="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        text-[#0057ff]
                        underline
                        hover:text-[#003bb3]
                      "
                    >
                      Terms
                    </Link>{" "}
                    pursuant to Art. 13 of the GDPR 679/16 and agree to the
                    processing of my personal data.*
                  </span>
                </label>

                {/* Marketing Consent */}
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={(e) =>
                      updateField("marketingConsent", e.target.checked)
                    }
                    className="
                      mt-1
                      size-4
                      shrink-0
                      cursor-pointer
                      accent-[#f4511e]
                    "
                  />

                  <span className="text-sm leading-5 text-[#344054]">
                    I am also agreeing to the use of my personal data to receive
                    information about new scholarships, updates, new courses,
                    talks and events that could interest me.
                  </span>
                </label>

                {/* Profiling Consent */}
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    name="profilingConsent"
                    checked={formData.profilingConsent}
                    onChange={(e) =>
                      updateField("profilingConsent", e.target.checked)
                    }
                    className="
                      mt-1
                      size-4
                      shrink-0
                      cursor-pointer
                      accent-[#f4511e]
                    "
                  />

                  <span className="text-sm leading-5 text-[#344054]">
                    I agree to the use of my personal data for profiling
                    activities.
                  </span>
                </label>
              </div>

              {/* Submit */}
              <div className="flex justify-center pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    inline-flex
                    min-w-30
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-md
                    border-2
                    border-black
                    bg-white
                    px-6
                    py-2.5
                    text-sm
                    font-semibold
                    text-black
                    transition-all
                    duration-300
                    hover:bg-black
                    hover:text-white
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
