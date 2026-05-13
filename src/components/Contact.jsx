import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { personal } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

function ContactScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 500);
    camera.position.z = 8;

    // Warp tunnel particles
    const count = 1500;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const c1 = new THREE.Color(0x4f9eff);
    const c2 = new THREE.Color(0x00d4ff);
    const c3 = new THREE.Color(0xa855f7);
    const palette = [c1, c2, c3];

    for (let i = 0; i < count; i++) {
      const r = Math.random() * 12 + 1;
      const theta = Math.random() * Math.PI * 2;
      pos[i * 3] = r * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(theta);
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
      const c = palette[Math.floor(Math.random() * palette.length)];
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(cols, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
    });
    const tunnel = new THREE.Points(geo, mat);
    scene.add(tunnel);

    let frame;
    let t = 0;

    const animate = () => {
      frame = requestAnimationFrame(animate);
      t += 0.003;
      tunnel.rotation.z += 0.001;
      // Slow camera zoom in for cinematic outro
      camera.position.z = 8 - Math.sin(t * 0.3) * 1.5;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}

const contactLinks = [
  {
    label: "EMAIL",
    value: personal.email,
    href: `mailto:${personal.email}`,
    icon: "✉",
    color: "#4f9eff",
  },
  {
    label: "GITHUB",
    value: "shashi00013",
    href: personal.github,
    icon: "⌥",
    color: "#00d4ff",
  },
  {
    label: "LINKEDIN",
    value: "shashi0013",
    href: personal.linkedin,
    icon: "◈",
    color: "#a855f7",
  },
  {
    label: "PHONE",
    value: personal.phone,
    href: `tel:${personal.phone}`,
    icon: "◉",
    color: "#ff6b35",
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const linksRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current.querySelectorAll(".ct-word"),
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );

      // Links stagger
      gsap.fromTo(
        linksRef.current.querySelectorAll(".contact-link"),
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: linksRef.current, start: "top 85%" },
        }
      );

      // Footer
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 95%" },
        }
      );

      // Cinematic section zoom
      gsap.fromTo(
        sectionRef.current.querySelector(".contact-inner"),
        { scale: 0.95 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-panel"
      style={{
        background: "linear-gradient(180deg, var(--void) 0%, var(--carbon) 30%, var(--void) 100%)",
        padding: "160px 0 80px",
      }}
    >
      <ContactScene />

      {/* Top fog */}
      <div
        className="fog-top"
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: "30%", zIndex: 1, pointerEvents: "none" }}
      />

      {/* Bottom fog */}
      <div
        className="fog-bottom"
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", zIndex: 1, pointerEvents: "none" }}
      />

      <div
        className="contact-inner"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 10 }}
      >
        {/* Label */}
        <div className="font-mono" style={{ color: "var(--electric)", fontSize: "10px", letterSpacing: "0.4em", marginBottom: "24px", opacity: 0.7 }}>
          04 — CONTACT
        </div>

        {/* Heading */}
        <div ref={headingRef} style={{ marginBottom: "80px", overflow: "hidden" }}>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "8px" }}>
            {["LET'S", "BUILD"].map((w, i) => (
              <span
                key={i}
                className="ct-word font-display"
                style={{
                  display: "inline-block",
                  fontSize: "clamp(48px, 8vw, 110px)",
                  lineHeight: 0.9,
                  color: "var(--pure)",
                }}
              >
                {w}
              </span>
            ))}
          </div>
          <div>
            <span
              className="ct-word font-display gradient-text-ember"
              style={{
                display: "inline-block",
                fontSize: "clamp(48px, 8vw, 110px)",
                lineHeight: 0.9,
              }}
            >
              SOMETHING
            </span>{" "}
            <span
              className="ct-word font-display gradient-text"
              style={{
                display: "inline-block",
                fontSize: "clamp(48px, 8vw, 110px)",
                lineHeight: 0.9,
              }}
            >
              GREAT.
            </span>
          </div>
          <p
            className="ct-word"
            style={{
              display: "block",
              marginTop: "32px",
              color: "var(--muted)",
              fontSize: "16px",
              fontWeight: 300,
              maxWidth: "480px",
              lineHeight: 1.8,
            }}
          >
            Open to internships, collaborations, and full-time opportunities.
            Let's connect and build something that matters.
          </p>
        </div>

        {/* Contact links grid */}
        <div
          ref={linksRef}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginBottom: "100px" }}
        >
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="contact-link glass"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "24px",
                borderRadius: "4px",
                textDecoration: "none",
                transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                borderColor: "rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = `${link.color}40`;
                e.currentTarget.style.boxShadow = `0 20px 40px ${link.color}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: `${link.color}12`,
                  border: `1px solid ${link.color}25`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                {link.icon}
              </div>
              <div>
                <div className="font-mono" style={{ color: link.color, fontSize: "9px", letterSpacing: "0.3em", marginBottom: "4px" }}>
                  {link.label}
                </div>
                <div style={{ color: "var(--ghost)", fontSize: "14px", fontWeight: 400 }}>{link.value}</div>
              </div>
              <div style={{ marginLeft: "auto", color: link.color, opacity: 0.4, fontSize: "18px" }}>→</div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <div className="font-display" style={{ fontSize: "28px", color: "var(--pure)", letterSpacing: "0.1em" }}>
              SHASHI KUMAR
            </div>
            <div className="font-mono" style={{ color: "var(--muted)", fontSize: "10px", letterSpacing: "0.3em", marginTop: "4px" }}>
              AI ENGINEER · FULL STACK DEVELOPER · CCE JHANJERI
            </div>
          </div>
          <div className="font-mono" style={{ color: "var(--muted)", fontSize: "10px", letterSpacing: "0.2em" }}>
            © 2025 · BUILT WITH REACT + GSAP + THREE.JS
          </div>
        </div>

        {/* Cinematic end line */}
        <div
          style={{
            marginTop: "60px",
            textAlign: "center",
            paddingBottom: "40px",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "60px",
              background: "linear-gradient(to bottom, var(--electric), transparent)",
              margin: "0 auto 16px",
            }}
          />
          <div className="font-mono" style={{ color: "var(--muted)", fontSize: "9px", letterSpacing: "0.4em" }}>
            — END —
          </div>
        </div>
      </div>
    </section>
  );
}
