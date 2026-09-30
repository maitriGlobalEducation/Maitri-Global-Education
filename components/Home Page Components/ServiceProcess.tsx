import {
  Circle,
  UsersRound,
  ListFilter,
  Plus,
  Upload,
  PoundSterling,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "CHOOSE YOUR SERVICES",
    description:
      "Browse our wide range of service categories and find the one that best fits your needs.",
    icon: ListFilter,
  },
  {
    id: 2,
    title: "FILL YOUR INFORMATION",
    description:
      "Provide your contact and project details so we can send you the best possible offer.",
    icon: Plus,
  },
  {
    id: 3,
    title: "SUBMIT ADDITIONAL DOCUMENTS",
    description:
      "Upload any necessary documents to help us process your service request quickly and efficiently.",
    icon: Upload,
  },
  {
    id: 4,
    title: "PAY & BOOK SERVICE",
    description:
      "Make the payment securely and confirm your booking to get started with the service.",
    icon: PoundSterling,
  },
];

export default function ServiceProcess() {
  return (
    <section className="bg-[#fafafa] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div
        className="
          mx-auto
          max-w-7xl
          rounded-2xl
          bg-white
          px-5
          py-8
          shadow-[0_18px_45px_rgba(0,0,0,0.12)]
          sm:px-8
          lg:px-10
          lg:py-10
        "
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-10">
          {/* LEFT STATISTICS */}
          <div
            className="
              flex
              shrink-0
              flex-row
              items-center
              justify-around
              gap-5
              border-b
              border-[#e0e4ed]
              pb-7
              lg:w-42
              lg:flex-col
              lg:justify-around
              lg:border-r
              lg:border-b-0
              lg:pr-9
              lg:pb-0
            "
          >
            {/* Countries */}
            <div className="flex flex-1 flex-col items-center text-center">
              <Circle
                size={35}
                strokeWidth={2.2}
                className="mb-3 text-[#303438]"
              />

              <h3 className="text-2xl font-bold text-[#101828] sm:text-3xl">
                20+
              </h3>

              <p className="mt-0.5 text-sm text-[#667085] sm:text-base">
                Countries
              </p>
            </div>

            {/* Students */}
            <div className="flex flex-1 flex-col items-center text-center">
              <UsersRound
                size={34}
                strokeWidth={2.2}
                className="mb-3 text-[#303438]"
              />

              <h3 className="text-2xl font-bold text-[#101828] sm:text-3xl">
                10000+
              </h3>

              <p className="mt-0.5 whitespace-nowrap text-sm text-[#667085] sm:text-base">
                MGE Students Network
              </p>
            </div>
          </div>

          {/* RIGHT PROCESS CARDS */}
          <div className="grid min-w-0 flex-1 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className="
                    flex
                    min-h-70
                    flex-col
                    items-center
                    rounded-xl
                    border
                    border-[#e8eaf0]
                    bg-white
                    px-5
                    py-7
                    text-center
                    shadow-[0_3px_5px_rgba(0,0,0,0.12)]
                    transition-shadow
                    duration-300
                    hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]
                    sm:min-h-72
                    lg:px-4
                  "
                >
                  {/* Icon */}
                  <Icon
                    size={36}
                    strokeWidth={2.2}
                    className="mb-5 shrink-0 text-[#303438]"
                  />

                  {/* Title */}
                  <h3 className="mb-3 text-sm leading-6 font-bold text-[#101828] uppercase">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-6 text-[#667085] sm:text-base">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
