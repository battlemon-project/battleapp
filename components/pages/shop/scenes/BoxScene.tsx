
import { Scene as BabylonScene, Color4, Vector3, CubeTexture, SceneLoader } from '@babylonjs/core'
import { Engine, Model, Scene } from 'react-babylonjs'
import '@babylonjs/loaders';
import { Suspense } from 'react';
import { useIsMounted } from 'hooks/useIsMounted';
import { GLTFFileLoader, GLTFLoaderAnimationStartMode } from '@babylonjs/loaders';
import { useBoxStore } from '../store/boxStore';
import BoxModel from './BoxModel';
import DebugLayer from 'components/babylon/DebugLayer';

interface ItemSceneProps {
  name: string,
  debug?: boolean
}

export default function BoxScene({ name, debug }: ItemSceneProps) {
  const { box, status, prize } = useBoxStore()
  const mounted = useIsMounted()

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

  return (
    <>
      {box} {status}
      {mounted && <Engine antialias canvasId="box-canvas">
        <Scene onSceneMount={onSceneMount}>
          <arcRotateCamera
            name='box-camera' 
            alpha={-0.2} 
            lowerAlphaLimit={-0.2}
            upperAlphaLimit={-0.2}
            beta={1.3}
            lowerBetaLimit={1.3}
            upperBetaLimit={1.3}
            radius={2.8} 
            lowerRadiusLimit={2.8}
            upperRadiusLimit={2.8}
            target={new Vector3(0,0.6,0)}
          />

          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={new Vector3(0, 1, 0)}
          />
          
          <Suspense>
            <BoxModel name={name} box={box} status={status} prize={prize} />
          </Suspense>

          {debug && <DebugLayer />}
        </Scene>
      </Engine>}
    </>
  )
}