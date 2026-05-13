import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene from "./HeroScene";
import { personal } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ mouse }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollLineRef = useRef(null);
  const taglineRef = useRef(null);
  const char1Ref = useRef(null);
  const char2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entry animation ──
      const tl = gsap.timeline({ delay: 0.3 });

      // Split name chars for stagger
      tl.fromTo(
        headlineRef.current.querySelectorAll(".char"),
        { y: "120%", opacity: 0, rotateX: -90 },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          stagger: 0.04,
          duration: 1.0,
          ease: "power4.out",
        }
      )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.7, ease: "back.out(1.5)" },
          "-=0.4"
        )
        .fromTo(
          scrollLineRef.current,
          { opacity: 0, scaleY: 0 },
          { opacity: 1, scaleY: 1, duration: 0.8, ease: "power2.out" },
          "-=0.2"
        );

      // ── Scroll parallax ──
      gsap.to(headlineRef.current, {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(taglineRef.current, {
        yPercent: -15,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
      });

      gsap.to(subRef.current, {
        yPercent: -10,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "10% top",
          end: "60% top",
          scrub: 1,
        },
      });

      gsap.to(ctaRef.current, {
        yPercent: -8,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "15% top",
          end: "60% top",
          scrub: 1,
        },
      });

      // Scroll indicator pulsing
      gsap.to(scrollLineRef.current, {
        scaleY: 1.5,
        opacity: 0.4,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const firstName = "SHASHI";
  const lastName = "KUMAR";

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="section-panel"
      style={{
        height: "200vh", // extra scroll space for parallax
        background: "transparent",
      }}
    >
      {/* Three.js background */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <HeroScene mouse={mouse} />

        {/* Radial ambient glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(79,158,255,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          {/* Overline */}
          <div
            className="font-mono"
            style={{
              color: "var(--electric)",
              fontSize: "11px",
              letterSpacing: "0.4em",
              marginBottom: "32px",
              opacity: 0.8,
            }}
          >
            ✦ PORTFOLIO 2025 ✦
          </div>

          {/* Main headline */}
          <div
            ref={headlineRef}
            className="font-display"
            style={{ perspective: "800px", overflow: "hidden" }}
          >
            <div style={{ display: "flex", gap: "0.12em", justifyContent: "center" }}>
              {firstName.split("").map((ch, i) => (
                <span
                  key={i}
                  className="char"
                  style={{
                    display: "inline-block",
                    fontSize: "clamp(72px, 14vw, 180px)",
                    lineHeight: 0.9,
                    color: "#f0f0f5",
                    textShadow:
                      "0 0 40px rgba(79,158,255,0.3), 0 0 80px rgba(79,158,255,0.1)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {ch}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.12em", justifyContent: "center", marginTop: "0.05em" }}>
              {lastName.split("").map((ch, i) => (
                <span
                  key={i}
                  className="char gradient-text"
                  style={{
                    display: "inline-block",
                    fontSize: "clamp(72px, 14vw, 180px)",
                    lineHeight: 0.9,
                    letterSpacing: "0.05em",
                  }}
                >
                  {ch}
                </span>
              ))}
            </div>
          </div>

          {/* Tagline */}
          <div
            ref={taglineRef}
            style={{
              marginTop: "32px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div style={{ width: "40px", height: "1px", background: "var(--electric)", opacity: 0.6 }} />
            <span
              className="font-mono"
              style={{ color: "var(--muted)", fontSize: "13px", letterSpacing: "0.2em" }}
            >
              {personal.title.toUpperCase()}
            </span>
            <div style={{ width: "40px", height: "1px", background: "var(--electric)", opacity: 0.6 }} />
          </div>

          {/* Sub */}
          <p
            ref={subRef}
            style={{
              marginTop: "20px",
              maxWidth: "520px",
              color: "var(--muted)",
              fontSize: "clamp(14px, 1.5vw, 16px)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            {personal.tagline}
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            style={{ marginTop: "48px", display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}
          >
            <a
              href="#projects"
              style={{
                padding: "14px 36px",
                background: "var(--electric)",
                color: "#050508",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.15em",
                textDecoration: "none",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                boxShadow: "0 0 30px rgba(79,158,255,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--neon)";
                e.currentTarget.style.boxShadow = "0 0 50px rgba(0,212,255,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--electric)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(79,158,255,0.3)";
              }}
            >
              VIEW WORK
            </a>
            <a
              href="#contact"
              style={{
                padding: "14px 36px",
                background: "transparent",
                color: "var(--ghost)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                letterSpacing: "0.15em",
                textDecoration: "none",
                borderRadius: "2px",
                border: "1px solid rgba(255,255,255,0.15)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(79,158,255,0.5)";
                e.currentTarget.style.color = "var(--pure)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "var(--ghost)";
              }}
            >
              CONTACT
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollLineRef}
          style={{
            position: "absolute",
            bottom: "48px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            zIndex: 10,
            transformOrigin: "bottom center",
          }}
        >
          <span
            className="font-mono"
            style={{ color: "var(--muted)", fontSize: "9px", letterSpacing: "0.3em" }}
          >
            SCROLL
          </span>
          <div
            style={{
              width: "1px",
              height: "48px",
              background: "linear-gradient(to bottom, var(--electric), transparent)",
            }}
          />
        </div>

        {/* Bottom fog */}
        <div
          className="fog-bottom"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "30%",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
      </div>
    </section>
  );
}
