# Asteria Three.js Animated Lines Visualization - Implementation Plan

## 🎯 Goal
Create a mesmerizing animated lines/particles visualization in Three.js with a sleek control panel, branded with "A" for Asteria.

## 📋 Requirements Checklist
- [ ] Three.js animated lines scene (flowing, organic motion)
- [ ] Swap "P" → "A" (reference image pending)
- [ ] Minimal, elegant design aesthetic
- [ ] Floating control panel (right side)
- [ ] SF Pro font family
- [ ] Real-time interactive controls
- [ ] Deploy to Vercel (asteria-test-repo.vercel.app)

## 🏗️ Architecture

### Phase 1: Core Three.js Scene
**Files to create:**
- `/components/AnimatedLines.js` - Main Three.js component
- `/lib/lineAnimation.js` - Animation logic and geometry

**Features:**
1. WebGL canvas with Three.js renderer
2. Animated lines using BufferGeometry
3. Multiple animation patterns:
   - Flowing lines (sine wave motion)
   - Particle connections (proximity-based)
   - Rotating helixes
   - Pulsing network effect
4. Smooth camera motion (subtle orbit/float)
5. Responsive canvas (full viewport)

**Technical approach:**
- Use `THREE.Line` with `THREE.BufferGeometry` for performance
- Custom shaders for gradient effects
- `requestAnimationFrame` loop for smooth 60fps
- Dynamic line generation based on density parameter

### Phase 2: "A" Letter Integration
**Wait for reference image**, but prepare:
- `/components/AsteriaLogo.js` - 3D "A" letter geometry
- Option 1: SVG path → THREE.ShapePath extrusion
- Option 2: Custom vertices for "A" outline
- Integration: Lines emanate from/converge to the "A"

### Phase 3: Control Panel UI
**Files to create:**
- `/components/ControlPanel.js` - React control interface
- `/styles/controls.module.css` - Minimalist styling

**Controls:**
1. **Animation Speed** (slider: 0.1x - 3x)
2. **Line Density** (slider: 10 - 500 lines)
3. **Color Scheme** (presets: Aurora, Neon, Monochrome, Asteria Brand)
4. **Animation Mode** (dropdown: Flow, Network, Helix, Chaos)
5. **Camera Motion** (toggle: Auto-rotate on/off)
6. **Glow Intensity** (slider: 0 - 100%)
7. **Reset** button

**Design specs:**
- Semi-transparent dark panel (backdrop-blur)
- SF Pro font (`font-family: -apple-system, 'SF Pro Display'`)
- Smooth transitions (200ms ease)
- Subtle hover states
- Glass-morphism aesthetic

### Phase 4: Visual Polish
**Enhancements:**
- Post-processing (bloom effect for glow)
- Color gradients on lines (time-based)
- Particle sparkles at line intersections
- Smooth parameter transitions (ease-in-out)
- Loading animation while scene initializes

### Phase 5: Performance & Optimization
- Geometry instancing for repeated elements
- Throttle control updates (debounce 100ms)
- GPU particle system if needed
- Lazy load Three.js (code splitting)
- Optimize for mobile (reduced density)

### Phase 6: Deployment
- [x] Vercel already configured (.vercel exists)
- [ ] Test build locally (`npm run build`)
- [ ] Push to GitHub
- [ ] Verify deployment on asteria-test-repo.vercel.app
- [ ] Screenshot/screen record for showcase

## 🎨 Visual Inspiration
**Line animation styles to implement:**
1. **Flow Mode**: Sine wave motion, flowing like aurora
2. **Network Mode**: Nodes with connecting lines (proximity-based)
3. **Helix Mode**: DNA-like spiraling lines
4. **Chaos Mode**: Turbulent, organic motion (Perlin noise)

**Color palettes:**
- Aurora: Purple → Blue → Cyan gradient
- Neon: Pink → Yellow
- Monochrome: White with subtle blue tint
- Asteria: Brand colors (TBD - check with team)

## 🚀 Implementation Order
1. ✅ Set up plan
2. ⏳ Build basic Three.js scene with simple animated lines
3. ⏳ Add control panel skeleton (non-functional)
4. ⏳ Wire up controls to animation parameters
5. ⏳ Implement multiple animation modes
6. ⏳ Add visual polish (bloom, gradients, sparkles)
7. ⏳ Wait for reference image → integrate "A" logo
8. ⏳ Performance optimization pass
9. ⏳ Test & refine
10. ⏳ Deploy to Vercel

## 📝 Notes
- Keep it smooth (60fps target)
- Make controls feel premium (Apple-like)
- Ensure it looks sick on 4K displays
- Mobile responsive (simplified version)
- No loading flicker - graceful initialization

## 🔥 Stretch Goals (if time permits)
- Mouse interaction (lines follow cursor)
- Preset animations (save/load configurations)
- Screenshot/export feature
- Audio reactivity (visualize sound input)
- VR mode toggle

---
**Status**: Planning complete, ready for implementation!
**Next**: Build core Three.js scene
