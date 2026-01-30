import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AnimatedLines({ 
  speed = 1.0, 
  density = 100, 
  colorScheme = 'aurora',
  animationMode = 'flow',
  cameraRotate = true,
  glowIntensity = 0.7 
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const linesRef = useRef([]);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create lines based on animation mode
    const createLines = () => {
      // Clear existing lines
      linesRef.current.forEach(line => scene.remove(line));
      linesRef.current = [];

      const lines = [];
      const numLines = Math.floor(density);

      for (let i = 0; i < numLines; i++) {
        let geometry, material;

        if (animationMode === 'flow') {
          // Flowing sine wave lines
          const points = [];
          const segments = 100;
          for (let j = 0; j <= segments; j++) {
            const x = (j / segments) * 100 - 50;
            const offset = (i / numLines) * Math.PI * 2;
            const y = Math.sin(x * 0.1 + offset) * 10;
            const z = Math.cos(x * 0.05 + offset) * 5;
            points.push(new THREE.Vector3(x, y, z));
          }
          geometry = new THREE.BufferGeometry().setFromPoints(points);
          
        } else if (animationMode === 'network') {
          // Network nodes with connecting lines
          const points = [];
          const nodeCount = 50;
          for (let j = 0; j < nodeCount; j++) {
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 100;
            points.push(new THREE.Vector3(x, y, z));
          }
          geometry = new THREE.BufferGeometry().setFromPoints(points);
          
        } else if (animationMode === 'helix') {
          // DNA-like helix
          const points = [];
          const segments = 200;
          const radius = 20;
          const offset = (i / numLines) * Math.PI * 2;
          for (let j = 0; j <= segments; j++) {
            const t = (j / segments) * Math.PI * 4;
            const x = Math.cos(t + offset) * radius;
            const y = (j / segments) * 100 - 50;
            const z = Math.sin(t + offset) * radius;
            points.push(new THREE.Vector3(x, y, z));
          }
          geometry = new THREE.BufferGeometry().setFromPoints(points);
          
        } else {
          // Chaos mode - turbulent motion
          const points = [];
          const segments = 80;
          for (let j = 0; j <= segments; j++) {
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 100;
            points.push(new THREE.Vector3(x, y, z));
          }
          geometry = new THREE.BufferGeometry().setFromPoints(points);
        }

        // Color based on scheme
        let color;
        switch(colorScheme) {
          case 'aurora':
            color = new THREE.Color().setHSL(0.6 + (i / numLines) * 0.2, 1, 0.5);
            break;
          case 'neon':
            color = new THREE.Color().setHSL(0.9 + (i / numLines) * 0.2, 1, 0.6);
            break;
          case 'monochrome':
            color = new THREE.Color(0xffffff);
            break;
          default:
            color = new THREE.Color().setHSL((i / numLines), 0.8, 0.5);
        }

        material = new THREE.LineBasicMaterial({ 
          color: color,
          opacity: 0.3 + (glowIntensity * 0.7),
          transparent: true,
          linewidth: 2
        });

        const line = animationMode === 'network' 
          ? new THREE.Line(geometry, material)
          : new THREE.Line(geometry, material);
        
        line.userData = {
          originalPositions: geometry.attributes.position.array.slice(),
          offset: i * 0.1,
          speed: 0.5 + Math.random() * 0.5
        };

        scene.add(line);
        lines.push(line);
      }

      linesRef.current = lines;
    };

    createLines();

    // Animation loop
    let time = 0;
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      time += 0.01 * speed;

      // Animate lines
      linesRef.current.forEach((line, index) => {
        const positions = line.geometry.attributes.position.array;
        const original = line.userData.originalPositions;
        const offset = line.userData.offset;
        const lineSpeed = line.userData.speed;

        if (animationMode === 'flow') {
          // Flowing wave motion
          for (let i = 0; i < positions.length; i += 3) {
            const t = time * lineSpeed + offset;
            positions[i + 1] = original[i + 1] + Math.sin(original[i] * 0.1 + t) * 5;
            positions[i + 2] = original[i + 2] + Math.cos(original[i] * 0.05 + t) * 3;
          }
        } else if (animationMode === 'helix') {
          // Rotate helix
          line.rotation.y = time * 0.5;
        } else if (animationMode === 'chaos') {
          // Turbulent motion using noise-like behavior
          for (let i = 0; i < positions.length; i += 3) {
            const t = time * lineSpeed + offset;
            positions[i] += Math.sin(t + i) * 0.05;
            positions[i + 1] += Math.cos(t + i * 0.5) * 0.05;
            positions[i + 2] += Math.sin(t + i * 0.3) * 0.05;
          }
        }

        line.geometry.attributes.position.needsUpdate = true;
      });

      // Camera motion
      if (cameraRotate) {
        camera.position.x = Math.sin(time * 0.2) * 10;
        camera.position.y = Math.cos(time * 0.15) * 5;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      linesRef.current.forEach(line => {
        line.geometry.dispose();
        line.material.dispose();
      });
    };
  }, []); // Empty dependency - we'll handle updates separately

  // Update lines when parameters change
  useEffect(() => {
    if (!sceneRef.current) return;

    // Clear and recreate lines
    linesRef.current.forEach(line => {
      sceneRef.current.remove(line);
      line.geometry.dispose();
      line.material.dispose();
    });
    linesRef.current = [];

    // Recreate with new parameters
    const scene = sceneRef.current;
    const numLines = Math.floor(density);
    const lines = [];

    for (let i = 0; i < numLines; i++) {
      let geometry, material;

      if (animationMode === 'flow') {
        const points = [];
        const segments = 100;
        for (let j = 0; j <= segments; j++) {
          const x = (j / segments) * 100 - 50;
          const offset = (i / numLines) * Math.PI * 2;
          const y = Math.sin(x * 0.1 + offset) * 10;
          const z = Math.cos(x * 0.05 + offset) * 5;
          points.push(new THREE.Vector3(x, y, z));
        }
        geometry = new THREE.BufferGeometry().setFromPoints(points);
      } else if (animationMode === 'network') {
        const points = [];
        const nodeCount = 50;
        for (let j = 0; j < nodeCount; j++) {
          const x = (Math.random() - 0.5) * 100;
          const y = (Math.random() - 0.5) * 100;
          const z = (Math.random() - 0.5) * 100;
          points.push(new THREE.Vector3(x, y, z));
        }
        geometry = new THREE.BufferGeometry().setFromPoints(points);
      } else if (animationMode === 'helix') {
        const points = [];
        const segments = 200;
        const radius = 20;
        const offset = (i / numLines) * Math.PI * 2;
        for (let j = 0; j <= segments; j++) {
          const t = (j / segments) * Math.PI * 4;
          const x = Math.cos(t + offset) * radius;
          const y = (j / segments) * 100 - 50;
          const z = Math.sin(t + offset) * radius;
          points.push(new THREE.Vector3(x, y, z));
        }
        geometry = new THREE.BufferGeometry().setFromPoints(points);
      } else {
        const points = [];
        const segments = 80;
        for (let j = 0; j <= segments; j++) {
          const x = (Math.random() - 0.5) * 100;
          const y = (Math.random() - 0.5) * 100;
          const z = (Math.random() - 0.5) * 100;
          points.push(new THREE.Vector3(x, y, z));
        }
        geometry = new THREE.BufferGeometry().setFromPoints(points);
      }

      let color;
      switch(colorScheme) {
        case 'aurora':
          color = new THREE.Color().setHSL(0.6 + (i / numLines) * 0.2, 1, 0.5);
          break;
        case 'neon':
          color = new THREE.Color().setHSL(0.9 + (i / numLines) * 0.2, 1, 0.6);
          break;
        case 'monochrome':
          color = new THREE.Color(0xffffff);
          break;
        default:
          color = new THREE.Color().setHSL((i / numLines), 0.8, 0.5);
      }

      material = new THREE.LineBasicMaterial({ 
        color: color,
        opacity: 0.3 + (glowIntensity * 0.7),
        transparent: true,
        linewidth: 2
      });

      const line = new THREE.Line(geometry, material);
      line.userData = {
        originalPositions: geometry.attributes.position.array.slice(),
        offset: i * 0.1,
        speed: 0.5 + Math.random() * 0.5
      };

      scene.add(line);
      lines.push(line);
    }

    linesRef.current = lines;
  }, [density, colorScheme, animationMode, glowIntensity]);

  return <div ref={containerRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }} />;
}
