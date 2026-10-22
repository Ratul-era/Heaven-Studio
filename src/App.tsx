import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import SocialFeed from "@/components/SocialFeed";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Dock from "@/components/Dock";
import TryNowModal from "@/components/TryNowModal";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [tryOpen, setTryOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-ink text-paper">
      <AnimatePresence>{loading && <Preloader key="pre" onDone={() => setLoading(false)} />}</AnimatePresence>

      <Navbar onTryNow={() => setTryOpen(true)} />

      <main>
        <Home onTryNow={() => setTryOpen(true)} />
        <About />
        <Services />
        <Projects />
        <SocialFeed />
        <Contact />
      </main>

      <Footer />
      <Dock />

      <TryNowModal open={tryOpen} onClose={() => setTryOpen(false)} />

      {/* global blueprint vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] mix-blend-soft-light"
        style={{ background: "radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(0,0,0,0.55))" }}
      />
    </div>
  );
}
