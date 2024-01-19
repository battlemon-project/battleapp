
import { Scene as BabylonScene, Color4, Vector3, CubeTexture, SceneLoader } from '@babylonjs/core'
import { Engine, Scene } from 'react-babylonjs'
import '@babylonjs/loaders';
import { Suspense, useEffect } from 'react';
import { useIsMounted } from 'hooks/useIsMounted';
import { GLTFFileLoader, GLTFLoaderAnimationStartMode } from '@babylonjs/loaders';
import BoxModel from './PickaxeModel';
import DebugLayer from 'components/babylon/DebugLayer';

interface ItemSceneProps {
  pickaxeType: string | undefined,
  debug?: boolean
}

const PickaxeTypes: {[key: string]: string} = {
  '0': 'Cheap',
  '1': 'Good',
  '2': 'Great'
}

export default function BoxScene({ pickaxeType, debug }: ItemSceneProps) {
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

  useEffect(() => {
    if (!pickaxeType) return;
    alert(PickaxeTypes[pickaxeType])
  }, [pickaxeType])

  return (
    <>
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
            <BoxModel pickaxeType={pickaxeType} />
          </Suspense>

          {debug && <DebugLayer />}
        </Scene>
      </Engine>}
    </>
  )
}