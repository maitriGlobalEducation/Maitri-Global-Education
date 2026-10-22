const supportItems = [
  {
    number: "01",
    title: "Complete the application form",
    description:
      "Fill out the form with your personal information so our team can understand your needs and help you get started.",
  },
  {
    number: "02",
    title: "Connect with an admission counselor",
    description:
      "Speak with our admission counselor to discuss your scholarship application, understand the requirements, and get guidance on the next steps.",
  },
  {
    number: "03",
    title: "Submit your documents",
    description:
      "Provide the required documents and complete the verification process to finalize your scholarship application.",
  },
];

export default function ScholarshipSupportSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f8e0]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_70%,rgba(91,143,119,0.13),transparent_45%),radial-gradient(ellipse_at_85%_20%,rgba(91,143,119,0.1),transparent_40%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-10 md:py-20 lg:grid-cols-[0.8fr_3fr] lg:items-center lg:gap-14">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#668875]">
            Your next step
          </p>

          <h2 className="max-w-xs font-serif text-4xl font-semibold leading-[1.08] text-[#344563] sm:text-5xl">
            How to
            <br />
            apply
          </h2>

          <p className="mt-5 max-w-xs text-sm leading-6 text-[#52647a]">
            Three simple steps to get your scholarship application moving.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {supportItems.map((item, index) => (
            <article
              key={item.number}
              className="group relative flex flex-col rounded-2xl border border-[#344563]/10 bg-white/65 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#668875]/50 hover:bg-white hover:shadow-lg hover:shadow-[#344563]/5 sm:p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-full border border-[#668875]/30 bg-[#e0f8eb] font-serif text-sm font-semibold text-[#344563] transition-colors group-hover:bg-[#344563] group-hover:text-white">
                  {item.number}
                </span>

                {index < supportItems.length - 1 && (
                  <span className="hidden h-px flex-1 bg-[#344563]/15 sm:ml-4 sm:block" />
                )}
              </div>

              <h3 className="text-base font-bold leading-6 text-[#344563] sm:text-lg">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#52647a]">
                {item.description}
              </p>

              <div className="mt-auto pt-6">
                <div className="h-1 w-10 rounded-full bg-[#9bcab1] transition-all duration-300 group-hover:w-16 group-hover:bg-[#668875]" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
