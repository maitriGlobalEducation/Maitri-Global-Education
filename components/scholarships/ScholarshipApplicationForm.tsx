"use client";

import { useState } from "react";
import type { ScholarshipFormField } from "@/types/scholarship";
import { toast } from "react-toastify";

interface ScholarshipApplicationFormProps {
  fields: ScholarshipFormField[];
  scholarshipTitle: string;
}

type FormValues = Record<string, string | boolean>;

const countryOptions = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "New Zealand",
  "United Arab Emirates",
  "Germany",
  "France",
  "Italy",
  "Ireland",
  "Singapore",
  "Other",
];

export default function ScholarshipApplicationForm({
  fields,
  scholarshipTitle,
}: ScholarshipApplicationFormProps) {
  const [values, setValues] = useState<FormValues>({});
  const [submitted, setSubmitted] = useState(false);

  const updateValue = (key: string, value: string | boolean) => {
    setValues((previous) => ({
      ...previous,
      [key]: value,
    }));
    setSubmitted(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Prepared for CRM integration later.
    const applicationData = {
      scholarshipTitle,
      fields: values,
    };

    // toast.error(
    //   "Your form is valid. Application submission will be connected to the CRM in a later step.",
    //   {
    //     style: {
    //       width: "250px",
    //     },
    //   },
    // );
    console.log("Scholarship application:", applicationData);
    setSubmitted(true);
  };

  const inputClassName =
    "mt-1.5 block w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10";

  if (fields.length === 0) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-zinc-900">
          Apply for this scholarship
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-500">
          The application form has not been configured yet. Please check back
          later.
        </p>
      </section>
    );
  }

  return (
    <section
      id="scholarship-application"
      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-7"
    >
      <div className="mb-6 border-b border-zinc-100 pb-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
          Get started
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">
          Apply for this scholarship
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Fill in your details below to begin your application.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {fields.map((field) => (
          <div key={field.key}>
            {field.type === "checkbox" ? (
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  name={field.key}
                  required={field.required}
                  checked={Boolean(values[field.key])}
                  onChange={(event) =>
                    updateValue(field.key, event.target.checked)
                  }
                  className="mt-1 size-4 cursor-pointer rounded border-zinc-300 accent-amber-700"
                />

                <span className="text-sm leading-6 text-zinc-700">
                  {field.label}
                  {field.required && (
                    <span className="ml-1 text-red-500">*</span>
                  )}
                </span>
              </label>
            ) : (
              <>
                <label
                  htmlFor={field.key}
                  className="block text-sm font-medium text-zinc-700"
                >
                  {field.label}
                  {field.required && (
                    <span className="ml-1 text-red-500">*</span>
                  )}
                </label>

                {field.type === "select" ? (
                  <select
                    id={field.key}
                    name={field.key}
                    required={field.required}
                    value={String(values[field.key] ?? "")}
                    onChange={(event) =>
                      updateValue(field.key, event.target.value)
                    }
                    className={inputClassName}
                  >
                    <option value="">Select {field.label}</option>

                    {(field.key === "country"
                      ? countryOptions
                      : (field.options ?? [])
                    ).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.key}
                    name={field.key}
                    type={
                      field.type === "phone"
                        ? "tel"
                        : field.type === "date"
                          ? "date"
                          : field.type
                    }
                    required={field.required}
                    value={String(values[field.key] ?? "")}
                    onChange={(event) =>
                      updateValue(field.key, event.target.value)
                    }
                    placeholder={
                      field.type === "phone"
                        ? "Enter your phone number"
                        : field.type === "email"
                          ? "Enter your email address"
                          : `Enter ${field.label.toLowerCase()}`
                    }
                    className={inputClassName}
                  />
                )}
              </>
            )}
          </div>
        ))}

        {submitted && (
          <p
            role="status"
            className="rounded-lg bg-amber-100 border border-amber-500 px-4 py-3 text-sm text-amber-700"
          >
            Your form is valid. Application submission will be connected to the
            CRM very soon.
          </p>
        )}

        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-amber-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-800"
        >
          Submit Application
        </button>

        <p className="text-center text-xs leading-5 text-zinc-400">
          Fields marked with <span className="text-red-500">*</span> are
          required.
        </p>
      </form>
    </section>
  );
}
