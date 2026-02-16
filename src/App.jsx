import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import BikeScene from './components/bike/BikeScene'
import ControlPanel from './components/ui/ControlPanel'
import './styles/App.css'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Diverge3D</h1>
        <p>Specialized Diverge Comp Carbon (2021)</p>
      </header>
      
      <div className="canvas-container">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[3, 2, 3]} fov={50} />
          <OrbitControls 
            enableDamping 
            dampingFactor={0.05}
            minDistance={2}
            maxDistance={10}
            target={[0, 0.5, 0]}
          />
          
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <spotLight
            position={[-3, 4, 2]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            castShadow
          />
          
          {/* Environment for reflections */}
          <Environment preset="studio" />
          
          {/* The Bike */}
          <BikeScene />
          
          {/* Ground plane */}
          <mesh 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0, -0.01, 0]} 
            receiveShadow
          >
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.2} />
          </mesh>
        </Canvas>
      </div>
      
      <ControlPanel />
    </div>
  )
}

export default App
