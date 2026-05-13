import { useState, useEffect, useRef } from "react";

export function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0, nx: 0, ny: 0 });
  const rafRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      targetRef.current = {
        x: e.clientX,
        y: e.clientY,
        nx: (e.clientX / window.innerWidth) * 2 - 1,
        ny: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      setMouse((prev) => ({
        x: lerp(prev.x, targetRef.current.x, 0.08),
        y: lerp(prev.y, targetRef.current.y, 0.08),
        nx: lerp(prev.nx, targetRef.current.nx, 0.08),
        ny: lerp(prev.ny, targetRef.current.ny, 0.08),
      }));
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return mouse;
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(window.scrollY / total);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}
