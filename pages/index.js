import { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import ControlPanel from '../components/ControlPanel';

const AnimatedLines = dynamic(() => import('../components/AnimatedLines'), {
  ssr: false,
});

export default function Home() {
  const [controls, setControls] = useState({
    speed: 1.0,
    density: 100,
    colorScheme: 'aurora',
    animationMode: 'logo',
    cameraRotate: true,
    glowIntensity: 0.7
  });

  return (
    <>
      <Head>
        <title>Asteria - Since 1858</title>
        <meta name="description" content="Asteria geometric visualization inspired by timeless design" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ margin: 0, padding: 0, overflow: 'hidden', background: '#0a0a0a' }}>
        <AnimatedLines {...controls} />
        <ControlPanel onChange={setControls} />
      </main>
    </>
  );
}
