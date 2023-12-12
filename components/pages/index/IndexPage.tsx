import { SceneLoader, Vector3 } from '@babylonjs/core'
import { Engine, Model, Scene } from 'react-babylonjs'
import IndexScene from './IndexScene';
import { type GLTFFileLoader, GLTFLoaderAnimationStartMode } from '@babylonjs/loaders';
import { Suspense, useEffect, useState } from 'react';
import BattlemonLoader from 'components/layout/BattlemonLoader';
import { useOnMount } from 'hooks/useOnMount';
import useWindowSize from 'hooks/useWindowSize';

export default function BabylonScene() {
  const [isLoading, setIsLoading] = useState(true)
  const size = useWindowSize();
  const baseUrl = (process.env.NEXT_PUBLIC_ASSETS || '') + '/models/index/'

  useOnMount(() => {
    SceneLoader.OnPluginActivatedObservable.add(function (loader) {
      (loader as GLTFFileLoader).animationStartMode = GLTFLoaderAnimationStartMode.ALL;
    });
  })

  useEffect(() => {
    const canv: HTMLCanvasElement = document.querySelector('#babylon-canvas')!
    if (canv) {
      setTimeout(() => canv.width = size.width)
    }
  }, [size.width])

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