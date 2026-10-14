import { connectDB } from "@/lib/mongodb";
import ScholarshipModel from "@/models/Scholarship";
import type { Scholarship } from "@/types/scholarship";

export async function getPublishedScholarships(): Promise<Scholarship[]> {
  await connectDB();

  const scholarships = await ScholarshipModel.find({
    status: "published",
  })
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(scholarships)) as Scholarship[];
}

export async function getPublishedScholarshipBySlug(
  slug: string,
): Promise<Scholarship | null> {
  await connectDB();

  const scholarship = await ScholarshipModel.findOne({
    slug,
    status: "published",
  }).lean();

  if (!scholarship) return null;

  return JSON.parse(JSON.stringify(scholarship)) as Scholarship;
}
