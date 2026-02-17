import React, { Suspense, useState, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, useProgress, Html, Environment } from '@react-three/drei'
import * as THREE from 'three'
import ControlPanel from './components/ui/ControlPanel'
import './styles/App.css'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        color: '#ffffff',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{
          width: '200px',
          height: '4px',
          background: '#333',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: '#4a9eff',
            borderRadius: '2px',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <span style={{ fontSize: '14px', opacity: 0.8 }}>
          Loading bike scan... {progress.toFixed(0)}%
        </span>
      </div>
    </Html>
  )
}

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

function App() {
  const [showGrid, setShowGrid] = useState(true)
  const [showShadows, setShowShadows] = useState(true)

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111', position: 'relative' }}>
      {/* Header */}
      <header style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        padding: '16px 24px',
        background: 'linear-gradient(to bottom, rgba(17,17,17,0.95), rgba(17,17,17,0))',
        pointerEvents: 'none'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '20px',
          color: '#fff',
          fontFamily: 'system-ui, sans-serif',
          fontWeight: 600
        }}>
          Diverge3D
        </h1>
        <p style={{
          margin: '2px 0 0',
          fontSize: '12px',
          color: '#888',
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
        </Suspense>
        <OrbitControls
          target={[0, 0, 0]}
          enableDamping
          dampingFactor={0.05}
          minDistance={1}
          maxDistance={8}
        />
        {showGrid && <gridHelper args={[10, 10, '#444', '#333']} />}
      </Canvas>

      {/* Control Panel overlay */}
      <ControlPanel
        showGrid={showGrid}
        setShowGrid={setShowGrid}
        showShadows={showShadows}
        setShowShadows={setShowShadows}
      />

      {/* Bottom controls hint */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        color: '#555',
        fontSize: '12px',
        fontFamily: 'system-ui, sans-serif',
        pointerEvents: 'none'
      }}>
        🖱️ Drag to rotate · Scroll to zoom · Right-drag to pan
      </div>
    </div>
  )
}

export default App
