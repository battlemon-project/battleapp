
import { Engine as BabylonEngine, Scene as BabylonScene, Color4, SceneLoader, Vector3, CubeTexture } from '@babylonjs/core'
import { Engine, Scene } from 'react-babylonjs'
import { type GLTFFileLoader, GLTFLoaderAnimationStartMode } from '@babylonjs/loaders';
import { Dispatch, Fragment, SetStateAction, Suspense, useEffect, useState } from 'react';
import LemonModel from 'components/babylon/LemonModel';
import ItemModel from 'components/babylon/ItemModel';
import { useIsMounted } from 'hooks/useIsMounted';
import { PropertiesType } from 'lemon';

interface SanboxPageType {
  properties: PropertiesType
  items: PropertiesType
  isPaused?: boolean
  onModelReady?: (
    engine: BabylonEngine, 
    scene: BabylonScene,
    properties: PropertiesType,
    setProperties?: Dispatch<SetStateAction<PropertiesType>>
  ) => void
  setProperties?: Dispatch<SetStateAction<PropertiesType>>
}

export default function SanboxPage({ properties, items, isPaused, setProperties, onModelReady }: SanboxPageType) {
  const [ visibleProperties, setVisibleProperties ] = useState<PropertiesType>(properties)
  const mounted = useIsMounted()
  
  useEffect(() => {
    const props = {...properties};
    if (items.cap) {
      delete props.hair;
    }
    if (items.shoes) {
      delete props.feet;
    }
    setVisibleProperties(props);
  }, [properties, items])
  
  const onSceneMount = ({ scene }: {scene: BabylonScene}) => {
    if (!scene) return;
    SceneLoader.OnPluginActivatedObservable.add(function (loader) {
      (loader as GLTFFileLoader).animationStartMode = GLTFLoaderAnimationStartMode.NONE;
    });

    scene.clearColor = new Color4(0, 0, 0, 0);
    const hdrTexture = CubeTexture.CreateFromPrefilteredData(
      `/models/lemon/environmentSpecular.env`,
      scene
    );
    scene.environmentTexture = hdrTexture;
    scene.environmentTexture.level = 1;
  }

  return (
    <>
      {mounted && <Engine antialias canvasId="lemon-canvas" isPaused={isPaused}>
        <Scene onSceneMount={onSceneMount}>
          <arcRotateCamera
            name='camera1' 
            alpha={1.35} 
            lowerAlphaLimit={isPaused ? 1.35 : undefined}
            upperAlphaLimit={isPaused ? 1.35 : undefined}
            beta={1.6} 
            lowerBetaLimit={1.6}
            upperBetaLimit={1.6}
            radius={4} 
            lowerRadiusLimit={4}
            upperRadiusLimit={4}
            target={new Vector3(0,0,0)}
            minZ={1}
          />

          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={new Vector3(0, 1, 0)}
          />
          
          <Suspense>
            <LemonModel properties={visibleProperties} onModelReady={onModelReady} setProperties={setProperties}>
              {Object.entries(items).map(([placeholderName, itemName]) => {
                if (!itemName) return <Fragment key={placeholderName + 'none'}></Fragment>;
                if (placeholderName == 'shoes') {
                  return <Fragment key={placeholderName + itemName}>
                    <ItemModel 
                      name={itemName+'_L'}
                      placeholderName={placeholderName+'_r'}
                    />
                    <ItemModel 
                      name={itemName+'_R'}
                      placeholderName={placeholderName+'_l'}
                    />
                  </Fragment>
                }
                return <Fragment key={placeholderName + itemName}>
                  <ItemModel
                    name={itemName}
                    placeholderName={placeholderName}
                  />
                </Fragment>
              })}
            </LemonModel>
          </Suspense>

          {/* <DebugLayer /> */}
        </Scene>
      </Engine>}
    </>
  )
}