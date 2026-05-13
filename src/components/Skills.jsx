import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const categories = [...new Set(skills.map((s) => s.category))];

const categoryColors = {
  Languages: "#4f9eff",
  Frontend: "#00d4ff",
  Backend: "#a855f7",
  "AI/ML": "#ff6b35",
  Database: "#10b981",
  Tools: "#f59e0b",
  "CS Core": "#ec4899",
};

const categoryIcons = {
  Languages: "{ }",
  Frontend: "◈",
  Backend: "⬡",
  "AI/ML": "⚡",
  Database: "◉",
  Tools: "⚙",
  "CS Core": "∑",
};

function SkillBar({ skill, delay }) {
  const barRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: barRef.current, start: "top 92%" },
        }
      );
      gsap.fromTo(
        fillRef.current,
        { width: "0%" },
        {
          width: skill.level + "%",
          duration: 1.2,
          delay: delay + 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: barRef.current, start: "top 92%" },
        }
      );
    });
    return () => ctx.revert();
  }, [skill.level, delay]);

  const color = categoryColors[skill.category] || "#4f9eff";

  return (
    <div ref={barRef} style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <span style={{ color: "var(--ghost)", fontSize: "13px", fontWeight: 400 }}>{skill.name}</span>
        <span className="font-mono" style={{ color, fontSize: "10px", letterSpacing: "0.1em" }}>
          {skill.level}%
        </span>
      </div>
      <div
        style={{
          height: "2px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "1px",
          overflow: "hidden",
        }}
      >
        <div
          ref={fillRef}
          style={{
            height: "100%",
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
            borderRadius: "1px",
            boxShadow: `0 0 8px ${color}60`,
            width: "0%",
          }}
        />
      </div>
    </div>
  );
}

function OrbitRing({ radius, speed, skills: ringSkills, color, delay }) {
  const ringRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: speed,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
    });
    return () => ctx.revert();
  }, [speed]);

  return (
    <div
      ref={ringRef}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius,
        borderRadius: "50%",
        border: `1px solid ${color}15`,
      }}
    >
      {ringSkills.map((skill, i) => {
        const angle = (i / ringSkills.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius + radius;
        const y = Math.sin(angle) * radius + radius;
        return (
          <div
            key={skill.name}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
              padding: "6px 12px",
              background: `${color}12`,
              border: `1px solid ${color}25`,
              borderRadius: "2px",
              whiteSpace: "nowrap",
            }}
          >
            <span className="font-mono" style={{ color, fontSize: "9px", letterSpacing: "0.15em" }}>
              {skill.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const orbitRef = useRef(null);
  const barsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current.querySelectorAll(".sk-word"),
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

      gsap.fromTo(
        orbitRef.current,
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: orbitRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Group skills by category
  const skillsByCategory = categories.map((cat) => ({
    category: cat,
    color: categoryColors[cat] || "#4f9eff",
    icon: categoryIcons[cat] || "○",
    skills: skills.filter((s) => s.category === cat),
  }));

  // Orbit rings: 2 rings
  const ring1Skills = skills.slice(0, 5);
  const ring2Skills = skills.slice(5, 10);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-panel"
      style={{
        background: "linear-gradient(180deg, var(--void) 0%, var(--carbon) 50%, var(--void) 100%)",
        padding: "140px 0 160px",
        overflow: "hidden",
      }}
    >
      {/* Right ambient */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-5%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        {/* Label */}
        <div className="font-mono" style={{ color: "var(--electric)", fontSize: "10px", letterSpacing: "0.4em", marginBottom: "24px", opacity: 0.7 }}>
          03 — ARSENAL
        </div>

        {/* Heading */}
        <div ref={headingRef} style={{ marginBottom: "100px", overflow: "hidden" }}>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {["SKILLS", "&", "TOOLS"].map((w, i) => (
              <span
                key={i}
                className={`sk-word font-display ${i === 1 ? "gradient-text" : ""}`}
                style={{
                  display: "inline-block",
                  fontSize: "clamp(48px, 8vw, 100px)",
                  lineHeight: 0.9,
                  color: i !== 1 ? "var(--pure)" : undefined,
                }}
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
          {/* Skill bars */}
          <div ref={barsRef}>
            <div
              className="font-mono"
              style={{ color: "var(--muted)", fontSize: "10px", letterSpacing: "0.3em", marginBottom: "32px" }}
            >
              PROFICIENCY LEVELS
            </div>
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} delay={i * 0.05} />
            ))}
          </div>

          {/* Category cards + orbit vis */}
          <div>
            <div
              className="font-mono"
              style={{ color: "var(--muted)", fontSize: "10px", letterSpacing: "0.3em", marginBottom: "32px" }}
            >
              CATEGORIES
            </div>

            {/* Orbit visualization */}
            <div
              ref={orbitRef}
              style={{
                position: "relative",
                width: "100%",
                height: "360px",
                marginBottom: "48px",
              }}
            >
              {/* Center core */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(79,158,255,0.2) 0%, transparent 70%)",
                  border: "1px solid rgba(79,158,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
              >
                <span
                  className="font-display"
                  style={{ color: "var(--electric)", fontSize: "18px", letterSpacing: "0.1em" }}
                >
                  SK
                </span>
              </div>

              {/* Orbit rings */}
              <OrbitRing radius={110} speed={20} skills={ring1Skills} color="#4f9eff" delay={0} />
              <OrbitRing radius={160} speed={35} skills={ring2Skills} color="#00d4ff" delay={0.5} />
            </div>

            {/* Category grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
              {skillsByCategory.map((cat) => (
                <div
                  key={cat.category}
                  className="glass"
                  style={{
                    padding: "16px",
                    borderRadius: "4px",
                    transition: "transform 0.2s ease, border-color 0.2s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.borderColor = `${cat.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <span
                      className="font-mono"
                      style={{ color: cat.color, fontSize: "14px" }}
                    >
                      {cat.icon}
                    </span>
                    <span
                      className="font-mono"
                      style={{ color: cat.color, fontSize: "9px", letterSpacing: "0.3em" }}
                    >
                      {cat.category.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {cat.skills.map((s) => (
                      <span
                        key={s.name}
                        style={{
                          fontSize: "10px",
                          color: "var(--muted)",
                          padding: "2px 6px",
                          background: `${cat.color}08`,
                          borderRadius: "1px",
                        }}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
