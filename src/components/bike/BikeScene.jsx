import React from 'react'
import Frame from './Frame/Frame'
import Wheel from './Wheels/Wheel'
import Drivetrain from './Drivetrain/Drivetrain'

export default function BikeScene() {
  return (
    <group position={[0, 0, 0]}>
      {/* Frame - the foundation */}
      <Frame />
      
      {/* Front Wheel */}
      <Wheel 
        position={[0, 0.35, 0.95]} 
        rotation={[0, 0, 0]}
        side="front"
      />
      
      {/* Rear Wheel */}
      <Wheel 
        position={[0, 0.35, -0.45]} 
        rotation={[0, 0, 0]}
        side="rear"
      />
      
      {/* Drivetrain */}
      <Drivetrain position={[0, 0.25, -0.1]} />
    </group>
  )
}
