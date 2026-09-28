import {
  Circle,
  UsersRound,
  Menu,
  Plus,
  Upload,
  ConciergeBell,
  Globe,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "CHOOSE YOUR SERVICES",
    description:
      "Browse our wide range of service categories and find the one that best fits your needs.",
    icon: Menu,
  },
  {
    number: "02",
    title: "FILL YOUR INFORMATION",
    description:
      "Provide your contact and project details so we can send you the best possible offer.",
    icon: Plus,
  },
  {
    number: "03",
    title: "SUBMIT ADDITIONAL DOCUMENTS",
    description:
      "Upload any necessary documents to help us process your service request quickly and efficiently.",
    icon: Upload,
  },
  {
    number: "04",
    title: "PAY & BOOK SERVICE",
    description:
      "Make the payment securely and confirm your booking to get started with the service.",
    icon: ConciergeBell,
  },
];

export default function Services() {
  return (
    <section className="bg-[#f7f6f2] px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Stats */}
        <div className="mb-12 grid grid-cols-2 overflow-hidden rounded-2xl bg-[#292929] text-white sm:mb-16">
          <div className="flex items-center justify-center gap-4 border-r border-white/10 px-4 py-7 sm:gap-6 sm:py-9">
            <Globe
              strokeWidth={1.5}
              className="hidden size-10 text-[#e8c166] sm:block"
            />

            <div>
              <p className="text-2xl font-semibold sm:text-3xl">
                20<span className="text-[#e8c166]">+</span>
              </p>
              <p className="mt-1 text-xs text-white/60 sm:text-sm">Countries</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 px-4 py-7 sm:gap-6 sm:py-9">
            <UsersRound
              strokeWidth={1.5}
              className="hidden size-10 text-[#e8c166] sm:block"
            />

            <div>
              <p className="text-2xl font-semibold sm:text-3xl">
                10000<span className="text-[#e8c166]">+</span>
              </p>
              <p className="mt-1 text-xs text-white/60 sm:text-sm">
                MGE Students Network
              </p>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="relative">
          {/* Desktop connecting line */}
          <div className="absolute top-9 right-[12%] left-[12%] hidden h-px bg-[#d7d1c2] lg:block" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative rounded-2xl border border-black/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7 lg:p-8"
                >
                  {/* Step top */}
                  <div className="relative z-10 mb-8 flex items-center justify-between">
                    <div className="flex size-18 items-center justify-center rounded-full border border-[#e8c166]/40 bg-[#292929] text-white transition-transform duration-300 group-hover:scale-105">
                      <Icon
                        size={25}
                        strokeWidth={1.5}
                        className="text-[#e8c166]"
                      />
                    </div>

                    <span className="font-serif text-4xl text-black/8">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="mb-4 max-w-55 text-base font-bold leading-6 text-[#1d1d1d]">
                    {step.title}
                  </h3>

                  <p className="text-sm leading-6 text-[#686868] sm:text-[15px]">
                    {step.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="mt-7 h-px w-10 bg-[#e8c166] transition-all duration-300 group-hover:w-20" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
