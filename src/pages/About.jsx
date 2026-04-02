import { Link } from "react-router-dom";
import { Zap, Users } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5F0F6" }}>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-32 text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ backgroundColor: "#091540" }}
        >
          <Users className="w-8 h-8" style={{ color: "#F4F482" }} />
        </div>
        <h1
          className="text-4xl font-black font-space-grotesk tracking-tight mb-4"
          style={{ color: "#091540" }}
        >
          About Us
        </h1>
        <p className="text-lg max-w-md mb-8" style={{ color: "rgba(9,21,64,0.5)" }}>
          Learn about the team building the future of distributed rendering. Coming soon.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full transition-all hover:scale-105"
          style={{ backgroundColor: "#091540", color: "#F4F482" }}
        >
          <Zap size={16} />
          Back to Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
