import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import EventRegistration from "@/models/EventRegistration";

type SubmittedValue = string | boolean;

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const { eventId, fields } = body;

    if (
      typeof eventId !== "string" ||
      !mongoose.Types.ObjectId.isValid(eventId)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid event ID is required.",
        },
        { status: 400 },
      );
    }

    if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide valid registration details.",
        },
        { status: 400 },
      );
    }

    const event = await Event.findOne({
      _id: eventId,
      status: "published",
    }).select("title registrationForm");

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "This event is unavailable for registration.",
        },
        { status: 404 },
      );
    }

    const configuredFields = event.registrationForm?.fields ?? [];

    if (configuredFields.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Registration is not available for this event.",
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

      if (
        field.type === "select" &&
        normalizedValue &&
        !(field.options ?? []).includes(normalizedValue) &&
        field.key.toLowerCase() !== "country"
      ) {
        return NextResponse.json(
          {
            success: false,
            message: `Please select a valid option for ${field.label}.`,
          },
          { status: 400 },
        );
      }

      normalizedFields[field.key] = normalizedValue;
    }

    const registration = await EventRegistration.create({
      eventId: event._id,
      eventTitle: event.title,
      fields: normalizedFields,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your event registration was submitted successfully.",
        data: {
          id: registration._id,
          eventId: registration.eventId,
          eventTitle: registration.eventTitle,
          createdAt: registration.createdAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("EVENT REGISTRATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit your registration. Please try again.",
      },
      { status: 500 },
    );
  }
}
