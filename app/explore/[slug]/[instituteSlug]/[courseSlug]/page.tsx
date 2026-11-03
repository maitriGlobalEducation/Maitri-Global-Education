import { notFound } from "next/navigation";

import { connectDB } from "@/lib/mongodb";
import ExploreArea from "@/models/ExploreArea";
import ExploreInstitute from "@/models/ExploreInstitute";
import ExploreCourse from "@/models/ExploreCourse";

import "@/models/ExploreCourseCategory";
import "@/models/ExploreCampus";

type Props = {
  params: Promise<{
    slug: string;
    instituteSlug: string;
    courseSlug: string;
  }>;
};

type DescriptionNode = {
  type?: string;
  text?: string;
  attrs?: Record<string, unknown>;
  content?: DescriptionNode[];
  marks?: { type: string }[];
};

function deslugify(value?: string) {
  if (!value) return "Not specified";

  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface CampusType {
  _id: string;
  name: string;
  slug: string;
  city?: string;
  country?: string;
}

interface CampusOfferingType {
  _id: string;
  campus: {
    campusId: CampusType;
    slug: string;
  };
  intakes: string[];
  language: string;
}

function DescriptionContent({ node }: { node: DescriptionNode }) {
  if (node.type === "text") {
    let content: React.ReactNode = node.text ?? "";

    for (const mark of node.marks ?? []) {
      if (mark.type === "bold") {
        content = <strong>{content}</strong>;
      } else if (mark.type === "italic") {
        content = <em>{content}</em>;
      } else if (mark.type === "underline") {
        content = <u>{content}</u>;
      }
    }

    return <>{content}</>;
  }

  const children = node.content?.map((child, index) => (
    <DescriptionContent key={index} node={child} />
  ));

  switch (node.type) {
    case "doc":
      return <>{children}</>;

    case "paragraph":
      return <p className="mb-4 leading-7 text-zinc-600">{children}</p>;

    case "heading": {
      const level = Number(node.attrs?.level ?? 2);

      if (level === 1) {
        return (
          <h2 className="mb-4 mt-6 text-2xl font-semibold text-zinc-900">
            {children}
          </h2>
        );
      }

      if (level === 3) {
        return (
          <h3 className="mb-3 mt-5 text-lg font-semibold text-zinc-900">
            {children}
          </h3>
        );
      }

      return (
        <h2 className="mb-4 mt-6 text-xl font-semibold text-zinc-900">
          {children}
        </h2>
      );
    }

    case "bulletList":
      return (
        <ul className="mb-4 list-disc space-y-2 pl-6 text-zinc-600">
          {children}
        </ul>
      );

    case "orderedList":
      return (
        <ol className="mb-4 list-decimal space-y-2 pl-6 text-zinc-600">
          {children}
        </ol>
      );

    case "listItem":
      return <li>{children}</li>;

    case "blockquote":
      return (
        <blockquote className="mb-4 border-l-4 border-[#D4AF37] pl-4 italic text-zinc-600">
          {children}
        </blockquote>
      );

    case "hardBreak":
      return <br />;

    default:
      return <>{children}</>;
  }
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="border-b border-zinc-100 py-4 last:border-0">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {label}
      </p>

      <p className="text-sm font-medium text-zinc-800">{value}</p>
    </div>
  );
}

export default async function ExploreCoursePage({ params }: Props) {
  const { slug, instituteSlug, courseSlug } = await params;

  await connectDB();

  const area = await ExploreArea.findOne({ slug }).select("name slug").lean();

  if (!area) notFound();

  const institute = await ExploreInstitute.findOne({
    slug: instituteSlug,
    status: "published",
    "areas.areaId": area._id,
  })
    .select("name slug")
    .lean();

  if (!institute) notFound();

  const course = await ExploreCourse.findOne({
    slug: courseSlug,
    status: "published",
    "area.slug": slug,
    "institute.slug": instituteSlug,
  })
    .populate("courseCategory.categoryId", "name slug")
    .populate("campusOfferings.campus.campusId", "name slug city country")
    .lean();

  if (!course) notFound();

  const category = course.courseCategory?.categoryId as {
    name: string;
    slug: string;
  } | null;

  const campusOfferings = course.campusOfferings ?? [];

  const description = course.description as DescriptionNode | string | null;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-zinc-950 px-5 py-32 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#D4AF37]">
            {area.name} · {institute.name}
          </p>

          <h1 className="text-3xl font-semibold sm:text-5xl">{course.name}</h1>

          {category && <p className="mt-4 text-white/70">{category.name}</p>}
        </div>
      </section>

      {/* Course information */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-14">
          {/* Left: Course information */}
          <aside className="h-fit rounded-xl border border-zinc-200 p-6">
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">
              Course Information
            </h2>

            <DetailItem
              label="Course Category"
              value={category?.name ?? deslugify(course.courseCategory?.slug)}
            />

            <DetailItem label="Area" value={area.name} />

            <DetailItem label="University" value={institute.name} />

            <DetailItem
              label="Duration"
              value={`${course.duration.value} ${deslugify(course.duration.unit)}`}
            />

            {course.durationFeatures && (
              <DetailItem
                label="Duration Details"
                value={course.durationFeatures}
              />
            )}

            <DetailItem label="Course Slug" value={deslugify(course.slug)} />

            {campusOfferings.length > 0 && (
              <div className="border-b border-zinc-100 py-4 last:border-0">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Campuses
                </p>

                <div className="space-y-4">
                  {campusOfferings.map((offering: CampusOfferingType) => {
                    const campus = offering.campus?.campusId as {
                      name: string;
                      city?: string;
                      country?: string;
                    } | null;

                    return (
                      <div key={String(offering._id)} className="space-y-1">
                        <p className="text-sm font-medium text-zinc-800">
                          {campus?.name ?? deslugify(offering.campus?.slug)}
                        </p>

                        {(campus?.city || campus?.country) && (
                          <p className="text-xs text-zinc-500">
                            {[campus.city, campus.country]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        )}

                        <p className="text-xs text-zinc-500">
                          Language: {offering.language}
                        </p>

                        <p className="text-xs text-zinc-500">
                          Intakes: {offering.intakes.map(deslugify).join(", ")}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>

          {/* Right: Description */}
          <div>
            <h2 className="mb-6 text-2xl font-semibold text-zinc-900">
              About the Course
            </h2>

            <div className="prose max-w-none">
              {typeof description === "string" ? (
                <p className="whitespace-pre-line text-zinc-600">
                  {description}
                </p>
              ) : description?.content ? (
                <DescriptionContent node={description} />
              ) : (
                <p className="text-zinc-500">
                  Course description is not available yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
