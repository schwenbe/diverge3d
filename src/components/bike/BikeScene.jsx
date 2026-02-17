/**
 * BikeScene.jsx - Main 3D scene with PolyCam scan
 * 
 * Replaces the basic geometry with your actual PolyCam scan.
 * Place MyBikePolyCamScan.glb in /public/models/ folder.
 */
import { Canvas } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment, 
  useGLTF, 
  Center,
  ContactShadows,
  PresentationControls,
  Html,
  useProgress
} from '@react-three/drei'
import { Suspense, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

// Loading indicator
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
            background: '#4fc3f7',
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

// The actual bike model from PolyCam scan
function BikeModel({ onLoaded }) {
  const { scene } = useGLTF('/models/MyBikePolyCamScan.glb')
  const modelRef = useRef()

  useEffect(() => {
    if (scene) {
      // Compute the bounding box to center and scale properly
      const box = new THREE.Box3().setFromObject(scene)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())

      // A real Diverge is roughly 1.7m long (z-axis in this scan)
      // Current z-extent is ~1.158m, so scale factor ≈ 1.7 / 1.158 ≈ 1.47
      const targetLength = 1.7 // meters
      const currentLength = Math.max(size.x, size.y, size.z)
      const scale = targetLength / currentLength

      scene.scale.setScalar(scale)
      
      // Re-center after scaling
      const scaledBox = new THREE.Box3().setFromObject(scene)
      const scaledCenter = scaledBox.getCenter(new THREE.Vector3())
      scene.position.sub(scaledCenter)
      
      // Lift so bottom sits near ground plane
      const scaledBox2 = new THREE.Box3().setFromObject(scene)
      scene.position.y -= scaledBox2.min.y

      // Ensure all materials render properly
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
          // Fix potential material issues from PolyCam export
          if (child.material) {
            child.material.side = THREE.DoubleSide
          }
        }
      })

      if (onLoaded) onLoaded({ size, scale })
    }
  }, [scene, onLoaded])

  return <primitive ref={modelRef} object={scene} />
}

// Ground plane / grid
function Ground() {
  return (
    <group>
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={4}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          transparent 
          opacity={0.5} 
        />
      </mesh>
      <gridHelper args={[10, 20, '#333355', '#222244']} position={[0, 0, 0]} />
    </group>
  )
}

// Main scene component
export default function BikeScene() {
  const [modelInfo, setModelInfo] = useState(null)

  return (
    <div style={{ width: '100%', height: '100vh', background: '#0a0a1a' }}>
      <Canvas
        shadows
        camera={{ 
          position: [2.5, 1.5, 2.5], 
          fov: 45,
          near: 0.01,
          far: 100
        }}
        gl={{ 
          antialias: true, 
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
        />
        <directionalLight position={[-3, 4, -5]} intensity={0.5} />
        <spotLight
          position={[0, 5, 0]}
          intensity={0.3}
          angle={0.6}
          penumbra={1}
        />

        {/* Environment for reflections */}
        <Environment preset="city" background={false} />

        {/* Bike model */}
        <Suspense fallback={<Loader />}>
          <BikeModel onLoaded={setModelInfo} />
        </Suspense>

        {/* Ground */}
        <Ground />

        {/* Camera controls */}
        <OrbitControls
          makeDefault
          minDistance={0.5}
          maxDistance={8}
          minPolarAngle={0.1}
          maxPolarAngle={Math.PI / 2 - 0.05}
          enableDamping
          dampingFactor={0.05}
          target={[0, 0.5, 0]}
        />
      </Canvas>

      {/* Info overlay */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        color: '#8888aa',
        fontSize: '12px',
        fontFamily: 'system-ui, sans-serif',
        pointerEvents: 'none'
      }}>
        <div>🖱️ Drag to rotate · Scroll to zoom · Right-drag to pan</div>
        {modelInfo && (
          <div style={{ marginTop: '4px', opacity: 0.6 }}>
            PolyCam scan loaded · 41k vertices · Scale: {modelInfo.scale.toFixed(2)}x
          </div>
        )}
      </div>
    </div>
  )
}

// Preload the model
useGLTF.preload('/models/MyBikePolyCamScan.glb')
