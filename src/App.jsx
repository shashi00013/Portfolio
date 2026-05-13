import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { useMousePosition } from "./hooks/useMousePosition";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const lenisRef = useRef(null);
  const mouse = useMousePosition();

  // ── Lenis smooth scroll ──
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  // ── Custom cursor ──
  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    let trailX = 0, trailY = 0;
    let rafId;

    const moveCursor = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    const animateTrail = () => {
      trailX += (mouse.x - trailX) * 0.1;
      trailY += (mouse.y - trailY) * 0.1;
      trail.style.left = trailX + "px";
      trail.style.top = trailY + "px";
      rafId = requestAnimationFrame(animateTrail);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    rafId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(rafId);
    };
  }, [mouse]);

  const handleLoaderComplete = () => {
    setLoaded(true);
    // Trigger ScrollTrigger refresh after loader exits
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  return (
    <>
      {/* Film grain */}
      <div id="grain" aria-hidden="true" />

      {/* Custom cursor */}
      <div id="cursor" ref={cursorRef} aria-hidden="true" />
      <div id="cursor-trail" ref={trailRef} aria-hidden="true" />

      {/* Loader */}
      {!loaded && <Loader onComplete={handleLoaderComplete} />}

      {/* Main content */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <Navbar />
        <main>
          <Hero mouse={mouse} />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </div>
    </>
  );
}
