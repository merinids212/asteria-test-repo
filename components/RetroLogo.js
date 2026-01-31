import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function RetroLogo({
  rotationSpeed = 0.3,
  extrusionDepth = 0.8,
  showScanlines = true
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f0e6);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(-2, 2, 5);
    scene.add(dirLight);

    const mat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.7,
      metalness: 0.1,
    });

    const logoGroup = new THREE.Group();
    const S = 4;
    const H = 2;
    const D = extrusionDepth;

    // Simple test: just add basic boxes without any vertex manipulation
    // Upper band - simple box
    const upperGeom = new THREE.BoxGeometry(S * 2, H, D);
    const upperMesh = new THREE.Mesh(upperGeom, mat);
    upperMesh.position.set(0, S - H/2, 0);
    logoGroup.add(upperMesh);

    // Lower band - simple box
    const lowerGeom = new THREE.BoxGeometry(S * 2, H, D);
    const lowerMesh = new THREE.Mesh(lowerGeom, mat);
    lowerMesh.position.set(0, -S + H/2, 0);
    logoGroup.add(lowerMesh);

    // Add some test scanlines as simple boxes
    if (showScanlines) {
      for (let i = 0; i < 8; i++) {
        const lineGeom = new THREE.BoxGeometry(0.5 + i * 0.2, 0.1, D * 0.7);
        const lineMesh = new THREE.Mesh(lineGeom, mat);
        lineMesh.position.set(-S + 1 + i * 0.15, S - 0.3 - i * 0.25, 0);
        logoGroup.add(lineMesh);
      }

      for (let i = 0; i < 8; i++) {
        const lineGeom = new THREE.BoxGeometry(0.5 + i * 0.2, 0.1, D * 0.7);
        const lineMesh = new THREE.Mesh(lineGeom, mat);
        lineMesh.position.set(S - 1 - i * 0.15, -S + 0.3 + i * 0.25, 0);
        logoGroup.add(lineMesh);
      }
    }

    // "1858" text
    const canvas2d = document.createElement('canvas');
    canvas2d.width = 256;
    canvas2d.height = 64;
    const ctx = canvas2d.getContext('2d');
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 44px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('1858', 128, 32);

    const texture = new THREE.CanvasTexture(canvas2d);
    const textMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3.5, 0.875),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true })
    );
    textMesh.position.set(0, -S - 1.5, 0);
    logoGroup.add(textMesh);

    scene.add(logoGroup);

    const clock = new THREE.Clock();
    let animId;

    function animate() {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      logoGroup.rotation.y = t * rotationSpeed * 0.4;
      logoGroup.scale.z = 1 + Math.sin(t * 0.6) * 0.02;
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      mat.dispose();
    };
  }, [rotationSpeed, extrusionDepth, showScanlines]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#f5f0e6'
      }}
    />
  );
}
