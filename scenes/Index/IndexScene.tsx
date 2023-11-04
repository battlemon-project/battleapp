import { SceneLoader, Vector3 } from '@babylonjs/core'
import { Engine, Model, Scene } from 'react-babylonjs'
import IndexLogic from './IndexLogic';
import { type GLTFFileLoader, GLTFLoaderAnimationStartMode } from '@babylonjs/loaders';
import { Suspense } from 'react';

const BabylonScene = () => {
  SceneLoader.OnPluginActivatedObservable.add(function (loader) {
    (loader as GLTFFileLoader).animationStartMode = GLTFLoaderAnimationStartMode.ALL;
  });

  const baseUrl = '/models/index/'

  return (
    <div className="w-100 h-100 position-absolute">
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
            />
          </Suspense>
          <IndexLogic />
        </Scene>
      </Engine>
    </div>
  )
}

export default BabylonScene;