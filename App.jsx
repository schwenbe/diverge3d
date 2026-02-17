import React, { Suspense, useState, useMemo, useRef, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, useProgress, Html, Environment } from '@react-three/drei'
import * as THREE from 'three'
import ControlPanel from './components/ui/ControlPanel'
import './styles/App.css'

// ── Component zone definitions ──────────────────────────────────────
// Positioned in the centered/scaled coordinate space
// Bike: Z = length axis, Y = height, X = width
// Adjust positions if zones don't align perfectly with your scan
const COMPONENT_ZONES = {
  chain: {
    position: [0.08, -0.15, 0.15],
    size: [0.25, 0.15, 0.55],
    label: 'Chain',
    labelOffset: [0.25, 0, 0],
  },
  'front-tire': {
    position: [0, -0.15, -0.72],
    size: [0.18, 0.7, 0.45],
    label: 'Front Tire',
    labelOffset: [-0.3, 0.3, 0],
  },
  'rear-tire': {
    position: [0, -0.15, 0.68],
    size: [0.18, 0.7, 0.45],
    label: 'Rear Tire',
    labelOffset: [0.3, 0.3, 0],
  },
  'brake-pads-f': {
    position: [0.08, 0.0, -0.55],
    size: [0.12, 0.18, 0.15],
    label: 'Front Brake',
    labelOffset: [-0.2, 0.15, 0],
  },
  'brake-pads-r': {
    position: [0.05, -0.05, 0.42],
    size: [0.12, 0.18, 0.15],
    label: 'Rear Brake',
    labelOffset: [0.2, 0.15, 0],
  },
  cassette: {
    position: [0.05, -0.15, 0.55],
    size: [0.2, 0.18, 0.18],
    label: 'Cassette',
    labelOffset: [0.25, 0.1, 0],
  },
  'bar-tape': {
    position: [0, 0.45, -0.55],
    size: [0.35, 0.25, 0.3],
    label: 'Bar Tape',
    labelOffset: [0, 0.2, 0],
  },
  cables: {
    position: [0, 0.35, -0.25],
    size: [0.15, 0.2, 0.5],
    label: 'Cables',
    labelOffset: [-0.2, 0.15, 0],
  },
}

// ── Loader ──────────────────────────────────────────────────────────
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '12px', color: '#fff', fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{
          width: '200px', height: '4px', background: '#333',
          borderRadius: '2px', overflow: 'hidden'
        }}>
          <div style={{
            width: `${progress}%`, height: '100%', background: '#4a9eff',
            borderRadius: '2px', transition: 'width 0.3s ease'
          }} />
        </div>
        <span style={{ fontSize: '14px', opacity: 0.8 }}>
          Loading bike scan... {progress.toFixed(0)}%
        </span>
      </div>
    </Html>
  )
}

// ── Bike Model ──────────────────────────────────────────────────────
function BikeModel() {
  const { scene } = useGLTF('/models/MyBikePolyCamScan.glb')

  useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 2 / maxDim

    scene.scale.setScalar(scale)
    scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale)

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  return <primitive object={scene} />
}

// ── Single Hitbox Zone ──────────────────────────────────────────────
function HitboxZone({ id, zone, isSelected, isHovered, onSelect, onHover, onUnhover }) {
  const active = isSelected || isHovered
  const opacity = isSelected ? 0.25 : isHovered ? 0.15 : 0

  return (
    <group position={zone.position}>
      {/* Clickable box */}
      <mesh
        onClick={(e) => { e.stopPropagation(); onSelect(id) }}
        onPointerOver={(e) => { e.stopPropagation(); onHover(id); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { onUnhover(); document.body.style.cursor = 'default' }}
      >
        <boxGeometry args={zone.size} />
        <meshBasicMaterial
          color="#4a9eff"
          transparent
          opacity={opacity}
          depthWrite={false}
        />
      </mesh>

      {/* Wireframe when active */}
      {active && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(...zone.size)]} />
          <lineBasicMaterial color="#4a9eff" transparent opacity={0.6} />
        </lineSegments>
      )}

      {/* Floating label */}
      {active && (
        <Html
          position={zone.labelOffset}
          center
          distanceFactor={4}
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            background: 'rgba(74, 158, 255, 0.9)',
            color: '#fff',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            fontFamily: 'system-ui, sans-serif',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
          }}>
            {zone.label}
          </div>
        </Html>
      )}
    </group>
  )
}

