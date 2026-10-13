import "server-only";

import { connectDB } from "@/lib/mongodb";
import Blog from "@/src/models/Blog";

export interface PublicBlog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  cardImage: {
    url: string;
    publicId: string;
  } | null;
  contentImage: {
    url: string;
    publicId: string;
  } | null;
  content: Record<string, unknown>;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  focusKeyword: string;
  ctaText: string;
  ctaLink: string;
  featured: boolean;
  publishedAt: string | null;
}

function extractText(node: unknown): string {
  if (!node || typeof node !== "object") return "";

  const item = node as {
    type?: string;
    text?: string;
    content?: unknown[];
  };

  if (item.type === "text") return item.text ?? "";

  return (item.content ?? []).map(extractText).filter(Boolean).join(" ");
}

export function getBlogExcerpt(
  content: Record<string, unknown>,
  maxLength = 160,
): string {
  const text = extractText(content).replace(/\s+/g, " ").trim();

  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).trimEnd()}...`;
}

export async function getPublishedBlogs(): Promise<PublicBlog[]> {
  await connectDB();

  const blogs = await Blog.find({ status: "published" })
    .sort({ publishedAt: -1, createdAt: -1 })
    .lean();

  return blogs.map((blog) => ({
    _id: String(blog._id),
    title: blog.title,
    slug: blog.slug,
    category: blog.category,
    cardImage: blog.cardImage
      ? {
          url: blog.cardImage.url,
          publicId: blog.cardImage.publicId,
        }
      : null,
    contentImage: blog.contentImage
      ? {
          url: blog.contentImage.url,
          publicId: blog.contentImage.publicId,
        }
      : null,
    content: blog.content as Record<string, unknown>,
    metaTitle: blog.metaTitle ?? "",
    metaDescription: blog.metaDescription ?? "",
    metaKeywords: blog.metaKeywords ?? [],
    focusKeyword: blog.focusKeyword ?? "",
    ctaText: blog.ctaText ?? "",
    ctaLink: blog.ctaLink ?? "",
    featured: blog.featured ?? false,
    publishedAt: blog.publishedAt
      ? new Date(blog.publishedAt).toISOString()
      : null,
  }));
}

export async function getPublicBlogBySlug(
  slug: string,
): Promise<PublicBlog | null> {
  await connectDB();

  const blog = await Blog.findOne({
    slug: slug.toLowerCase(),
    status: "published",
  }).lean();

  if (!blog) return null;

  return {
    _id: String(blog._id),
    title: blog.title,
    slug: blog.slug,
    category: blog.category,
    cardImage: blog.cardImage
      ? {
          url: blog.cardImage.url,
          publicId: blog.cardImage.publicId,
        }
      : null,
    contentImage: blog.contentImage
      ? {
          url: blog.contentImage.url,
          publicId: blog.contentImage.publicId,
        }
      : null,
    content: blog.content as Record<string, unknown>,
    metaTitle: blog.metaTitle ?? "",
    metaDescription: blog.metaDescription ?? "",
    metaKeywords: blog.metaKeywords ?? [],
    focusKeyword: blog.focusKeyword ?? "",
    ctaText: blog.ctaText ?? "",
    ctaLink: blog.ctaLink ?? "",
    featured: blog.featured ?? false,
    publishedAt: blog.publishedAt
      ? new Date(blog.publishedAt).toISOString()
      : null,
  };
}
