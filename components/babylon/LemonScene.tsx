
import { Scene as BabylonScene, Color4, SceneLoader, Vector3, CubeTexture } from '@babylonjs/core'
import { Engine, Scene } from 'react-babylonjs'
import { type GLTFFileLoader, GLTFLoaderAnimationStartMode } from '@babylonjs/loaders';
import { Dispatch, Fragment, SetStateAction, Suspense, useEffect, useState } from 'react';
import LemonModel from './LemonModel';
import ItemModel from './ItemModel';
import { useIsMounted } from 'hooks/useIsMounted';
import { c1Items } from 'utils/properties';
import { PropertiesList, PropertiesType } from 'lemon';

interface SanboxPageProps {
  properties: PropertiesType
  isPaused?: boolean,
  preloadItems?: boolean,
  onModelReady?: (...args: any) => void
  setProperties?: Dispatch<SetStateAction<PropertiesType>>
}

export default function SanboxPage({ properties, isPaused, preloadItems, setProperties, onModelReady }: SanboxPageProps) {
  const [ visibleProperties, setVisibleProperties ] = useState<PropertiesType>(properties)
  const [ loadedItems, setLoadedItems ] = useState<PropertiesList>({})
  const mounted = useIsMounted()
  
  useEffect(() => {
    const props: PropertiesType = structuredClone(properties);
    if (properties.items.cap) {
      delete props.traits.hair;
    }
    if (properties.items.shoes) {
      delete props.traits.feet;
    }
    setVisibleProperties(props);

    const newLoadedItems = {...loadedItems}
    Object.entries(properties.items).forEach(([key, val]) => {
      newLoadedItems[key] = newLoadedItems[key] || [];
      if (val && !newLoadedItems[key].includes(val)) {
        newLoadedItems[key].push(val);
      }
    })
    setLoadedItems(newLoadedItems)
  }, [properties])
  
  const onSceneMount = ({ scene }: {scene: BabylonScene}) => {
    if (!scene) return;
    SceneLoader.OnPluginActivatedObservable.add(function (loader) {
      (loader as GLTFFileLoader).animationStartMode = GLTFLoaderAnimationStartMode.NONE;
    });

    scene.clearColor = new Color4(0, 0, 0, 0);
    const hdrTexture = CubeTexture.CreateFromPrefilteredData(
      (process.env.NEXT_PUBLIC_ASSETS || '') + `/models/lemon/environmentSpecular.env`,
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
              {Object.entries(preloadItems ? c1Items : loadedItems).map(([placeholderName, itemNames]) => {
                return itemNames.map(itemName => {
                  //if (!itemName) return <Fragment key={placeholderName + 'none'}></Fragment>;
                  if (placeholderName == 'shoes') {
                    return <Fragment key={placeholderName + itemName}>
                      <ItemModel 
                        name={itemName+'_L'}
                        placeholderName={placeholderName+'_r'}
                        enabled={properties.items[placeholderName] === itemName}
                      />
                      <ItemModel 
                        name={itemName+'_R'}
                        placeholderName={placeholderName+'_l'}
                        enabled={properties.items[placeholderName] === itemName}
                      />
                    </Fragment>
                  }
                  return <Fragment key={placeholderName + itemName}>
                    <ItemModel
                      name={itemName}
                      placeholderName={placeholderName}
                      enabled={properties.items[placeholderName] === itemName}
                    />
                  </Fragment>
                })
              })}
            </LemonModel>
          </Suspense>

          {/* <DebugLayer /> */}
        </Scene>
      </Engine>}
    </>
  )
}