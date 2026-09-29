import React from "react";
import {
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  BusFront,
  Circle,
  CircleCheck,
  ClipboardList,
  Handshake,
  Heart,
  Hospital,
  House,
  Landmark,
  PlaneLanding,
  School,
  UserRound,
  UsersRound,
} from "lucide-react";

const groundServicesLeft = [
  {
    icon: Handshake,
    text: "Complete presence throughout the time of study.",
  },
  {
    icon: Landmark,
    text: "A constant link between parents, students and the institution.",
  },
  {
    icon: House,
    text: "Accommodation.",
  },
  {
    icon: ClipboardList,
    text: "Fiscal code.",
  },
  {
    icon: BusFront,
    text: "Information for student pass.",
  },
  {
    icon: BriefcaseBusiness,
    text: "Assistance in time of internships and placements.",
  },
  {
    icon: Heart,
    text: "Above all, a home away from home.",
  },
];

const groundServicesRight = [
  {
    icon: UsersRound,
    text: "Guidance in time of need during the stay.",
  },
  {
    icon: PlaneLanding,
    text: "Pick up at the airport.",
  },
  {
    icon: BadgeCheck,
    text: "Residence permit.",
  },
  {
    icon: Banknote,
    text: "Bank account.",
  },
  {
    icon: Hospital,
    text: "Support for medical assistance.",
  },
  {
    icon: UserRound,
    text: "A student advisor in need.",
  },
];

const WhyMaitri = () => {
  return (
    <div className="mx-auto mt-14 max-w-6xl sm:mt-18 lg:mt-20">
      <h3
        style={{ fontFamily: "Epika" }}
        className="text-2xl font-semibold text-[#101828] sm:text-3xl"
      >
        Why Maitri Global?
      </h3>

      {/* Main points */}
      <div className="mt-7 space-y-5">
        <InfoRow
          icon={CircleCheck}
          text="MGE guides the student in discerning and decision making, in the selection of the course and institution"
        />

        <InfoRow
          icon={UserRound}
          text="Admission process is taken care of by a dedicated staff."
        />

        <InfoRow
          icon={School}
          text="The student is followed up with the right guidance in visa process and other paperwork. MGE intervenes in the case of a VISA problem or other paperwork difficulties."
        />

        <InfoRow
          icon={Circle}
          text="MGE provides the following ground services:"
          filled
        />
      </div>

      {/* Ground services */}
      <div
        className="
              mt-7
              rounded-2xl
              border
              border-[#ececec]
              bg-[#fcfcfc]
              p-5
              shadow-[0_8px_30px_rgba(0,0,0,0.04)]
              sm:p-7
              lg:p-8
            "
      >
        <div className="grid grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2">
          {/* Left */}
          <div className="space-y-5">
            {groundServicesLeft.map((service) => {
              const Icon = service.icon;

              return (
                <ServiceItem
                  key={service.text}
                  icon={Icon}
                  text={service.text}
                />
              );
            })}
          </div>

          {/* Right */}
          <div className="space-y-5">
            {groundServicesRight.map((service) => {
              const Icon = service.icon;

              return (
                <ServiceItem
                  key={service.text}
                  icon={Icon}
                  text={service.text}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyMaitri;

interface InfoRowProps {
  icon: React.ElementType;
  text: string;
  filled?: boolean;
}

function InfoRow({ icon: Icon, text, filled = false }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3">
      {filled ? (
        <span className="mt-2 size-2.5 shrink-0 rounded-full bg-[#ff5a00]" />
      ) : (
        <Icon
          size={18}
          strokeWidth={2}
          className="mt-1 shrink-0 text-[#ff5a00]"
        />
      )}

      <p className="text-sm leading-6 text-[#344054] sm:text-base sm:leading-7">
        {text}
      </p>
    </div>
  );
}

interface ServiceItemProps {
  icon: React.ElementType;
  text: string;
}

function ServiceItem({ icon: Icon, text }: ServiceItemProps) {
  return (
    <div
      className="
        group
        flex
        items-start
        gap-3
        rounded-lg
        p-1
        transition-transform
        duration-300
      "
    >
      <Icon
        size={18}
        strokeWidth={2}
        className="mt-0.5 shrink-0 text-[#ff5a00]"
      />

      <p className="text-sm leading-6 text-[#344054] sm:text-base">{text}</p>
    </div>
  );
}
