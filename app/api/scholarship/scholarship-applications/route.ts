import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Scholarship from "@/models/Scholarship";
import ScholarshipApplication from "@/models/ScholarshipApplication";

type SubmittedValue = string | boolean;

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
    await connectDB();

    const body = await request.json();
    const { scholarshipId, fields } = body;

    if (
      typeof scholarshipId !== "string" ||
      !mongoose.Types.ObjectId.isValid(scholarshipId)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid scholarship ID is required.",
        },
        { status: 400 },
      );
    }

    if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide valid application details.",
        },
        { status: 400 },
      );
    }

    const scholarship = await Scholarship.findOne({
      _id: scholarshipId,
      status: "published",
    }).select("title applicationForm");

    if (!scholarship) {
      return NextResponse.json(
        {
          success: false,
          message: "This scholarship is unavailable for applications.",
        },
        { status: 404 },
      );
    }

    const configuredFields = scholarship.applicationForm?.fields ?? [];

    if (configuredFields.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Applications are not available for this scholarship.",
        },
        { status: 400 },
      );
    }

    const normalizedFields: Record<string, SubmittedValue> = {};

    for (const field of configuredFields) {
      const value = fields[field.key];

      if (field.type === "checkbox") {
        if (value !== undefined && typeof value !== "boolean") {
          return NextResponse.json(
            {
              success: false,
              message: `Invalid value for ${field.label}.`,
            },
            { status: 400 },
          );
        }

        const checked = value === true;

        if (field.required && !checked) {
          return NextResponse.json(
            {
              success: false,
              message: `${field.label} is required.`,
            },
            { status: 400 },
          );
        }

        normalizedFields[field.key] = checked;
        continue;
      }

      if (value !== undefined && typeof value !== "string") {
        return NextResponse.json(
          {
            success: false,
            message: `Invalid value for ${field.label}.`,
          },
          { status: 400 },
        );
      }

      const normalizedValue = typeof value === "string" ? value.trim() : "";

      if (field.required && !normalizedValue) {
        return NextResponse.json(
          {
            success: false,
            message: `${field.label} is required.`,
          },
          { status: 400 },
        );
      }

      if (
        field.type === "email" &&
        normalizedValue &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedValue)
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Please provide a valid email address.",
          },
          { status: 400 },
        );
      }

      if (field.type === "select" && normalizedValue) {
        const isCountry = field.key.toLowerCase() === "country";

        const allowedOptions = isCountry
          ? countryOptions
          : (field.options ?? []);

        if (!allowedOptions.includes(normalizedValue)) {
          return NextResponse.json(
            {
              success: false,
              message: `Please select a valid option for ${field.label}.`,
            },
            { status: 400 },
          );
        }
      }

      normalizedFields[field.key] = normalizedValue;
    }

    const application = await ScholarshipApplication.create({
      scholarshipId: scholarship._id,
      scholarshipTitle: scholarship.title,
      fields: normalizedFields,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your scholarship application was submitted successfully.",
        data: {
          id: application._id,
          scholarshipId: application.scholarshipId,
          scholarshipTitle: application.scholarshipTitle,
          createdAt: application.createdAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("SCHOLARSHIP APPLICATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit your application. Please try again.",
      },
      { status: 500 },
    );
  }
}
