
import { Scene as BabylonScene, Color4, Vector3, CubeTexture } from '@babylonjs/core'
import { Engine, Scene } from 'react-babylonjs'
import '@babylonjs/loaders';
import { Dispatch, Fragment, SetStateAction, Suspense, useEffect, useState } from 'react';
import ItemModel from './ItemModel';
import { useIsMounted } from 'hooks/useIsMounted';

interface ItemSceneProps {
  name: string
  onModelReady?: (...args: any) => void
}

export default function ItemScene({ name, onModelReady }: ItemSceneProps) {
  const mounted = useIsMounted()

  const onSceneMount = ({ scene }: {scene: BabylonScene}) => {
    if (!scene) return;

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
      {mounted && <Engine antialias canvasId="item-canvas">
        <Scene onSceneMount={onSceneMount}>
          <arcRotateCamera
            name='item-camera' 
            alpha={1.35} 
            beta={1.2}
            radius={2.8} 
            lowerRadiusLimit={2.8}
            upperRadiusLimit={2.8}
            target={new Vector3(0,0,0)}
            minZ={1}
          />

          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={new Vector3(0, 1, 0)}
          />
          
          <Suspense>
            { name.startsWith('Shoes_') ? <>
              <ItemModel
                key={name + '_L'}
                onModelReady={onModelReady}
                name={name + '_L'}
                enabled={true}
                positionX={-0.2}
              />
              <ItemModel
                key={name + '_R'}
                onModelReady={onModelReady}
                name={name + '_R'}
                enabled={true}
                positionX={0.2}
              />
            </> : <>
              <ItemModel
                key={name}
                onModelReady={onModelReady}
                name={name}
                enabled={true}
                positionX={0}
              />
            </>}
          </Suspense>
        </Scene>
      </Engine>}
    </>
  )
}