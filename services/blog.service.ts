import "server-only";

import { connectDB } from "@/lib/mongodb";
import Blog from "@/src/models/Blog";
import { logTiming } from "@/lib/timing";
import { cache } from "react";

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

export interface PublicBlogCard {
  _id: string;
  title: string;
  slug: string;
  category: string;
  cardImage: {
    url: string;
    publicId: string;
  } | null;
  metaDescription: string;
  featured: boolean;
  publishedAt: string | null;
}

export interface RecentPublishedBlog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  cardImage: {
    url: string;
    publicId: string;
  } | null;
  publishedAt: string | null;
}

export async function getRecentPublishedBlogs(
  currentSlug: string,
  limit = 5,
): Promise<RecentPublishedBlog[]> {
  const connectionStart = Date.now();
  await connectDB();
  logTiming("Recent blogs DB connection", connectionStart);

  const queryStart = Date.now();

  const blogs = await Blog.find({
    status: "published",
    slug: { $ne: currentSlug.toLowerCase() },
  })
    .select("title slug category cardImage publishedAt")
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(limit)
    .lean();

  logTiming("Recent blogs MongoDB query", queryStart);

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
    publishedAt: blog.publishedAt
      ? new Date(blog.publishedAt).toISOString()
      : null,
  }));
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
  const totalStart = Date.now();

  const connectionStart = Date.now();
  await connectDB();
  logTiming("Published blogs DB connection", connectionStart);

  const queryStart = Date.now();

  const blogs = await Blog.find({ status: "published" })
    .sort({ publishedAt: -1, createdAt: -1 })
    .lean();

  logTiming("Published blogs MongoDB query", queryStart);

  const result = blogs.map((blog) => ({
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

  logTiming("getPublishedBlogs total", totalStart);

  return result;
}

const BLOG_CARD_FIELDS =
  "title slug category cardImage metaDescription featured publishedAt createdAt";

function toPublicBlogCard(blog: {
  _id: unknown;
  title: string;
  slug: string;
  category: string;
  cardImage?: { url: string; publicId: string } | null;
  metaDescription?: string;
  featured?: boolean;
  publishedAt?: Date | string | null;
}): PublicBlogCard {
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
    metaDescription: blog.metaDescription ?? "",
    featured: blog.featured ?? false,
    publishedAt: blog.publishedAt
      ? new Date(blog.publishedAt).toISOString()
      : null,
  };
}

export async function getFeaturedBlogCard(): Promise<PublicBlogCard | null> {
  await connectDB();

  const blog = await Blog.findOne({
    status: "published",
    featured: true,
  })
    .select(BLOG_CARD_FIELDS)
    .sort({ publishedAt: -1, createdAt: -1 })
    .lean();

  return blog ? toPublicBlogCard(blog) : null;
}

export async function getPublishedBlogCards(
  limit: number,
  excludeSlugs: string[] = [],
): Promise<PublicBlogCard[]> {
  await connectDB();

  const blogs = await Blog.find({
    status: "published",
    ...(excludeSlugs.length > 0 ? { slug: { $nin: excludeSlugs } } : {}),
  })
    .select(BLOG_CARD_FIELDS)
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(limit)
    .lean();

  return blogs.map((blog) => toPublicBlogCard(blog));
}

export async function getPaginatedBlogCards({
  page,
  pageSize,
  excludeSlugs = [],
}: {
  page: number;
  pageSize: number;
  excludeSlugs?: string[];
}): Promise<{
  blogs: PublicBlogCard[];
  total: number;
}> {
  await connectDB();

  const filter = {
    status: "published",
    ...(excludeSlugs.length > 0 ? { slug: { $nin: excludeSlugs } } : {}),
  };

  const [blogs, total] = await Promise.all([
    Blog.find(filter)
      .select(BLOG_CARD_FIELDS)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean(),
    Blog.countDocuments(filter),
  ]);

  return {
    blogs: blogs.map((blog) => toPublicBlogCard(blog)),
    total,
  };
}

export async function getPublicBlogBySlugUncached(
  slug: string,
): Promise<PublicBlog | null> {
  const totalStart = Date.now();

  const connectionStart = Date.now();
  await connectDB();
  logTiming("Blog DB connection", connectionStart);

  const queryStart = Date.now();

  const blog = await Blog.findOne({
    slug: slug.toLowerCase(),
    status: "published",
  }).lean();

  logTiming("Blog MongoDB query", queryStart);
  logTiming("getPublicBlogBySlug total", totalStart);

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

export const getPublicBlogBySlug = cache(getPublicBlogBySlugUncached);
