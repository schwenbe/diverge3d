import React from 'react'
import * as THREE from 'three'

export default function Wheel({ position, rotation, side = "front" }) {
  // Create spokes
  const spokes = []
  const spokeCount = 24
  const hubRadius = 0.03
  const rimRadius = 0.32
  
  for (let i = 0; i < spokeCount; i++) {
    const angle = (i / spokeCount) * Math.PI * 2
    const x = Math.cos(angle)
    const y = Math.sin(angle)
    
    spokes.push(
      <group key={i} rotation={[0, 0, angle]}>
        <mesh position={[rimRadius / 2, 0, 0]}>
          <cylinderGeometry args={[0.001, 0.001, rimRadius - hubRadius, 8]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    )
  }
  
  return (
    <group position={position} rotation={rotation}>
      {/* Hub */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[hubRadius, hubRadius, 0.08, 16]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Spokes */}
      <group rotation={[0, 0, Math.PI / 2]}>
        {spokes}
      </group>
      
      {/* Rim */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[rimRadius, 0.012, 16, 32]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.4} 
          roughness={0.3}
        />
      </mesh>
      
      {/* Tire */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.35, 0.019, 16, 32]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.1} 
          roughness={0.9}
        />
      </mesh>
      
      {/* Brake Rotor (only for disc brakes) */}
      <mesh position={[0, 0, side === "front" ? -0.045 : 0.045]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.002, 32]} />
        <meshStandardMaterial 
          color="#888888" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Rotor mounting bolts */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2
        return (
          <mesh 
            key={i}
            position={[
              Math.cos(angle) * 0.05, 
              Math.sin(angle) * 0.05, 
              side === "front" ? -0.045 : 0.045
            ]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.003, 0.003, 0.003, 8]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </mesh>
        )
      })}
    </group>
  )
}
