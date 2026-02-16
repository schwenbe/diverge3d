import React from 'react'

export default function Drivetrain({ position }) {
  return (
    <group position={position}>
      {/* Crank Arm (Right) */}
      <mesh position={[0.08, 0, 0]} rotation={[0, 0, -0.5]} castShadow>
        <boxGeometry args={[0.015, 0.15, 0.008]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Crank Arm (Left) */}
      <mesh position={[-0.08, 0, 0]} rotation={[0, 0, 0.5]} castShadow>
        <boxGeometry args={[0.015, 0.15, 0.008]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Chainring (Outer - 48T) */}
      <mesh position={[0.055, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.003, 48]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Chainring (Inner - 32T) */}
      <mesh position={[0.045, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.003, 32]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Spindle */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.18, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Pedal (Right) */}
      <mesh position={[0.08, -0.08, 0]} castShadow>
        <boxGeometry args={[0.08, 0.015, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.4} />
      </mesh>
      
      {/* Pedal (Left) */}
      <mesh position={[-0.08, 0.08, 0]} castShadow>
        <boxGeometry args={[0.08, 0.015, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.4} />
      </mesh>
      
      {/* Cassette (at rear wheel position) */}
      <group position={[0.06, 0.1, -0.35]}>
        {/* Individual cogs */}
        {[11, 13, 15, 17, 19, 21, 23, 25, 28, 31, 34].map((teeth, index) => {
          const radius = 0.025 + (teeth / 1000)
          const zOffset = index * 0.003
          return (
            <mesh 
              key={index}
              position={[0, 0, zOffset]}
              rotation={[0, 0, Math.PI / 2]}
              castShadow
            >
              <cylinderGeometry args={[radius, radius, 0.002, teeth]} />
              <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
            </mesh>
          )
        })}
      </group>
      
      {/* Chain (simplified) */}
      <mesh position={[0.055, 0, -0.175]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.175, 0.004, 8, 32]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Rear Derailleur Body */}
      <group position={[0.08, 0, -0.4]}>
        <mesh position={[0, 0.05, 0]} castShadow>
          <boxGeometry args={[0.02, 0.08, 0.015]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
        </mesh>
        
        {/* Derailleur Pulley (Upper) */}
        <mesh position={[0, 0.02, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.008, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Derailleur Pulley (Lower) */}
        <mesh position={[0, -0.02, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.008, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    </group>
  )
}
