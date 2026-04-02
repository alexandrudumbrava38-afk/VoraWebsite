import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Pricing from "@/components/landing/Pricing";

export default function PricingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#091540" }}>
      <Navbar />
      <div className="pt-16">
        <Pricing />
      </div>
      <Footer />
    </div>
  );
}
