import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientsBar from "@/components/ClientsBar";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import Facilities from "@/components/Facilities";
import Marquee from "@/components/Marquee";
import Team from "@/components/Team";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Navbar />
      <Hero />
      <ClientsBar />
      <About />
      <Programs />
      <Benefits />
      <Testimonials />
      <Facilities />
      <Marquee />
      <Team />
      <CTA />
      <Footer />
    </main>
  );
}
