import AboutPage from "@/components/About Page Components/About";
import ContactSection from "@/components/Contact Page Components/ContactSection";
import Testimonials from "@/components/Home Page Components/Testimonials";
import { getPublicTestimonials } from "@/services/testimonial.service";

const page = async () => {
  const [testimonials] = await Promise.all([getPublicTestimonials()]);
  return (
    <>
      <AboutPage />
      <Testimonials testimonials={testimonials} />
      <ContactSection />
    </>
  );
};

export default page;
