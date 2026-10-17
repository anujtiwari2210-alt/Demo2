import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Services from "@/components/sections/Services";
import Showcase from "@/components/sections/Showcase";
import Styles from "@/components/sections/Styles";
import Packages from "@/components/sections/Packages";
import Estimator from "@/components/sections/Estimator";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import QuickActions from "@/components/QuickActions";

// Section order = page flow. Content sab data/content.json se aata hai.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Showcase />
        <Styles />
        <Packages />
        <Estimator />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <QuickActions />
    </>
  );
}
