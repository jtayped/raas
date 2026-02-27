import HeroSection from "./hero";
import { Navbar } from "../common/navbar";
import Features from "./features";
import { ApiPlayground } from "./playground";
import { Pricing } from "./pricing";
import { Testimonials } from "./testimonials";
import { Cta } from "./cta";
import { Footer } from "../common/footer";

const HomePageComponent = () => {
  return (
    <div>
      <Navbar />
      <main className="px-6">
        <HeroSection />
        <Features />
        <ApiPlayground />
        <Pricing />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </div>
  );
};

export default HomePageComponent;
