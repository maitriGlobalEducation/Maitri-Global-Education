import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import ContactSubmission from "@/models/ContactSubmission";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      country,
      mobile,
      email,
      message,
      termsAccepted,
      marketingConsent,
      profilingConsent,
    } = body;

    const requiredTextFields = [
      { value: firstName, label: "First name" },
      { value: lastName, label: "Last name" },
      { value: country, label: "Country" },
      { value: mobile, label: "Mobile number" },
      { value: email, label: "Email address" },
      { value: message, label: "Message" },
    ];

    for (const field of requiredTextFields) {
      if (typeof field.value !== "string" || !field.value.trim()) {
        return NextResponse.json(
          {
            success: false,
            message: `${field.label} is required.`,
          },
          { status: 400 },
        );
      }
    }

    if (firstName.trim().length > 100 || lastName.trim().length > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Names must not exceed 100 characters.",
        },
        { status: 400 },
      );
    }

    if (mobile.trim().length > 30) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number is too long.",
        },
        { status: 400 },
      );
    }

    if (email.trim().length > 254) {
      return NextResponse.json(
        {
          success: false,
          message: "Email address is too long.",
        },
        { status: 400 },
      );
    }

    if (message.trim().length > 10000) {
      return NextResponse.json(
        {
          success: false,
          message: "Message must not exceed 10,000 characters.",
        },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 },
      );
    }

    if (!countryOptions.includes(country.trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid country.",
        },
        { status: 400 },
      );
    }

    if (termsAccepted !== true) {
      return NextResponse.json(
        {
          success: false,
          message: "You must accept the terms to submit this form.",
        },
        { status: 400 },
      );
    }

    if (
      typeof marketingConsent !== "boolean" ||
      typeof profilingConsent !== "boolean"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid consent values.",
        },
        { status: 400 },
      );
    }

    await connectDB();

    const submission = await ContactSubmission.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      country: country.trim(),
      mobile: mobile.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      termsAccepted,
      marketingConsent,
      profilingConsent,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been submitted successfully.",
        data: {
          id: submission._id,
          createdAt: submission.createdAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CONTACT SUBMISSION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit your message. Please try again.",
      },
      { status: 500 },
    );
  }
}
