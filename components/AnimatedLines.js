import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AnimatedLines({ 
  speed = 1.0, 
  density = 100, 
  colorScheme = 'aurora',
  animationMode = 'logo',
  cameraRotate = true,
  glowIntensity = 0.7 
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const linesRef = useRef([]);
  const textRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 80);

    // Renderer with glow
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x667eea, 1, 100);
    pointLight.position.set(0, 0, 20);
    scene.add(pointLight);

    // Create the logo-inspired line pattern
    const createLogoPattern = () => {
      linesRef.current.forEach(line => scene.remove(line));
      linesRef.current = [];

      const lines = [];
      const lineCount = 15;
      const lineWidth = 30;
      const spacing = 2;
      
      // Left side - tapering lines (top-left triangle pattern)
      for (let i = 0; i < lineCount; i++) {
        const yPos = lineCount * spacing / 2 - i * spacing;
        const lineLength = (lineCount - i) / lineCount * lineWidth;
        
        const geometry = new THREE.BufferGeometry();
        const points = [
          new THREE.Vector3(-lineWidth, yPos, 0),
          new THREE.Vector3(-lineWidth + lineLength, yPos, 0)
        ];
        geometry.setFromPoints(points);

        const color = getColorForScheme(colorScheme, i / lineCount);
        const material = new THREE.LineBasicMaterial({ 
          color: color,
          opacity: 0.6 + (glowIntensity * 0.4),
          transparent: true,
          linewidth: 2
        });

        const line = new THREE.Line(geometry, material);
        line.userData = { 
          originalPoints: points,
          index: i,
          side: 'left',
          baseY: yPos,
          phase: i * 0.2
        };
        
        scene.add(line);
        lines.push(line);
      }

      // Right side - horizontal lines (bottom-right pattern)
      const rightLineCount = 12;
      for (let i = 0; i < rightLineCount; i++) {
        const yPos = -spacing - i * spacing;
        
        const geometry = new THREE.BufferGeometry();
        const points = [
          new THREE.Vector3(-5, yPos, 0),
          new THREE.Vector3(lineWidth, yPos, 0)
        ];
        geometry.setFromPoints(points);

        const color = getColorForScheme(colorScheme, 0.5 + i / rightLineCount * 0.5);
        const material = new THREE.LineBasicMaterial({ 
          color: color,
          opacity: 0.6 + (glowIntensity * 0.4),
          transparent: true,
          linewidth: 2
        });

        const line = new THREE.Line(geometry, material);
        line.userData = { 
          originalPoints: points,
          index: i,
          side: 'right',
          baseY: yPos,
          phase: i * 0.15
        };
        
        scene.add(line);
        lines.push(line);
      }

      // Create "1858" text using lines
      createTextLines(scene, lines, colorScheme, glowIntensity);

      linesRef.current = lines;
    };

    const getColorForScheme = (scheme, t) => {
      switch(scheme) {
        case 'aurora':
          return new THREE.Color().setHSL(0.55 + t * 0.2, 0.8, 0.5);
        case 'neon':
          return new THREE.Color().setHSL(0.8 + t * 0.3, 1, 0.6);
        case 'monochrome':
          return new THREE.Color(0.3 + t * 0.7, 0.3 + t * 0.7, 0.3 + t * 0.7);
        case 'asteria':
          return new THREE.Color().setHSL(0.65, 0.7, 0.4 + t * 0.3);
        default:
          return new THREE.Color().setHSL(t, 0.8, 0.5);
      }
    };

    const createTextLines = (scene, linesArray, colorScheme, glowIntensity) => {
      const textY = -32;
      const charWidth = 4;
      const charHeight = 6;
      const charSpacing = 5;
      
      // Simple line-based "1858" representation
      const textPatterns = {
        '1': [
          [[-0.5, 1], [0.5, 1]],
          [[0, 1], [0, -1]],
          [[-0.5, -1], [0.5, -1]]
        ],
        '8': [
          [[-0.7, 0.5], [0.7, 0.5]],
          [[-0.7, -0.5], [0.7, -0.5]],
          [[-0.7, 0.5], [-0.7, -0.5]],
          [[0.7, 0.5], [0.7, -0.5]],
          [[-0.5, 0], [0.5, 0]]
        ],
        '5': [
          [[0.7, 1], [-0.7, 1]],
          [[-0.7, 1], [-0.7, 0]],
          [[-0.7, 0], [0.7, 0]],
          [[0.7, 0], [0.7, -1]],
          [[0.7, -1], [-0.7, -1]]
        ]
      };

      const digits = ['1', '8', '5', '8'];
      digits.forEach((digit, idx) => {
        const offsetX = -9 + idx * charSpacing;
        const pattern = textPatterns[digit];
        
        pattern.forEach(([start, end]) => {
          const geometry = new THREE.BufferGeometry();
          const points = [
            new THREE.Vector3(
              offsetX + start[0] * charWidth * 0.5,
              textY + start[1] * charHeight * 0.5,
              0
            ),
            new THREE.Vector3(
              offsetX + end[0] * charWidth * 0.5,
              textY + end[1] * charHeight * 0.5,
              0
            )
          ];
          geometry.setFromPoints(points);

          const color = getColorForScheme(colorScheme, 0.7);
          const material = new THREE.LineBasicMaterial({ 
            color: color,
            opacity: 0.5 + (glowIntensity * 0.5),
            transparent: true,
            linewidth: 1.5
          });

          const line = new THREE.Line(geometry, material);
          line.userData = { 
            isText: true,
            phase: idx * 0.3
          };
          
          scene.add(line);
          linesArray.push(line);
        });
      });
    };

    createLogoPattern();

    // Animation loop
    let time = 0;
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      time += 0.005 * speed;

      // Animate lines based on mode
      linesRef.current.forEach((line) => {
        if (line.userData.isText) {
          // Subtle pulse for text
          const pulse = Math.sin(time * 2 + line.userData.phase) * 0.1 + 0.9;
          line.material.opacity = (0.5 + (glowIntensity * 0.5)) * pulse;
        } else {
          const { side, index, phase, baseY, originalPoints } = line.userData;
          
          if (animationMode === 'logo') {
            // Gentle wave motion
            const wave = Math.sin(time + phase) * 0.5;
            const positions = line.geometry.attributes.position.array;
            
            if (side === 'left') {
              // Left lines extend and contract
              const extensionFactor = 0.95 + Math.sin(time * 0.5 + phase) * 0.05;
              const length = (originalPoints[1].x - originalPoints[0].x) * extensionFactor;
              positions[3] = originalPoints[0].x + length;
              positions[4] = baseY + wave;
            } else {
              // Right lines wave
              positions[4] = baseY + wave;
              positions[1] = baseY + wave;
            }
            
            line.geometry.attributes.position.needsUpdate = true;
          } else if (animationMode === 'rotate') {
            // Rotate the entire pattern
            line.rotation.z = time * 0.2;
          } else if (animationMode === 'pulse') {
            // Pulsing scale
            const scale = 0.95 + Math.sin(time * 2 + phase) * 0.05;
            line.scale.set(scale, scale, scale);
          }
        }
      });

      // Camera motion
      if (cameraRotate) {
        camera.position.x = Math.sin(time * 0.3) * 8;
        camera.position.y = Math.cos(time * 0.2) * 5;
        camera.lookAt(0, 0, 0);
      }

      // Rotate point light for dramatic effect
      pointLight.position.x = Math.sin(time) * 20;
      pointLight.position.y = Math.cos(time * 0.7) * 20;

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
  }, [speed, density, colorScheme, animationMode, cameraRotate, glowIntensity]);

  return <div ref={containerRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }} />;
}
