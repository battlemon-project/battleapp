import { SceneLoader, Vector3 } from '@babylonjs/core'
import { Engine, Scene, useScene } from 'react-babylonjs'
import { type GLTFFileLoader, GLTFLoaderAnimationStartMode } from '@babylonjs/loaders';
import { Suspense } from 'react';
import LemonModel from './LemonModel';
import { useOnMount } from 'hooks/useOnMount';

export default function SanboxPage() {
  
  useOnMount(() => {
    SceneLoader.OnPluginActivatedObservable.add(function (loader) {
      (loader as GLTFFileLoader).animationStartMode = GLTFLoaderAnimationStartMode.NONE;
    });
  })

  return (
    <div style={{width: '512px', height: '512px'}}>
      <Engine antialias canvasId="lemon-canvas">
        <Scene>
          <arcRotateCamera
            name='camera1' 
            alpha={Math.PI / 2.3} 
            beta={Math.PI / 1.9} 
            radius={4} 
            lowerRadiusLimit={4}
            upperRadiusLimit={4}
            lowerBetaLimit={1.6}
            upperBetaLimit={1.6}
            target={new Vector3(0,1.2,0)} 
            
            minZ={1}
          />

          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={new Vector3(0, 1, 0)}
          />
          
          <Suspense>
            <LemonModel />
          </Suspense>

          {/* <DebugLayer /> */}
        </Scene>
      </Engine>
    </div>
  )
}