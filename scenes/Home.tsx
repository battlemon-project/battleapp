import { Vector3, Viewport } from '@babylonjs/core'
import { PropsWithChildren } from 'react'
import { Engine, Scene } from 'react-babylonjs'

const BabylonScene = () => (
  <div className="w-100 h-100 position-absolute">
    <Engine antialias canvasId="babylon-canvas">
      <Scene>
        <freeCamera
          name="camera1"
          position={new Vector3(0, 5, -10)}
          setTarget={[Vector3.Zero()]}
          fovMode={1}
        />

        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={new Vector3(0, 1, 0)}
        />

        <ground name="ground" width={6} height={6} />
        <box name="box" size={2} position={new Vector3(0, 1, 0)} rotation={Vector3.Zero()} />
      </Scene>
    </Engine>
  </div>
)

export default BabylonScene;