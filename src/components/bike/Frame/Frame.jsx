import React from 'react'

export default function Frame() {
  return (
    <group>
      {/* Top Tube */}
      <mesh position={[0, 0.9, 0.25]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 1.5, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Down Tube */}
      <mesh position={[0, 0.5, 0.25]} rotation={[0, 0, -0.4]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 1.6, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Seat Tube */}
      <mesh position={[0, 0.6, -0.3]} rotation={[0, 0, -0.3]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 0.8, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Head Tube */}
      <mesh position={[0, 0.85, 0.9]} rotation={[0.3, 0, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.15, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Chain Stay (Right) */}
      <mesh position={[0.05, 0.25, -0.1]} rotation={[0, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.85, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Chain Stay (Left) */}
      <mesh position={[-0.05, 0.25, -0.1]} rotation={[0, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.85, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Seat Stay (Right) */}
      <mesh position={[0.05, 0.65, -0.35]} rotation={[0, 0, -0.8]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.5, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Seat Stay (Left) */}
      <mesh position={[-0.05, 0.65, -0.35]} rotation={[0, 0, -0.8]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.5, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Bottom Bracket Shell */}
      <mesh position={[0, 0.25, 0.05]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Fork */}
      <mesh position={[0, 0.5, 0.95]} rotation={[0.3, 0, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.7, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  )
}
