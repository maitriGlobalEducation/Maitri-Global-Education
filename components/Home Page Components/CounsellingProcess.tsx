import Image from "next/image";
import Link from "next/link";
import { FilePenLine, BaggageClaim, Network } from "lucide-react";

const steps = [
  {
    number: 2,
    title: "Application Filling",
    description: ["Initial CV and profile review"],
    icon: FilePenLine,
  },
  {
    number: 3,
    title: "Visa & Onboarding",
    description: ["Documentation", "Packing List"],
    icon: BaggageClaim,
  },
  {
    number: 4,
    title: "Network Support",
    description: [
      "Accomodation & housing",
      "Sim card activation before arrival",
      "Airport Pickup",
      "Residence card & Fiscal card distribution",
      "Bank Account opening",
    ],
    icon: Network,
  },
];

export default function CounsellingSteps() {
  return (
    <section className="w-full px-2 py-5 lg:px-6 lg:py-16">
      <h2 className="mb-8 text-center text-2xl font-semibold uppercase text-[#071735] lg:mb-12">
        Our Free Study Abroad Counselling Process
      </h2>

      <div
        className="
      mx-auto max-w-105
      lg:flex lg:max-w-7xl lg:gap-2.5
    "
      >
        {/* Step 1 */}
        <div className="relative lg:w-2/5">
          {/* Number */}
          <div
            className="
          absolute -top-6 left-1/2 z-20
          flex h-11 w-11 -translate-x-1/2
          items-center justify-center
          rounded-full bg-[#f4511e]
          text-xl font-bold text-white shadow-md

          lg:top-auto lg:right-7 lg:bottom-7 lg:left-auto
          lg:translate-x-0
        "
          >
            1
          </div>

          {/* Image */}
          <div className="relative h-75 overflow-hidden lg:h-119">
            <Image
              src="https://maitriglobaleducation.com/public/img/images/student1.jpg"
              alt="Meeting with counsellor"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />

            {/* Dark gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

            {/* Content */}
            <div
              className="
            absolute inset-x-0 bottom-0 px-8 pb-10
            lg:px-6 lg:pb-7
          "
            >
              <h2
                className="
              mb-4 text-[17px] font-bold uppercase text-white
              lg:pr-8
            "
              >
                Meeting With Counsellor
              </h2>

              <Link
                href="/contact"
                className="
              inline-flex min-h-11 items-center
              justify-center bg-linear-to-r
              from-[#ff5638] to-[#e91e63]
              px-6 text-[13px] font-bold
              uppercase tracking-wide text-white
              transition-opacity hover:opacity-90

              lg:min-h-11 lg:px-6 lg:text-xs
            "
              >
                Book Free Counselling
              </Link>
            </div>
          </div>
        </div>

        {/* Remaining Steps */}
        <div
          className="
        mt-2.5 space-y-2.5
        lg:mt-0 lg:flex lg:w-3/5
        lg:gap-2.5 lg:space-y-0
      "
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className={`
              relative flex min-h-31.5
              items-start px-6 py-7 text-white

              lg:min-h-119 lg:flex-1
              lg:flex-col lg:px-6 lg:py-11

              ${
                index === 0
                  ? "bg-[#373530]"
                  : index === 1
                    ? "bg-[#56534e]"
                    : "bg-[#74716a]"
              }
            `}
              >
                {/* Number */}
                <div
                  className="
                absolute -top-6 left-7 z-10
                flex h-11 w-11 items-center
                justify-center rounded-full
                bg-[#f4511e] text-xl
                font-bold text-white shadow-md

                lg:top-auto lg:bottom-7
                lg:left-7
              "
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mr-5 mt-1 shrink-0 lg:mr-0 lg:mt-0 lg:mb-8">
                  <Icon size={46} strokeWidth={1.3} className="text-white" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-[17px] leading-5 font-bold uppercase">
                    {step.title}
                  </h3>

                  <div className="mt-4 space-y-3 lg:mt-7 lg:space-y-2">
                    {step.description.map((text) => (
                      <p
                        key={text}
                        className="text-xs leading-5 text-[#e4e0dc] lg:text-sm"
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
