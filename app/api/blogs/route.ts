import { NextResponse } from "next/server";
import {
  getFeaturedBlogCard,
  getPublishedBlogCards,
  getPaginatedBlogCards,
} from "@/services/blog.service";

const PAGE_SIZE = 6;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedPage = Number(searchParams.get("page") ?? "1");

    if (!Number.isSafeInteger(requestedPage) || requestedPage < 1) {
      return NextResponse.json(
        { message: "Invalid page number." },
        { status: 400 },
      );
    }

    const featuredBlog = await getFeaturedBlogCard();

    const secondaryBlogs = featuredBlog
      ? await getPublishedBlogCards(3, [featuredBlog.slug])
      : [];

    const excludeSlugs = [
      ...(featuredBlog ? [featuredBlog.slug] : []),
      ...secondaryBlogs.map((blog) => blog.slug),
    ];

    const result = await getPaginatedBlogCards({
      page: requestedPage,
      pageSize: PAGE_SIZE,
      excludeSlugs,
    });

    const totalPages = Math.ceil(result.total / PAGE_SIZE);
    const currentPage = Math.min(requestedPage, Math.max(totalPages, 1));

    const finalResult =
      currentPage === requestedPage
        ? result
        : await getPaginatedBlogCards({
            page: currentPage,
            pageSize: PAGE_SIZE,
            excludeSlugs,
          });

    return NextResponse.json({
      blogs: finalResult.blogs.map((blog) => ({
        ...blog,
        _id: String(blog._id),
      })),
      currentPage,
      totalPages,
      total: finalResult.total,
    });
  } catch (error) {
    console.error("Failed to fetch paginated blogs:", error);

    return NextResponse.json(
      { message: "Unable to load articles." },
      { status: 500 },
    );
  }
}
