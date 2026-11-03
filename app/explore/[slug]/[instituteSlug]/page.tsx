import { notFound } from "next/navigation";

import { connectDB } from "@/lib/mongodb";
import ExploreArea from "@/models/ExploreArea";
import ExploreInstitute from "@/models/ExploreInstitute";
import "@/models/ExploreCourseCategory";
import ExploreCourse from "@/models/ExploreCourse";
import Link from "next/link";

type Props = {
  params: Promise<{
    slug: string;
    instituteSlug: string;
  }>;
};

export default async function ExploreInstitutePage({ params }: Props) {
  const { slug, instituteSlug } = await params;

  await connectDB();

  // Find the area
  const area = await ExploreArea.findOne({ slug }).select("name slug").lean();

  if (!area) {
    notFound();
  }

  // Find the institute associated with this area
  const institute = await ExploreInstitute.findOne({
    slug: instituteSlug,
    status: "published",
    "areas.areaId": area._id,
  })
    .select("name slug")
    .lean();

  if (!institute) {
    notFound();
  }

  // Fetch published courses for this specific area and institute
  const courses = await ExploreCourse.find({
    status: "published",
    "area.slug": slug,
    "institute.slug": instituteSlug,
  })
    .populate("courseCategory.categoryId", "name slug")
    .select("name slug courseCategory")
    .sort({ sortOrder: 1, name: 1 })
    .lean();

  // Group courses by category
  const groupedCourses = new Map<
    string,
    {
      categoryName: string;
      courses: { name: string; slug: string }[];
    }
  >();

  for (const course of courses) {
    const category = course.courseCategory?.categoryId as {
      _id: unknown;
      name: string;
      slug: string;
    } | null;

    if (!category) continue;

    const categoryId = String(category._id);

    if (!groupedCourses.has(categoryId)) {
      groupedCourses.set(categoryId, {
        categoryName: category.name,
        courses: [],
      });
    }

    groupedCourses.get(categoryId)!.courses.push({
      name: course.name,
      slug: course.slug,
    });
  }

  const categories = Array.from(groupedCourses.values());

  return (
    <main className="min-h-screen bg-white">
      {/* Page heading */}
      <section className="bg-zinc-950 px-5 py-30 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#D4AF37]">
            Explore Universities
          </p>

          <p className="mb-3 text-sm text-white/60">{area.name}</p>

          <h1 className="text-3xl font-semibold sm:text-5xl">
            {institute.name}
          </h1>

          <p className="mt-4 max-w-2xl text-white/70">
            Explore <span>{area.name}</span> courses offered by{" "}
            <span>{institute.name}</span>.
          </p>
        </div>
      </section>

      {/* Course categories */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-zinc-900">
            Available Courses
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            {courses.length} courses found
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 p-10 text-center">
            <p className="text-zinc-500">
              No courses available for this university yet.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {categories.map((category) => (
              <section key={category.categoryName}>
                <h2 className="mb-5 border-b border-zinc-200 pb-3 text-2xl font-semibold text-zinc-900">
                  {category.categoryName}
                </h2>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.courses.map((course) => (
                    <Link
                      key={course.slug}
                      href={`/explore/${slug}/${instituteSlug}/${course.slug}`}
                      className="block rounded-xl border border-zinc-200 p-5 transition-all duration-300 ease-in-out hover:border-[#e2b727] hover:shadow-lg hover:-translate-y-1"
                    >
                      <h3 className="font-medium text-zinc-900">
                        {course.name}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
