import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const card = cardRef.current;

      // Cinematic entry
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: isEven ? -100 : 100,
          rotateY: isEven ? 25 : -25,
          scale: 0.85,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );

      // Hover 3D tilt
      const handleMove = (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const rx = ((e.clientY - cy) / rect.height) * -12;
        const ry = ((e.clientX - cx) / rect.width) * 12;
        gsap.to(card, {
          rotateX: rx,
          rotateY: ry,
          duration: 0.4,
          ease: "power2.out",
          transformPerspective: 1200,
        });
      };

      const handleLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });
      };

      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", handleLeave);

      return () => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", handleLeave);
      };
    });
    return () => ctx.revert();
  }, [isEven]);

  return (
    <div
      ref={cardRef}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: isEven ? "1fr 1fr" : "1fr 1fr",
        gap: "80px",
        alignItems: "center",
        marginBottom: "120px",
        perspective: "1200px",
        willChange: "transform",
      }}
    >
      {/* Number */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          left: isEven ? "0" : "auto",
          right: isEven ? "auto" : "0",
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "180px",
          lineHeight: 1,
          color: "rgba(255,255,255,0.02)",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        0{index + 1}
      </div>

      {/* Visual panel */}
      <div
        style={{ order: isEven ? 0 : 1, position: "relative", zIndex: 1 }}
      >
        <div
          className="glass"
          style={{
            aspectRatio: "16/10",
            borderRadius: "6px",
            overflow: "hidden",
            position: "relative",
            border: `1px solid ${project.color}22`,
            boxShadow: `0 0 60px ${project.color}15, 0 0 0 1px ${project.color}10`,
            transition: "box-shadow 0.4s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 0 100px ${project.color}30, 0 0 0 1px ${project.color}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 0 60px ${project.color}15, 0 0 0 1px ${project.color}10`;
          }}
        >
          {/* Simulated screen */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at 30% 40%, ${project.color}10 0%, transparent 60%)`,
            }}
          />
          {/* Grid lines */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `linear-gradient(${project.color}08 1px, transparent 1px), linear-gradient(90deg, ${project.color}08 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Center icon */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div style={{ fontSize: "56px", filter: "drop-shadow(0 0 20px " + project.color + ")" }}>
              {project.icon}
            </div>
            <div
              className="font-mono"
              style={{ color: project.color, fontSize: "9px", letterSpacing: "0.4em", opacity: 0.6 }}
            >
              {project.subtitle.toUpperCase()}
            </div>
          </div>
          {/* Corner brackets */}
          {[
            { top: "12px", left: "12px", borderTop: "1px solid", borderLeft: "1px solid" },
            { top: "12px", right: "12px", borderTop: "1px solid", borderRight: "1px solid" },
            { bottom: "12px", left: "12px", borderBottom: "1px solid", borderLeft: "1px solid" },
            { bottom: "12px", right: "12px", borderBottom: "1px solid", borderRight: "1px solid" },
          ].map((style, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "20px",
                height: "20px",
                borderColor: project.color + "60",
                opacity: 0.8,
                ...style,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ order: isEven ? 1 : 0, position: "relative", zIndex: 1 }}>
        <div
          className="font-mono"
          style={{ color: project.color, fontSize: "10px", letterSpacing: "0.4em", marginBottom: "16px" }}
        >
          0{index + 1} — {project.subtitle.toUpperCase()}
        </div>
        <h3
          className="font-display"
          style={{
            fontSize: "clamp(36px, 5vw, 60px)",
            color: "var(--pure)",
            lineHeight: 0.95,
            marginBottom: "24px",
            letterSpacing: "0.02em",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            color: "var(--muted)",
            lineHeight: 1.8,
            fontSize: "15px",
            fontWeight: 300,
            marginBottom: "32px",
          }}
        >
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}>
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="font-mono"
              style={{
                padding: "5px 12px",
                background: `${project.color}10`,
                border: `1px solid ${project.color}25`,
                borderRadius: "2px",
                color: project.color,
                fontSize: "10px",
                letterSpacing: "0.15em",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = `${project.color}20`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = `${project.color}10`)}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            color: project.color,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textDecoration: "none",
            transition: "gap 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.gap = "20px")}
          onMouseLeave={(e) => (e.currentTarget.style.gap = "12px")}
        >
          VIEW ON GITHUB
          <span style={{ fontSize: "18px" }}>→</span>
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current.querySelectorAll(".proj-word"),
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-panel"
      style={{
        background: "linear-gradient(180deg, var(--void) 0%, var(--carbon) 30%, var(--slate) 60%, var(--carbon) 85%, var(--void) 100%)",
        padding: "140px 0 160px",
      }}
    >
      {/* Left ambient */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "-5%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        {/* Label */}
        <div className="font-mono" style={{ color: "var(--electric)", fontSize: "10px", letterSpacing: "0.4em", marginBottom: "24px", opacity: 0.7 }}>
          02 — SELECTED WORK
        </div>

        {/* Heading */}
        <div ref={headingRef} style={{ marginBottom: "100px", overflow: "hidden" }}>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {["PROJECTS", "THAT", "THINK."].map((w, i) => (
              <span
                key={i}
                className={`proj-word font-display ${i === 2 ? "gradient-text" : ""}`}
                style={{
                  display: "inline-block",
                  fontSize: "clamp(48px, 8vw, 100px)",
                  lineHeight: 0.9,
                  color: i < 2 ? "var(--pure)" : undefined,
                  letterSpacing: "0.02em",
                }}
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* Project cards */}
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
