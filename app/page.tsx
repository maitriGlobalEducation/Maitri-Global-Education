import Badge from "@/components/Home Page Components/Badge";
import StudyLocations, {
  type StudyLocationsContent,
} from "@/components/Home Page Components/StudyLocations";
import Testimonials from "@/components/Home Page Components/Testimonials";
import WhatWeDo, {
  type AboutContent,
} from "@/components/Home Page Components/WhatWeDo";
import ScholarshipShowcase from "@/components/Home Page Components/ScholarshipShowcase";
import UniversityScholarships from "@/components/Home Page Components/UniversityScholarships";
import EventsEngagement from "@/components/Home Page Components/EventsEngagement";
import Blogs from "@/components/Home Page Components/Blogs";
import ServiceProcess from "@/components/Home Page Components/ServiceProcess";
import Hero from "@/components/Home Page Components/Hero";
import EliteCareerChoices from "@/components/Home Page Components/EliteCareerChoices";
import { getPublicHomepage } from "@/services/homepage.service";
import { getUniversities } from "@/services/university.service";
import { getBlogExcerpt, getPublishedBlogs } from "@/services/blog.service";
import { HomepageCareerChoicesContent } from "../types/homepage";
import ExploreBlogs from "@/components/Home Page Components/Blogs";

export default async function Home() {
  const [homepage, universities, publishedBlogs] = await Promise.all([
    getPublicHomepage(),
    getUniversities(),
    getPublishedBlogs(),
  ]);

  const blogs = publishedBlogs.map((blog) => ({
    _id: blog._id,
    title: blog.title,
    slug: blog.slug,
    category: blog.category,
    cardImage: blog.cardImage,
    excerpt: getBlogExcerpt(blog.content),
    publishedAt: blog.publishedAt,
  }));

  const aboutSection = homepage?.sections?.find(
    (section) => section.type === "about",
  );

  const aboutContent = aboutSection?.content as AboutContent | undefined;

  const locationsSection = homepage?.sections?.find(
    (section) => section.type === "locations",
  );

  const locationsContent = locationsSection?.content as
    | StudyLocationsContent
    | undefined;

  const universitiesSection = homepage?.sections?.find(
    (section) => section.type === "universities",
  );

  const careerChoicesSection = homepage?.sections?.find(
    (section) => section.type === "careerChoices",
  );

  const careerChoicesContent = careerChoicesSection?.content as
    | HomepageCareerChoicesContent
    | undefined;

  return (
    <div>
      {homepage?.hero && <Hero hero={homepage.hero} />}

      <WhatWeDo
        content={aboutContent}
        isVisible={aboutSection ? aboutSection.isVisible : true}
      />

      <StudyLocations
        content={locationsContent}
        isVisible={locationsSection ? locationsSection.isVisible : true}
      />

      <ServiceProcess />
      <Badge />
      <ScholarshipShowcase />
      <Testimonials />

      <UniversityScholarships
        universities={universities}
        isVisible={universitiesSection ? universitiesSection.isVisible : true}
      />

      <EliteCareerChoices
        content={careerChoicesContent}
        isVisible={careerChoicesSection ? careerChoicesSection.isVisible : true}
      />

      <EventsEngagement />

      <ExploreBlogs blogs={blogs} />
    </div>
  );
}
