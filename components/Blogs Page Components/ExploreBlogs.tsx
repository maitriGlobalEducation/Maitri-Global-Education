import Image from "next/image";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  publishedOn: string;
  description: string;
  image: string;
  href: string;
}

const blogs: Blog[] = [
  {
    id: 1,
    title: "Blog name 1",
    publishedOn: "25 Aug 2025",
    description:
      "Brief description of the blog content goes here. It should be concise and engaging to encourage readers to click through.",
    image: "/Images/Events/banquet-wedding.jpg",
    href: "/blogs/blog-1",
  },
  {
    id: 2,
    title: "Blog name 2",
    publishedOn: "25 Aug 2025",
    description:
      "Brief description of the blog content goes here. It should be concise and engaging to encourage readers to click through.",
    image: "/Images/Events/girl.jpg",
    href: "/blogs/blog-2",
  },
  {
    id: 3,
    title: "Blog name 3",
    publishedOn: "25 Aug 2025",
    description:
      "Brief description of the blog content goes here. It should be concise and engaging to encourage readers to click through.",
    image: "/Images/Events/work.jpg",
    href: "/blogs/blog-3",
  },
];

export default function ExploreBlogs() {
  return (
    <section className="bg-[#fafafa] py-14 sm:py-18 lg:py-22">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <h2
          style={{ fontFamily: "Epika" }}
          className="
            mb-10
            text-center
            text-4xl
            font-semibold
            text-black
            sm:mb-12
            sm:text-5xl
            lg:mb-14
            lg:text-6xl
          "
        >
          Explore Blogs
        </h2>

        {/* Blog Grid */}
        <div
          className="
            grid
            grid-cols-1
            gap-x-5
            gap-y-12
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-x-6
          "
        >
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface BlogCardProps {
  blog: Blog;
}

function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group flex min-w-0 flex-col">
      {/* Image */}
      <Link
        href={blog.href}
        className="
          relative
          block
          h-60
          w-full
          overflow-hidden
          rounded-lg
          sm:h-65
          lg:h-70
        "
      >
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            33vw
          "
          className="
            object-cover
            transition-transform
            duration-500
            ease-out
            group-hover:scale-105
          "
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col pt-3">
        <h3 className="text-xl font-medium leading-tight text-black sm:text-2xl">
          {blog.title}
        </h3>

        <p className="mt-1 text-sm text-[#344054] sm:text-base">
          Published on : {blog.publishedOn}
        </p>

        <p className="mt-3 text-sm leading-6 text-[#171717] sm:text-base">
          {blog.description}
        </p>

        <div className="mt-2">
          <Link
            href={blog.href}
            className="
              inline-flex
              min-w-25
              items-center
              justify-center
              rounded-md
              border-2
              border-black
              px-5
              py-2.5
              text-sm
              font-semibold
              text-black
              transition-all
              duration-300
              hover:bg-black
              hover:text-white
            "
          >
            Read...
          </Link>
        </div>
      </div>
    </article>
  );
}
