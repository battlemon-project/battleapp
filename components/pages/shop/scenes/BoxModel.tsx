import { AnimationGroup, Nullable } from '@babylonjs/core';
import { BoxType, PrizeType, StatusType } from 'hooks/useBuyBox';
import { useEffect, useState } from 'react';
import { ILoadedModel, Model, useScene } from 'react-babylonjs'

interface BoxModelProps { 
  name: string,
  box: BoxType | undefined,
  status: StatusType,
  prize: PrizeType | undefined
}

const framesByPrize: {[key in PrizeType]?: number} = {
  [PrizeType.Sticker]: 275,
  [PrizeType.CheapPickaxe]: 128,
  [PrizeType.GoodPickaxe]: 128,
  [PrizeType.GreatPickaxe]: 128
}

export default function BoxModel({ name, box, status, prize }: BoxModelProps) {
  // Надо переписать всю логику анимаций, и выташить их в родительский компонент, т.к. этот компонент циклично ререндерится. Надо использовать useState в компоненте выше, проверять что этот компонент загружен и проверять статусы.
  const baseUrl = (false && process.env.NEXT_PUBLIC_ASSETS || '') + '/models/boxes/';
  const [ openAnimation, setOpenAnimation ] = useState<Nullable<AnimationGroup>>()
  const [ rollAnimation, setRollAnimation ] = useState<Nullable<AnimationGroup>>()
  const scene = useScene();

  const onBoxLoaded = (model: ILoadedModel): void => {
    if (!scene) return;
    const _openAnimation = scene.getAnimationGroupByName('open');
    setOpenAnimation(_openAnimation)
    const _rollAnimation = scene.getAnimationGroupByName('roll_01');
    setRollAnimation(_rollAnimation)

    _openAnimation?.onAnimationEndObservable.add(function () {
      if (!_rollAnimation?.isStarted) {
        _rollAnimation?.start(true, 1);
      }
    });
  }
  
  if (status == 'loading') {
    openAnimation?.goToFrame(0);
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

  return (
    <Model
      id={name}
      name={name}
      rootUrl={baseUrl}
      sceneFilename={`${name}.gltf`}
      scaleToDimension={undefined}
      onModelLoaded={onBoxLoaded}
    />
  )
}