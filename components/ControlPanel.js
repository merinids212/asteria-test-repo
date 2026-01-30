import { useState } from 'react';
import styles from '../styles/controls.module.css';

export default function ControlPanel({ onChange }) {
  const [controls, setControls] = useState({
    speed: 1.0,
    density: 100,
    colorScheme: 'aurora',
    animationMode: 'logo',
    cameraRotate: true,
    glowIntensity: 0.7
  });

  const [isCollapsed, setIsCollapsed] = useState(false);

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
      animationMode: 'logo',
      cameraRotate: true,
      glowIntensity: 0.7
    };
    setControls(defaults);
    onChange(defaults);
  };

  return (
    <div className={`${styles.panel} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoMark}>
            <div className={styles.logoLines}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={styles.titleSection}>
            <h2 className={styles.title}>ASTERIA</h2>
            <p className={styles.subtitle}>Est. 1858</p>
          </div>
        </div>
        <button 
          className={styles.collapseButton}
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand panel" : "Collapse panel"}
        >
          {isCollapsed ? '›' : '‹'}
        </button>
      </div>

      {!isCollapsed && (
        <>
          <div className={styles.controls}>
            {/* Animation Speed */}
            <div className={styles.controlGroup}>
              <label className={styles.label}>
                <span>Animation Speed</span>
                <span className={styles.value}>{controls.speed.toFixed(1)}×</span>
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

            {/* Glow Intensity */}
            <div className={styles.controlGroup}>
              <label className={styles.label}>
                <span>Glow Intensity</span>
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
              <label className={styles.label}>
                <span>Animation Mode</span>
              </label>
              <div className={styles.buttonGroup}>
                {['logo', 'rotate', 'pulse'].map(mode => (
                  <button
                    key={mode}
                    className={`${styles.modeButton} ${controls.animationMode === mode ? styles.active : ''}`}
                    onClick={() => updateControl('animationMode', mode)}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Scheme */}
            <div className={styles.controlGroup}>
              <label className={styles.label}>
                <span>Color Palette</span>
              </label>
              <div className={styles.colorGrid}>
                {[
                  { id: 'aurora', label: 'Aurora', colors: ['#667eea', '#764ba2'] },
                  { id: 'neon', label: 'Neon', colors: ['#ff006e', '#ffbe0b'] },
                  { id: 'monochrome', label: 'Mono', colors: ['#ffffff', '#888888'] },
                  { id: 'asteria', label: 'Asteria', colors: ['#667eea', '#4a5db8'] }
                ].map(scheme => (
                  <button
                    key={scheme.id}
                    className={`${styles.colorButton} ${controls.colorScheme === scheme.id ? styles.active : ''}`}
                    onClick={() => updateControl('colorScheme', scheme.id)}
                    style={{
                      background: controls.colorScheme === scheme.id
                        ? `linear-gradient(135deg, ${scheme.colors[0]}, ${scheme.colors[1]})`
                        : 'rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <span className={styles.colorLabel}>{scheme.label}</span>
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
                <span>Dynamic Camera Movement</span>
              </label>
            </div>

            {/* Reset Button */}
            <button className={styles.resetButton} onClick={resetControls}>
              ↻ Reset to Defaults
            </button>
          </div>

          <div className={styles.footer}>
            <div className={styles.footerBrand}>
              <span className={styles.footerText}>Asteria Visualization</span>
              <span className={styles.footerYear}>Since 1858</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
