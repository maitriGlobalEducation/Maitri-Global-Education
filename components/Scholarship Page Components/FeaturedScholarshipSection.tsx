"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Scholarship } from "@/types/scholarship";

interface FeaturedScholarshipSectionProps {
  scholarship: Scholarship;
}

export default function FeaturedScholarshipSection({
  scholarship,
}: FeaturedScholarshipSectionProps) {
  const [formValues, setFormValues] = useState<
    Record<string, string | boolean>
  >({});

  const shouldReduceMotion = useReducedMotion();

  const contentVariants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : -45,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 1.1,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: shouldReduceMotion ? 0 : 0.16,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const formVariants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : 45,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 1.2,
        delay: shouldReduceMotion ? 0 : 0.25,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const fields = scholarship.applicationForm?.fields ?? [];
  const image =
    scholarship.wallpaper?.url ??
    scholarship.cardImage?.url ??
    scholarship.logo?.url;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Connect this to your scholarship application API when ready.
  };

  return (
    <section className="grid min-h-145 bg-[#344563] lg:grid-cols-[1.8fr_0.9fr]">
      <div className="relative flex min-h-115 items-end overflow-hidden bg-[#344563] lg:min-h-145">
        {image && (
          <img
            src={image}
            alt={scholarship.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-linear-to-r from-[#1d3045]/90 via-[#243a50]/65 to-[#243a50]/15" />

        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-2xl px-7 pb-12 pt-36 text-white sm:px-12 sm:pb-16 sm:pt-40 lg:px-16 lg:pb-20 lg:pt-44"
        >
          <motion.span
            variants={itemVariants}
            className="mb-5 inline-flex rounded-full border border-white/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]"
          >
            Featured scholarship
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="max-w-xl font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-6xl"
          >
            {scholarship.title}
          </motion.h1>

          {scholarship.amount && (
            <motion.p
              variants={itemVariants}
              className="mt-5 text-lg font-semibold tracking-wide text-[#D4AF37]"
            >
              {scholarship.amount}
            </motion.p>
          )}

          {scholarship.description && (
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-md text-sm leading-7 text-white/85 sm:text-base"
            >
              {scholarship.description}
            </motion.p>
          )}

          {scholarship.deadline && (
            <motion.p
              variants={itemVariants}
              className="mt-5 text-sm text-white/80"
            >
              Application deadline:{" "}
              {new Date(scholarship.deadline).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Form */}
      <div className="bg-[#181a1d] px-6 pb-10 pt-28 text-white sm:px-10 sm:pb-12 sm:pt-32 lg:px-8 lg:pb-16 lg:pt-32 xl:px-12">
        <motion.div variants={formVariants} initial="hidden" animate="visible">
          <h2 className="mb-2 text-lg font-semibold tracking-wide">
            Apply for this scholarship
          </h2>

          <p className="mb-7 text-sm leading-6 text-white/70">
            Fill in your details to get started.
          </p>

          {fields.length > 0 ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field) => {
                const commonClassName =
                  "w-full rounded-sm border border-white/55 bg-white/5 px-3 py-3 text-sm text-white outline-none transition placeholder:text-white/55 focus:border-[#d4a94d] focus:ring-1 focus:ring-[#d4a94d]/60";

                if (field.type === "checkbox") {
                  return (
                    <label
                      key={field.key}
                      className="flex cursor-pointer items-start gap-3 text-sm text-white/90"
                    >
                      <input
                        type="checkbox"
                        name={field.key}
                        required={field.required}
                        checked={Boolean(formValues[field.key])}
                        onChange={(event) =>
                          setFormValues((current) => ({
                            ...current,
                            [field.key]: event.target.checked,
                          }))
                        }
                        className="mt-1 size-4 shrink-0 accent-[#c6f5df]"
                      />
                      <span>{field.label}</span>
                    </label>
                  );
                }

                if (field.type === "select") {
                  return (
                    <div key={field.key}>
                      <label
                        htmlFor={field.key}
                        className="mb-2 block text-xs font-medium text-white/80"
                      >
                        {field.label}
                        {field.required && " *"}
                      </label>

                      <select
                        id={field.key}
                        name={field.key}
                        required={field.required}
                        value={String(formValues[field.key] ?? "")}
                        onChange={(event) =>
                          setFormValues((current) => ({
                            ...current,
                            [field.key]: event.target.value,
                          }))
                        }
                        className={`${commonClassName} [&>option]:bg-[#344563]`}
                      >
                        <option value="">
                          Select {field.label.toLowerCase()}
                        </option>
                        {(field.options ?? []).map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }

                return (
                  <div key={field.key}>
                    <label
                      htmlFor={field.key}
                      className="mb-2 block text-xs font-medium text-white/80"
                    >
                      {field.label}
                      {field.required && " *"}
                    </label>

                    <input
                      id={field.key}
                      name={field.key}
                      type={field.type === "phone" ? "tel" : field.type}
                      required={field.required}
                      value={String(formValues[field.key] ?? "")}
                      onChange={(event) =>
                        setFormValues((current) => ({
                          ...current,
                          [field.key]: event.target.value,
                        }))
                      }
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      className={commonClassName}
                    />
                  </div>
                );
              })}

              <button
                type="submit"
                className="mt-4 w-full cursor-pointer rounded-full bg-linear-to-r from-[#8A6420] via-[#FFF0A3] to-[#A77B22] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#344563] transition hover:bg-white"
              >
                Submit application
              </button>

              <p className="text-xs leading-5 text-white/55">
                Fields marked with * are required.
              </p>
            </form>
          ) : (
            <div className="rounded-lg border border-white/20 p-5">
              <p className="text-sm leading-6 text-white/80">
                Application details for this scholarship haven't been configured
                yet. Please check back soon.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
