
import { Scene as BabylonScene, Color4, Vector3, CubeTexture, SceneLoader, AnimationGroup, Nullable } from '@babylonjs/core'
import { Engine, ILoadedModel, Model, Scene } from 'react-babylonjs'
import '@babylonjs/loaders';
import { Suspense, useEffect, useState } from 'react';
import { useIsMounted } from 'hooks/useIsMounted';
import { GLTFFileLoader, GLTFLoaderAnimationStartMode } from '@babylonjs/loaders';
import { useBoxStore } from '../store/boxStore';
import DebugLayer from 'components/babylon/DebugLayer';
import { PrizeType } from 'hooks/useBuyBox';
import { xdc } from 'viem/chains';

interface ItemSceneProps {
  name: string,
  debug?: boolean
}

const framesByPrize: {[key in PrizeType]?: number} = {
  [PrizeType.Sticker]: 74,
  [PrizeType.SmallMatic]: 90,
  [PrizeType.MediumMatic]: 90,
  [PrizeType.LargeMatic]: 90,
  [PrizeType.SmallPoints]: 90,
  [PrizeType.MediumPoints]: 90,
  [PrizeType.PointsItem]: 90,
  [PrizeType.PointsLemon]: 90,
  [PrizeType.Hoodie]: 170,
  [PrizeType.Shirt]: 170,
  [PrizeType.Cap]: 170,
  [PrizeType.CheapPickaxe]: 128,
  [PrizeType.GoodPickaxe]: 128,
  [PrizeType.GreatPickaxe]: 128,
  [PrizeType.Item]: 10,
  [PrizeType.Lemon]: 10
}

export default function BoxScene({ name, debug }: ItemSceneProps) {
  const baseUrl = (false && process.env.NEXT_PUBLIC_ASSETS || '') + '/models/boxes/';
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

  const [ openAnimation, setOpenAnimation ] = useState<Nullable<AnimationGroup>>()
  const [ rollAnimation, setRollAnimation ] = useState<Nullable<AnimationGroup>>()
  const [ openIsEnd, setOpenIsEnd ] = useState<boolean>(false)

  const onBoxLoaded = (model: ILoadedModel): void => {
    const _openAnimation = model.animationGroups!.find(g => g.name == 'open');
    setOpenAnimation(_openAnimation)
    const _rollAnimation = model.animationGroups!.find(g => g.name == 'roll_01');
    setRollAnimation(_rollAnimation)

    // _openAnimation?.onAnimationEndObservable.add(function () {
    //   setOpenIsEnd(true)
    // });
  }
  
  if (status == 'loading') {
    openAnimation?.reset();
    rollAnimation?.reset();
  }

  if (status == 'process') {
    rollAnimation?.reset();
    openAnimation?.start(false, 1);
  }

  if (status == 'success') {
    openAnimation?.goToFrame(408);
    rollAnimation?.stop()
    rollAnimation?.start(false, 1, framesByPrize[prize!], framesByPrize[prize!]) 
  }

  useEffect(() => {
    if (status == 'process') {
      rollAnimation?.start(true, 1);
    }
  }, [status])

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
            <Model
              id={name}
              name={name}
              rootUrl={baseUrl}
              sceneFilename={`${name}.gltf`}
              scaleToDimension={undefined}
              onModelLoaded={onBoxLoaded}
            />
          </Suspense>

          {debug && <DebugLayer />}
        </Scene>
      </Engine>}
    </>
  )
}