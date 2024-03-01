
import { Scene as BabylonScene, Color4, Vector3, CubeTexture, SceneLoader } from '@babylonjs/core'
import { Engine, FlyCamera, Model, Scene } from 'react-babylonjs'
import '@babylonjs/loaders';
import { Suspense, useEffect, useState } from 'react';
import { useIsMounted } from 'hooks/useIsMounted';
import { GLTFFileLoader, GLTFLoaderAnimationStartMode } from '@babylonjs/loaders';
import { useBoxStore } from '../store/boxStore';
import BoxModel from './BoxModel';
import DebugLayer from 'components/babylon/DebugLayer';
import useWindowSize from 'hooks/useWindowSize';

interface ItemSceneProps {
  name: string,
  debug?: boolean
}

export default function BoxScene({ name, debug }: ItemSceneProps) {
  const { box, status, prize } = useBoxStore()
  const { width } = useWindowSize()
  const mounted = useIsMounted()
  const [ positions, setPositions ] = useState<Vector3[]>([
    new Vector3(0, 0, -3),
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 3)
  ])

  const onSceneMount = ({ scene }: {scene: BabylonScene}) => {
    if (!scene) return;

    SceneLoader.OnPluginActivatedObservable.add(function (loader) {
      (loader as GLTFFileLoader).animationStartMode = GLTFLoaderAnimationStartMode.NONE;
    });

    scene.clearColor = new Color4(0, 0, 0, 0);
    const hdrTexture = CubeTexture.CreateFromPrefilteredData(
      (process.env.NEXT_PUBLIC_ASSETS || '') + `/models/index/environmentSpecular.env`,
      scene
    );
    scene.environmentTexture = hdrTexture;
    scene.environmentTexture.level = 1;
  }

  useEffect(() => {
    if (!width) return;

    if (width > 1400) {
      setPositions([
        new Vector3(-0.5, 0.1, -2.5),
        new Vector3(0, 0, 0),
        new Vector3(1.5, 0, 1.9)
      ])
    } else if (width > 1200) {
      setPositions([
        new Vector3(-1.0, 0, -1.8),
        new Vector3(0, 0, 0),
        new Vector3(1.1, 0, 1.7)
      ])
    } else if (width > 992) {
      setPositions([
        new Vector3(-1, 0, -1.5),
        new Vector3(0, 0, 0),
        new Vector3(1, 0, 1.5)
      ])
    } else if (width > 768) {
      setPositions([
        new Vector3(-0.8, 0, -1.1),
        new Vector3(0, 0, 0),
        new Vector3(1, 0, 0.8)
      ])
    } else {
      setPositions([
        new Vector3(-1.6, 0, 0.5),
        new Vector3(0, -0.3, 0),
        new Vector3(-0.6, 0, 1.2)
      ])
    }
  }, [width])

  return (
    <>
      {mounted && <Engine antialias canvasId="box-canvas">
        <Scene onSceneMount={onSceneMount}>
          <followCamera
            name='box-camera'
            fov={0.14}
            position={new Vector3(12.5,2.4,-9)}
            target={new Vector3(0,0.5,0)}
            rotation-z={0}
          />

          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={new Vector3(0, 1, 0)}
          />
          
          <Suspense>
            <BoxModel name={'Basket1'} box={box} status={status} prize={prize} position={positions[0]} />
            <BoxModel name={'Basket2'} box={box} status={status} prize={prize} position={positions[1]} />
            <BoxModel name={'Basket3'} box={box} status={status} prize={prize} position={positions[2]} />
          </Suspense>

          {debug && <DebugLayer />}
        </Scene>
      </Engine>}
    </>
  )
}