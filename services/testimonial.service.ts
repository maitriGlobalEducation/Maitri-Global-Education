import "server-only";

import { unstable_cache } from "next/cache";

import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export interface PublicTestimonial {
  id: string;
  name: string;
  course: string;
  university: string;
  image: {
    url: string;
  } | null;
  testimonial: string;
}

export const getPublicTestimonials = unstable_cache(
  async (): Promise<PublicTestimonial[]> => {
    await connectDB();

    const testimonials = await Testimonial.find({})
      .select("name course university image testimonial createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return testimonials.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      course: item.course,
      university: item.university,
      image: item.image
        ? {
            url: item.image.url,
          }
        : null,
      testimonial: item.testimonial,
    }));
  },
  ["public-testimonials"],
  {
    revalidate: 3600,
    tags: ["public-testimonials"],
  },
);
