"use client";

import { useState, type FormEvent } from "react";

interface EventRegistrationField {
  key: string;
  label: string;
  type: "text" | "email" | "phone" | "select" | "date" | "checkbox";
  required: boolean;
  options?: string[];
}

interface EventRegistrationFormProps {
  fields: EventRegistrationField[];
  eventId: string;
  eventTitle: string;
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

export default function EventRegistrationForm({
  fields,
  eventId,
  eventTitle,
}: EventRegistrationFormProps) {
  const [values, setValues] = useState<FormValues>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const updateValue = (key: string, value: string | boolean) => {
    setValues((previous) => ({
      ...previous,
      [key]: value,
    }));

    setSubmitted(false);
    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitted(false);
    setError("");

    try {
      const response = await fetch("/api/events/event-registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          fields: values,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ?? "Unable to submit your registration.",
        );
      }

      setSubmitted(true);
      setValues({});
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    "mt-1.5 block w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10";

  if (fields.length === 0) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-zinc-900">
          Register for this event
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          Registration is not available yet. Please check back later.
        </p>
      </section>
    );
  }

  return (
    <section
      id="event-registration"
      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-7"
    >
      <div className="mb-6 border-b border-zinc-100 pb-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
          Save your spot
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">
          Register for this event
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Fill in your details below to register for {eventTitle}.
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
                  htmlFor={`event-${field.key}`}
                  className="block text-sm font-medium text-zinc-700"
                >
                  {field.label}
                  {field.required && (
                    <span className="ml-1 text-red-500">*</span>
                  )}
                </label>

                {field.type === "select" ? (
                  <select
                    id={`event-${field.key}`}
                    name={field.key}
                    required={field.required}
                    value={String(values[field.key] ?? "")}
                    onChange={(event) =>
                      updateValue(field.key, event.target.value)
                    }
                    className={inputClassName}
                  >
                    <option value="">Select {field.label}</option>

                    {(field.key.toLowerCase() === "country"
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
                    id={`event-${field.key}`}
                    name={field.key}
                    type={
                      field.type === "phone"
                        ? "tel"
                        : field.type === "email"
                          ? "email"
                          : field.type === "date"
                            ? "date"
                            : "text"
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

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {submitted && (
          <p
            role="status"
            className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          >
            Your registration for {eventTitle} has been submitted successfully!
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-amber-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:cursor-wait disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Register for Event"}
        </button>

        <p className="text-center text-xs leading-5 text-zinc-400">
          Fields marked with <span className="text-red-500">*</span> are
          required.
        </p>
      </form>
    </section>
  );
}
