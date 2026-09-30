export default function ContactHero() {
  return (
    <section
      className="
        relative
        flex
        h-65
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-cover
        bg-center
        bg-no-repeat
        sm:h-85
        lg:h-115
        opacity-70
      "
      style={{
        backgroundImage: "url('/Images/Contact/contact.avif')",
      }}
    >
      {/* Subtle white overlay */}
      <div className="absolute inset-0 bg-white/15" />

      {/* Heading */}
      <h1
        style={{
          fontFamily: "Epika",
          backgroundImage:
            "linear-gradient(90deg, #C99A23 0%, #FFE5A5 50%, #C99A23 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 3px 3px rgba(0,0,0,0.12))",
        }}
        className="
          relative
          z-10
          px-4
          text-center
          text-4xl
          leading-tight
          font-semibold
          uppercase
          sm:text-5xl
          lg:text-6xl
        "
      >
        Contact Us
      </h1>
    </section>
  );
}
