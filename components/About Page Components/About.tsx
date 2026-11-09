import VisionAndMission from "./VisionAndMission";
import AboutFirstSection from "./AboutFirstSection";

export default function AboutPage() {
  return (
    <section data-navbar-theme="dark">
      <div className="w-full">
        <AboutFirstSection />
        {/* <WhyMaitri /> */}
        <VisionAndMission />
      </div>
    </section>
  );
}
