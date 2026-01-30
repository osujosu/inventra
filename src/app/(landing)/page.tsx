import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        
        {/* Placeholder sections for M4 */}
        <section id="features" className="min-h-screen" />
        <section id="how-it-works" className="min-h-screen" />
        <section id="pricing" className="min-h-screen" />
        <section id="about" className="min-h-screen" />
      </main>
    </>
  );
}