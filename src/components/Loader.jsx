import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const nameRef = useRef(null);
  const percentRef = useRef(null);
  const lineRef = useRef(null);
  const ranRef = useRef(false);

  useEffect(() => {
    // Guard: run only once
    if (ranRef.current) return;
    ranRef.current = true;

    const counter = { value: 0 };

    gsap.set([nameRef.current, lineRef.current], { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
          onComplete: onComplete,
        });
      },
    });

    tl.to(nameRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.2)
      .to(lineRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.4)
      .to(
        counter,
        {
          value: 100,
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: () => {
            const p = Math.round(counter.value);
            if (percentRef.current) percentRef.current.textContent = p + "%";
            if (progressRef.current) progressRef.current.style.width = p + "%";
          },
        },
        0.6
      )
      .to({}, { duration: 0.2 });
  }, []);

  return (
    <div id="loader" ref={loaderRef}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(79,158,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div ref={nameRef} style={{ textAlign: "center" }}>
        <div
          className="font-display glow-text"
          style={{ fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "0.15em", color: "#f0f0f5" }}
        >
          SHASHI KUMAR
        </div>
        <div
          ref={lineRef}
          className="font-mono"
          style={{ color: "var(--electric)", fontSize: "11px", letterSpacing: "0.3em", marginTop: "8px" }}
        >
          AI ENGINEER · FULL STACK DEVELOPER
        </div>
      </div>

      <div style={{ width: "280px", marginTop: "48px" }}>
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(255,255,255,0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            ref={progressRef}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: "0%",
              background: "linear-gradient(90deg, var(--electric), var(--neon))",
              boxShadow: "0 0 12px rgba(79,158,255,0.8)",
            }}
          />
        </div>
        <div
          ref={percentRef}
          className="font-mono"
          style={{
            color: "var(--muted)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textAlign: "right",
            marginTop: "8px",
          }}
        >
          0%
        </div>
      </div>
    </div>
  );
}
