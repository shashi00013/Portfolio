import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    // Entry animation
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 2.5 }
    );

    // Scroll behavior
    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      // Active section detection
      const sections = ["about", "projects", "skills", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActive(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        padding: "20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
        background: scrolled ? "rgba(5,5,8,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        onClick={(e) => handleClick(e, "#hero")}
        style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "20px",
          letterSpacing: "0.15em",
          color: "var(--pure)",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "color 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--electric)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--pure)")}
      >
        <span style={{ color: "var(--electric)" }}>⚡</span> SK
      </a>

      {/* Nav links */}
      <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
        {navItems.map((item) => {
          const isActive = active === item.href.replace("#", "");
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="font-mono"
              style={{
                fontSize: "10px",
                letterSpacing: "0.25em",
                textDecoration: "none",
                color: isActive ? "var(--electric)" : "var(--muted)",
                transition: "color 0.2s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--pure)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = isActive ? "var(--electric)" : "var(--muted)")
              }
            >
              {item.label.toUpperCase()}
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "var(--electric)",
                    boxShadow: "0 0 8px var(--electric)",
                  }}
                />
              )}
            </a>
          );
        })}

        {/* Hire me CTA */}
        <a
          href="mailto:sk5251476@gmail.com"
          className="font-mono"
          style={{
            padding: "8px 20px",
            background: "transparent",
            border: "1px solid rgba(79,158,255,0.4)",
            borderRadius: "2px",
            color: "var(--electric)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--electric)";
            e.currentTarget.style.color = "#050508";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--electric)";
          }}
        >
          HIRE ME
        </a>
      </div>
    </nav>
  );
}
