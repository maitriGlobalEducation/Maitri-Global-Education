export default function BlogsHero() {
  return (
    <section
      style={{
        backgroundImage: "url('/Images/Blogs/BlogsHeroImg.jpg')",
      }}
      className="
        flex
        h-70
        w-full
        items-center
        justify-center
        bg-cover
        bg-center
        bg-no-repeat
        sm:h-90
        lg:h-120
      "
    >
      <h1
        style={{
          fontFamily: "Epika",
        }}
        className="
    text-center
    text-4xl
    font-semibold
    uppercase
    bg-linear-to-r
    from-[#e8c166]
    via-[#fff0b3]
    to-[#e8c166]
     bg-clip-text
    text-transparent
    sm:text-5xl
    lg:text-6xl
  "
      >
        Blogs
      </h1>
    </section>
  );
}
