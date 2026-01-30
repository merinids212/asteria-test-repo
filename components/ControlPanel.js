import { useState } from 'react';
import styles from '../styles/controls.module.css';

export default function ControlPanel({ onChange }) {
  const [controls, setControls] = useState({
    speed: 1.0,
    density: 100,
    colorScheme: 'aurora',
    animationMode: 'flow',
    cameraRotate: true,
    glowIntensity: 0.7
  });

  const updateControl = (key, value) => {
    const newControls = { ...controls, [key]: value };
    setControls(newControls);
    onChange(newControls);
  };

  const resetControls = () => {
    const defaults = {
      speed: 1.0,
      density: 100,
      colorScheme: 'aurora',
      animationMode: 'flow',
      cameraRotate: true,
      glowIntensity: 0.7
    };
    setControls(defaults);
    onChange(defaults);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Control Center</h2>
        <div className={styles.brandMark}>A</div>
      </div>

      <div className={styles.controls}>
        {/* Animation Speed */}
        <div className={styles.controlGroup}>
          <label className={styles.label}>
            Animation Speed
            <span className={styles.value}>{controls.speed.toFixed(1)}x</span>
          </label>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={controls.speed}
            onChange={(e) => updateControl('speed', parseFloat(e.target.value))}
            className={styles.slider}
          />
        </div>

        {/* Line Density */}
        <div className={styles.controlGroup}>
          <label className={styles.label}>
            Line Density
            <span className={styles.value}>{Math.floor(controls.density)}</span>
          </label>
          <input
            type="range"
            min="10"
            max="200"
            step="10"
            value={controls.density}
            onChange={(e) => updateControl('density', parseInt(e.target.value))}
            className={styles.slider}
          />
        </div>

        {/* Glow Intensity */}
        <div className={styles.controlGroup}>
          <label className={styles.label}>
            Glow Intensity
            <span className={styles.value}>{Math.floor(controls.glowIntensity * 100)}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={controls.glowIntensity}
            onChange={(e) => updateControl('glowIntensity', parseFloat(e.target.value))}
            className={styles.slider}
          />
        </div>

        {/* Animation Mode */}
        <div className={styles.controlGroup}>
          <label className={styles.label}>Animation Mode</label>
          <select
            value={controls.animationMode}
            onChange={(e) => updateControl('animationMode', e.target.value)}
            className={styles.select}
          >
            <option value="flow">Flow</option>
            <option value="helix">Helix</option>
            <option value="network">Network</option>
            <option value="chaos">Chaos</option>
          </select>
        </div>

        {/* Color Scheme */}
        <div className={styles.controlGroup}>
          <label className={styles.label}>Color Scheme</label>
          <div className={styles.colorGrid}>
            {['aurora', 'neon', 'monochrome', 'asteria'].map(scheme => (
              <button
                key={scheme}
                className={`${styles.colorButton} ${controls.colorScheme === scheme ? styles.active : ''}`}
                onClick={() => updateControl('colorScheme', scheme)}
                data-scheme={scheme}
              >
                {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Camera Rotation */}
        <div className={styles.controlGroup}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={controls.cameraRotate}
              onChange={(e) => updateControl('cameraRotate', e.target.checked)}
              className={styles.checkbox}
            />
            <span>Camera Auto-Rotate</span>
          </label>
        </div>

        {/* Reset Button */}
        <button className={styles.resetButton} onClick={resetControls}>
          Reset to Defaults
        </button>
      </div>

      <div className={styles.footer}>
        <span className={styles.footerText}>Asteria Visualization</span>
      </div>
    </div>
  );
}
