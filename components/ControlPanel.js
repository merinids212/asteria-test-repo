import { useState } from 'react';
import styles from '../styles/controls.module.css';

export default function ControlPanel({ onChange }) {
  const [controls, setControls] = useState({
    rotationSpeed: 0.3,
    extrusionDepth: 0.8,
    showScanlines: true
  });

  const [isCollapsed, setIsCollapsed] = useState(false);

  const updateControl = (key, value) => {
    const newControls = { ...controls, [key]: value };
    setControls(newControls);
    onChange(newControls);
  };

  const resetControls = () => {
    const defaults = {
      rotationSpeed: 0.3,
      extrusionDepth: 0.8,
      showScanlines: true
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
            {/* Rotation Speed */}
            <div className={styles.controlGroup}>
              <label className={styles.label}>
                <span>Rotation Speed</span>
                <span className={styles.value}>{controls.rotationSpeed.toFixed(1)}×</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={controls.rotationSpeed}
                onChange={(e) => updateControl('rotationSpeed', parseFloat(e.target.value))}
                className={styles.slider}
              />
            </div>

            {/* Extrusion Depth */}
            <div className={styles.controlGroup}>
              <label className={styles.label}>
                <span>Extrusion Depth</span>
                <span className={styles.value}>{controls.extrusionDepth.toFixed(1)}</span>
              </label>
              <input
                type="range"
                min="0.2"
                max="2"
                step="0.1"
                value={controls.extrusionDepth}
                onChange={(e) => updateControl('extrusionDepth', parseFloat(e.target.value))}
                className={styles.slider}
              />
            </div>

            {/* Scanlines Toggle */}
            <div className={styles.controlGroup}>
              <label className={styles.toggleLabel}>
                <input
                  type="checkbox"
                  checked={controls.showScanlines}
                  onChange={(e) => updateControl('showScanlines', e.target.checked)}
                  className={styles.checkbox}
                />
                <span>Show Scanlines</span>
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