// ── All Hitbox Zones ────────────────────────────────────────────────
function ComponentZones({ selectedComponent, onSelectComponent }) {
  const [hoveredZone, setHoveredZone] = useState(null)

  return (
    <group>
      {Object.entries(COMPONENT_ZONES).map(([id, zone]) => (
        <HitboxZone
          key={id}
          id={id}
          zone={zone}
          isSelected={selectedComponent === id}
          isHovered={hoveredZone === id}
          onSelect={onSelectComponent}
          onHover={setHoveredZone}
          onUnhover={() => setHoveredZone(null)}
        />
      ))}
    </group>
  )
}

// ── Camera nudge toward selected component ──────────────────────────
function CameraController({ selectedComponent, controlsRef }) {
  React.useEffect(() => {
    if (selectedComponent && COMPONENT_ZONES[selectedComponent] && controlsRef.current) {
      const zone = COMPONENT_ZONES[selectedComponent]
      const pos = zone.position
      const controls = controlsRef.current

      // Gently shift orbit target toward the selected part
      const target = new THREE.Vector3(pos[0], pos[1], pos[2])
      const current = controls.target.clone()
      const lerped = current.lerp(target, 0.3)
      controls.target.copy(lerped)
      controls.update()
    } else if (!selectedComponent && controlsRef.current) {
      // Reset to center when deselected
      const controls = controlsRef.current
      controls.target.lerp(new THREE.Vector3(0, 0, 0), 0.2)
      controls.update()
    }
  }, [selectedComponent, controlsRef])

  return null
}

// ── Main App ────────────────────────────────────────────────────────
function App() {
  const [showGrid, setShowGrid] = useState(true)
  const [showShadows, setShowShadows] = useState(true)
  const [selectedComponent, setSelectedComponent] = useState(null)
  const controlsRef = useRef()

  const handleSelectComponent = useCallback((id) => {
    setSelectedComponent((prev) => (prev === id ? null : id))
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111', position: 'relative' }}>
      {/* Header */}
      <header style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        padding: '16px 24px',
        background: 'linear-gradient(to bottom, rgba(17,17,17,0.95), rgba(17,17,17,0))',
        pointerEvents: 'none'
      }}>
        <h1 style={{
          margin: 0, fontSize: '20px', color: '#fff',
          fontFamily: 'system-ui, sans-serif', fontWeight: 600
        }}>
          Diverge3D
        </h1>
        <p style={{
          margin: '2px 0 0', fontSize: '12px', color: '#888',
          fontFamily: 'system-ui, sans-serif'
        }}>
          Specialized Diverge Comp Carbon (2021)
        </p>
      </header>

      {/* 3D Canvas */}
      <Canvas
        shadows={showShadows}
        camera={{ position: [3, 2, 3], fov: 50 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        onPointerMissed={() => setSelectedComponent(null)}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          castShadow={showShadows}
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[-3, 3, -3]} intensity={0.4} />
        <Environment preset="city" background={false} />

        <Suspense fallback={<Loader />}>
          <BikeModel />
          <ComponentZones
            selectedComponent={selectedComponent}
            onSelectComponent={handleSelectComponent}
          />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          target={[0, 0, 0]}
          enableDamping
          dampingFactor={0.05}
          minDistance={1}
          maxDistance={8}
        />
        {showGrid && <gridHelper args={[10, 10, '#444', '#333']} />}

        <CameraController
          selectedComponent={selectedComponent}
          controlsRef={controlsRef}
        />
      </Canvas>

      {/* Control Panel */}
      <ControlPanel
        showGrid={showGrid}
        setShowGrid={setShowGrid}
        showShadows={showShadows}
        setShowShadows={setShowShadows}
        selectedComponent={selectedComponent}
        onSelectComponent={handleSelectComponent}
      />

      {/* Bottom hint */}
      <div style={{
        position: 'absolute', bottom: '20px', left: '20px',
        color: '#555', fontSize: '12px', fontFamily: 'system-ui, sans-serif',
        pointerEvents: 'none'
      }}>
        🖱️ Drag to rotate · Scroll to zoom · Right-drag to pan · Click components to inspect
      </div>
    </div>
  )
}

export default App
