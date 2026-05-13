import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personal, education, certifications } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "3+", label: "AI Projects Built" },
  { value: "8.0", label: "CGPA" },
  { value: "100", label: "Days Coding Streak" },
  { value: "5+", label: "Tech Stacks" },
];

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bioRef = useRef(null);
  const statsRef = useRef(null);
  const eduRef = useRef(null);
  const certRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        headingRef.current.querySelectorAll(".reveal-word"),
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        }
      );

      // Bio text
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: bioRef.current, start: "top 85%" },
        }
      );

      // Stats cards 3D flip-in
      gsap.fromTo(
        statsRef.current.querySelectorAll(".stat-card"),
        { opacity: 0, rotateY: -60, transformOrigin: "left center", scale: 0.8 },
        {
          opacity: 1,
          rotateY: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
        }
      );

      // Education cards slide up
      gsap.fromTo(
        eduRef.current.querySelectorAll(".edu-card"),
        { opacity: 0, y: 60, rotateX: 20 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: eduRef.current, start: "top 85%" },
        }
      );

      // Cert items
      gsap.fromTo(
        certRef.current.querySelectorAll(".cert-item"),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: certRef.current, start: "top 88%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-panel"
      style={{
        background: "linear-gradient(180deg, var(--void) 0%, var(--carbon) 50%, var(--void) 100%)",
        padding: "140px 0 160px",
      }}
    >
      {/* Ambient orb */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(79,158,255,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        {/* Section label */}
        <div
          className="font-mono"
          style={{
            color: "var(--electric)",
            fontSize: "10px",
            letterSpacing: "0.4em",
            marginBottom: "24px",
            opacity: 0.7,
          }}
        >
          01 — ABOUT
        </div>

        {/* Heading */}
        <div ref={headingRef} style={{ marginBottom: "64px" }}>
          <div style={{ overflow: "hidden", marginBottom: "8px" }}>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {["THE", "ARCHITECT"].map((w, i) => (
                <span
                  key={i}
                  className={`reveal-word font-display ${i === 1 ? "gradient-text" : ""}`}
                  style={{
                    display: "inline-block",
                    fontSize: "clamp(52px, 8vw, 100px)",
                    lineHeight: 0.9,
                    color: i === 0 ? "var(--pure)" : undefined,
                  }}
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {["BEHIND", "THE", "CODE"].map((w, i) => (
                <span
                  key={i}
                  className="reveal-word font-display"
                  style={{
                    display: "inline-block",
                    fontSize: "clamp(52px, 8vw, 100px)",
                    lineHeight: 0.9,
                    color: "var(--muted)",
                  }}
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
          <div
            ref={lineRef}
            style={{
              height: "1px",
              background: "linear-gradient(90deg, var(--electric), transparent)",
              marginTop: "32px",
              transformOrigin: "left center",
              width: "300px",
            }}
          />
        </div>

        {/* Bio + Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            marginBottom: "100px",
            alignItems: "start",
          }}
        >
          {/* Bio */}
          <div ref={bioRef}>
            <p style={{ color: "var(--ghost)", lineHeight: 1.8, fontSize: "17px", marginBottom: "24px", fontWeight: 300 }}>
              I'm <strong style={{ color: "var(--pure)", fontWeight: 600 }}>Shashi Kumar</strong> — a Computer Science Engineering student building AI systems that solve real problems. From face recognition attendance to intelligent resume analyzers, I ship products that work.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: "15px", marginBottom: "32px", fontWeight: 300 }}>
              Currently at Chandigarh College of Engineering with a CGPA of 8.0, targeting AI engineering internships and placements. I work across the full stack — Python ML pipelines to React frontends.
            </p>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {[
                { icon: "→", text: personal.email, href: `mailto:${personal.email}` },
                { icon: "⌥", text: "GitHub", href: personal.github },
                { icon: "◈", text: "LinkedIn", href: personal.linkedin },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono"
                  style={{
                    color: "var(--electric)",
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--neon)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--electric)")}
                >
                  <span>{link.icon}</span> {link.text}
                </a>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              perspective: "1000px",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="stat-card glass"
                style={{
                  padding: "28px 24px",
                  borderRadius: "4px",
                  transition: "transform 0.3s ease, border-color 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
                  e.currentTarget.style.borderColor = "rgba(79,158,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                <div
                  className="font-display gradient-text"
                  style={{ fontSize: "52px", lineHeight: 1 }}
                >
                  {s.value}
                </div>
                <div
                  className="font-mono"
                  style={{ color: "var(--muted)", fontSize: "10px", letterSpacing: "0.2em", marginTop: "8px" }}
                >
                  {s.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div ref={eduRef} style={{ marginBottom: "80px" }}>
          <div
            className="font-mono"
            style={{ color: "var(--electric)", fontSize: "10px", letterSpacing: "0.4em", marginBottom: "32px", opacity: 0.7 }}
          >
            — EDUCATION
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px", perspective: "1000px" }}>
            {education.map((e, i) => (
              <div
                key={i}
                className="edu-card glass"
                style={{
                  padding: "32px",
                  borderRadius: "4px",
                  borderLeft: "2px solid var(--electric)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(8px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
              >
                <div className="font-mono" style={{ color: "var(--electric)", fontSize: "10px", letterSpacing: "0.3em", marginBottom: "12px" }}>
                  {e.year}
                </div>
                <div style={{ color: "var(--pure)", fontWeight: 600, fontSize: "16px", marginBottom: "8px" }}>{e.degree}</div>
                <div style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "16px" }}>{e.institution}</div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    background: "rgba(79,158,255,0.1)",
                    border: "1px solid rgba(79,158,255,0.2)",
                    borderRadius: "2px",
                    color: "var(--electric)",
                    fontSize: "11px",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  CGPA: {e.cgpa}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div ref={certRef}>
          <div className="font-mono" style={{ color: "var(--electric)", fontSize: "10px", letterSpacing: "0.4em", marginBottom: "28px", opacity: 0.7 }}>
            — CERTIFICATIONS
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {certifications.map((c, i) => (
              <div
                key={i}
                className="cert-item glass"
                style={{
                  padding: "12px 20px",
                  borderRadius: "2px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderColor = "rgba(79,158,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                <span style={{ color: "var(--ghost)", fontSize: "13px", fontWeight: 500 }}>{c.name}</span>
                <span className="font-mono" style={{ color: "var(--muted)", fontSize: "9px", letterSpacing: "0.2em" }}>{c.issuer.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
