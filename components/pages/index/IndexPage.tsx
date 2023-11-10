import { SceneLoader, Vector3 } from '@babylonjs/core'
import { Engine, Model, Scene } from 'react-babylonjs'
import IndexScene from './IndexScene';
import { type GLTFFileLoader, GLTFLoaderAnimationStartMode } from '@babylonjs/loaders';
import { Suspense, useState } from 'react';
import BattlemonLoader from 'components/layout/BattlemonLoader';
import { useOnMount } from 'hooks/useOnMount';

export default function BabylonScene() {
  const [isLoading, setIsLoading] = useState(true)

  const baseUrl = '/models/index/'

  useOnMount(() => {
    SceneLoader.OnPluginActivatedObservable.add(function (loader) {
      (loader as GLTFFileLoader).animationStartMode = GLTFLoaderAnimationStartMode.ALL;
    });
  })

  return (
    <div className='vh-100'>
      {isLoading && <BattlemonLoader />}
      <Engine antialias canvasId="babylon-canvas">
        <Scene>
          <freeCamera
            name="camera1"
            fov={0.5}
            position={new Vector3(0, 5, 90)}
            setTarget={[new Vector3(0, 5, 0)]}
            fovMode={0}
          />

          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={new Vector3(0, 1, 0)}
          />
          
          <Suspense>
            <Model
              name="City"
              rootUrl={baseUrl}
              sceneFilename={`MainMenu_Stripes_Export.glb`}
              scaleToDimension={undefined}
              onModelLoaded={() => setIsLoading(false)}
            />
          </Suspense>
          <IndexScene />
        </Scene>
      </Engine>
    </div>
  )
}