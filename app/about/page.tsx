import AboutPage from "@/components/About Page Components/About";
import AboutFAQ from "@/components/About Page Components/AboutFAQ";
import AboutServicesSection from "@/components/About Page Components/AboutServicesSection";
import Testimonials from "@/components/Home Page Components/Testimonials";
import { getPublicTestimonials } from "@/services/testimonial.service";

const page = async () => {
  const [testimonials] = await Promise.all([getPublicTestimonials()]);
  return (
    <>
      <AboutPage />
      <AboutServicesSection />
      <Testimonials testimonials={testimonials} />
      <AboutFAQ />
    </>
  );
};

export default page;
