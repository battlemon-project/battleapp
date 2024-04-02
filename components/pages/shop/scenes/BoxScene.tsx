
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
  chainId: number | undefined,
  debug?: boolean
}

export default function BoxScene({ name, debug, chainId }: ItemSceneProps) {
  const { box, status, prize } = useBoxStore()
  const { width } = useWindowSize()
  const mounted = useIsMounted()
  const [ positions3, setPositions3 ] = useState<Vector3[]>([
    new Vector3(0, 0, -3),
    new Vector3(0, 0, 1),
    new Vector3(0, 0, 3)
  ])
  const [ positions4, setPositions4 ] = useState<Vector3[]>([
    new Vector3(0, 0, -3),
    new Vector3(0, 0, -1),
    new Vector3(0, 0, 1),
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
      setPositions3([
        new Vector3(-0.5, 0.1, -2.5),
        new Vector3(0, 0, 0),
        new Vector3(1.5, 0, 1.9)
      ])
      setPositions4([
        new Vector3(-0.9, 0.1, -2.5),
        new Vector3(-1.2, -0.1, -0.3),
        new Vector3(0.2, 0, 0.9),
        new Vector3(1.5, 0, 2.1)
      ])
    } else if (width > 1200) {
      setPositions3([
        new Vector3(-1.0, 0, -1.8),
        new Vector3(0, 0, 0),
        new Vector3(1.1, 0, 1.7)
      ])
      setPositions4([
        new Vector3(-0.9, 0.1, -2.1),
        new Vector3(-1.2, -0.1, -0.2),
        new Vector3(0.2, 0, 0.7),
        new Vector3(1.5, 0, 1.7)
      ])
    } else if (width > 992) {
      setPositions3([
        new Vector3(-1, 0, -1.5),
        new Vector3(0, 0, 0),
        new Vector3(1, 0, 1.5)
      ])
      setPositions4([
        new Vector3(-0.9, 0.1, -1.7),
        new Vector3(-1.2, -0.1, 0),
        new Vector3(0.2, 0, 0.6),
        new Vector3(1.5, 0.1, 1.15)
      ])
    } else if (width > 768) {
      setPositions3([
        new Vector3(-0.8, 0, -1.1),
        new Vector3(0, 0, 0),
        new Vector3(1, 0, 0.8)
      ])
      setPositions4([
        new Vector3(-0.9, 0, -1.1),
        new Vector3(-1.2, -0.15, 0.24),
        new Vector3(0.2, 0, 0.4),
        new Vector3(1.5, 0.1, 0.55)
      ])
    } else {
      setPositions3([
        new Vector3(-1.6, 0, 0.5),
        new Vector3(0, -0.3, 0),
        new Vector3(-0.6, 0, 1.2)
      ])
      setPositions4([
        new Vector3(-0.9, -0.35, -0.4),
        new Vector3(-1.6, 0, 0.7),
        new Vector3(0, -0.3, 0.2),
        new Vector3(-0.6, 0, 1.4)
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
            {chainId !== 137 && <BoxModel name={'Basket_4'} box={box} status={status} prize={prize} position={positions4[0]} />}
            <BoxModel name={ chainId == 137 ? 'Basket1_POL' : 'Basket1'} box={box} status={status} prize={prize} position={chainId == 137 ? positions3[0] : positions4[1]} />
            <BoxModel name={ chainId == 137 ? 'Basket2_POL' : 'Basket2'} box={box} status={status} prize={prize} position={chainId == 137 ? positions3[1] : positions4[2]} />
            <BoxModel name={ chainId == 137 ? 'Basket3_POL' : 'Basket3'} box={box} status={status} prize={prize} position={chainId == 137 ? positions3[2] : positions4[3]} />
          </Suspense>

          {debug && <DebugLayer />}
        </Scene>
      </Engine>}
    </>
  )
}