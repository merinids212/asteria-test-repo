import { useState } from 'react';
import Head from 'next/head';
import AnimatedLines from '../components/AnimatedLines';
import ControlPanel from '../components/ControlPanel';

export default function Home() {
  const [controls, setControls] = useState({
    speed: 1.0,
    density: 100,
    colorScheme: 'aurora',
    animationMode: 'flow',
    cameraRotate: true,
    glowIntensity: 0.7
  });

  return (
    <>
      <Head>
        <title>Asteria - Animated Visualization</title>
        <meta name="description" content="Mesmerizing Three.js animated lines visualization" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        <AnimatedLines {...controls} />
        <ControlPanel onChange={setControls} />
      </main>
    </>
  );
}
