import Navbar from "../components/landing/Navbar";
import HeroDownload from "../components/landing/HeroDownload";
import LogoStrip from "../components/landing/LogoStrip";
import ValueProp from "../components/landing/ValueProp";
import HowItWorks from "../components/landing/HowItWorks";
import Testimonials from "../components/landing/Testimonials";
import CTABanner from "../components/landing/CTABanner";
import Footer from "../components/landing/Footer";
import AIAssistant from "../components/landing/AIAssistant";

export default function Home() {
  return (
    <div className="min-h-screen font-inter antialiased">
      <Navbar />
      <HeroDownload />
      <LogoStrip />
      <ValueProp />
      <HowItWorks />
      <Testimonials />
      <CTABanner />
      <Footer />
      {/* Floating AI Assistant — rendered outside the scroll flow */}
      <AIAssistant />
    </div>
  );
}
