import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene({ mouse }) {
  const mountRef = useRef(null);
  const sceneRef = useRef({});

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // ── Fog ──
    scene.fog = new THREE.FogExp2(0x050508, 0.035);

    // ── Star Field ── (3 layers for parallax)
    const starLayers = [];
    [1200, 600, 300].forEach((count, i) => {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      for (let j = 0; j < count; j++) {
        positions[j * 3] = (Math.random() - 0.5) * 60;
        positions[j * 3 + 1] = (Math.random() - 0.5) * 60;
        positions[j * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
        sizes[j] = Math.random() * (i === 2 ? 4 : 2) + 0.5;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const mat = new THREE.PointsMaterial({
        color: i === 2 ? 0x4f9eff : i === 1 ? 0x00d4ff : 0xffffff,
        size: i === 2 ? 0.06 : i === 1 ? 0.04 : 0.02,
        transparent: true,
        opacity: [0.3, 0.5, 0.8][i],
        sizeAttenuation: true,
      });
      const stars = new THREE.Points(geo, mat);
      scene.add(stars);
      starLayers.push({ mesh: stars, speed: [0.00005, 0.0001, 0.0002][i] });
    });

    // ── Nebula Particles ──
    const nebulaCount = 2000;
    const nebulaGeo = new THREE.BufferGeometry();
    const nebulaPos = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);
    const colorChoices = [
      new THREE.Color(0x4f9eff),
      new THREE.Color(0x00d4ff),
      new THREE.Color(0x6366f1),
      new THREE.Color(0xa855f7),
    ];
    for (let i = 0; i < nebulaCount; i++) {
      const r = Math.random() * 8 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.4;
      nebulaPos[i * 3] = r * Math.cos(theta) * Math.cos(phi);
      nebulaPos[i * 3 + 1] = r * Math.sin(phi) * 2;
      nebulaPos[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi) - 8;
      const c = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      nebulaColors[i * 3] = c.r;
      nebulaColors[i * 3 + 1] = c.g;
      nebulaColors[i * 3 + 2] = c.b;
    }
    nebulaGeo.setAttribute("position", new THREE.BufferAttribute(nebulaPos, 3));
    nebulaGeo.setAttribute("color", new THREE.BufferAttribute(nebulaColors, 3));
    const nebulaMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const nebula = new THREE.Points(nebulaGeo, nebulaMat);
    scene.add(nebula);

    // ── Floating Wireframe Geometry ──
    const floaters = [];
    const geometries = [
      new THREE.OctahedronGeometry(0.5),
      new THREE.TetrahedronGeometry(0.6),
      new THREE.IcosahedronGeometry(0.4),
    ];
    geometries.forEach((geo, i) => {
      const mat = new THREE.MeshBasicMaterial({
        color: [0x4f9eff, 0x00d4ff, 0xa855f7][i],
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        [(- 3), (3), (0)][i],
        [(1.5), (-1), (2)][i],
        [(-2), (-1.5), (-1)][i]
      );
      scene.add(mesh);
      floaters.push({ mesh, speed: 0.003 + i * 0.002, offset: i * 2 });
    });

    // ── Grid Plane ──
    const gridGeo = new THREE.PlaneGeometry(40, 40, 40, 40);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x4f9eff,
      wireframe: true,
      transparent: true,
      opacity: 0.04,
    });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -4;
    scene.add(grid);

    // ── Ambient light ring ──
    const ringGeo = new THREE.TorusGeometry(3, 0.01, 2, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x4f9eff,
      transparent: true,
      opacity: 0.2,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    ring.position.z = -4;
    scene.add(ring);

    // ── Animation ──
    let frame;
    let t = 0;
    const camTarget = new THREE.Vector3();

    const animate = () => {
      frame = requestAnimationFrame(animate);
      t += 0.001;

      // Parallax star layers
      starLayers.forEach(({ mesh, speed }, i) => {
        mesh.rotation.y += speed;
        mesh.rotation.x += speed * 0.5;
      });

      // Nebula slow rotation
      nebula.rotation.y += 0.0003;
      nebula.rotation.z += 0.0001;

      // Floaters bob and rotate
      floaters.forEach(({ mesh, speed, offset }) => {
        mesh.rotation.x += speed;
        mesh.rotation.y += speed * 1.3;
        mesh.position.y += Math.sin(t * 2 + offset) * 0.002;
      });

      // Ring pulse
      ring.rotation.z += 0.001;
      ringMat.opacity = 0.1 + Math.sin(t * 3) * 0.08;

      // Camera mouse reaction (gentle)
      const mx = (mouse?.nx || 0) * 0.3;
      const my = (mouse?.ny || 0) * 0.2;
      camTarget.set(mx, my, 0);
      camera.position.x += (camTarget.x - camera.position.x) * 0.03;
      camera.position.y += (camTarget.y - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    sceneRef.current = { renderer, scene, camera };

    // ── Resize ──
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

  // Update mouse reactivity
  useEffect(() => {
    if (sceneRef.current.camera && mouse) {
      // mouse handled in animation loop via closure — but we update via ref
    }
  }, [mouse]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
