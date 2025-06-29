import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import TestimonialsSection from "@/components/testimonials-section";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smooth-scroll";

export default function Home() {
  return (
    <main className="min-h-screen">
      <SmoothScroll />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
