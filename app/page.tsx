import Badge from "@/components/Home Page Components/Badge";
import Footer from "@/components/Home Page Components/Footer";
import HeroSlider from "@/components/Home Page Components/Hero";
import InterestedSection from "@/components/Home Page Components/EliteCareerChoices";
import Services from "@/components/Home Page Components/Services";
import StudyLocations from "@/components/Home Page Components/StudyLocations";
import Testimonials from "@/components/Home Page Components/Testimonials";
import WhatWeDo from "@/components/Home Page Components/WhatWeDo";
import ScholarshipShowcase from "@/components/Home Page Components/ScholarshipShowcase";
import UniversityScholarships from "@/components/Home Page Components/UniversityScholarships";
import EliteCareerChoices from "@/components/Home Page Components/EliteCareerChoices";
import EventsEngagement from "@/components/Home Page Components/EventsEngagement";
import Blogs from "@/components/Home Page Components/Blogs";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <WhatWeDo />
      <StudyLocations />
      <Services />
      <Badge />
      <ScholarshipShowcase />
      <Testimonials />
      <UniversityScholarships />
      <EliteCareerChoices />
      <EventsEngagement />
      <Blogs />
      <Footer />
    </div>
  );
}
