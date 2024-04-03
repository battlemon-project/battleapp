import { AnimationGroup, Nullable, Vector3 } from '@babylonjs/core';
import { BoxType, PrizeType, StatusType } from 'hooks/useBuyBox';
import { useEffect, useState } from 'react';
import { Box, ILoadedModel, Model, useScene } from 'react-babylonjs'

interface BoxModelProps { 
  name: string,
  box: BoxType | undefined,
  status: StatusType,
  prize: PrizeType | undefined,
  position: Vector3
}

export const framesByPrize: {[key in BoxType]: {[key in PrizeType]?: number}} = {
  [BoxType.Cheap]: {
    [PrizeType.Sticker]: 10,
    [PrizeType.SmallEthers]: 193,
    [PrizeType.SmallPoints]: 72,
    [PrizeType.CheapPickaxe]: 170,
  },
  [BoxType.Good]: {
    [PrizeType.Sticker]: 10,
    [PrizeType.SmallEthers]: 72,
    [PrizeType.MediumEthers]: 170,
    [PrizeType.SmallPoints]: 228,
    [PrizeType.MediumPoints]: 253,
    [PrizeType.GoodPickaxe]: 350,
    [PrizeType.Item]: 370,
  },
  [BoxType.Great]: {
    [PrizeType.Sticker]: 10,
    [PrizeType.MediumEthers]: 72,
    [PrizeType.MediumPoints]: 170,
    [PrizeType.LargePoints]: 191,
    [PrizeType.GreatPickaxe]: 285,
    [PrizeType.Item]: 310,
    [PrizeType.Lemon]: 372,
  },
  [BoxType.Battle]: {
    [PrizeType.SmallEthers]: 10,
    [PrizeType.Lemon]: 72,
    [PrizeType.SmallPoints]: 170,
    [PrizeType.MediumPoints]: 191,
    [PrizeType.Sticker]: 285,
    [PrizeType.CheapPickaxe]: 310
  }
}


export default function BoxModel({ name, box, status, prize, position }: BoxModelProps) {
  // Надо переписать всю логику анимаций, и выташить их в родительский компонент, т.к. этот компонент циклично ререндерится. Надо использовать useState в компоненте выше, проверять что этот компонент загружен и проверять статусы.
  const baseUrl = (false && process.env.NEXT_PUBLIC_ASSETS || '') + '/models/boxes/';
  const [ openAnimation, setOpenAnimation ] = useState<Nullable<AnimationGroup>>()
  const [ rollAnimation, setRollAnimation ] = useState<Nullable<AnimationGroup>>()
  const scene = useScene();

  const onBoxLoaded = (model: ILoadedModel): void => {
    if (!scene) return;
    const _openAnimation = model.animationGroups!.find(x => x.name === 'open');
    setOpenAnimation(_openAnimation)
    const _rollAnimation = model.animationGroups!.find(x => x.name === 'roll');
    setRollAnimation(_rollAnimation)
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined = undefined;
    if (box == BoxType.Cheap && !name.includes('Basket1')) {
      openAnimation?.reset().stop();
      rollAnimation?.reset().stop();
      return
    };
    if (box == BoxType.Good && !name.includes('Basket2')) {
      openAnimation?.reset().stop();
      rollAnimation?.reset().stop();
      return
    };
    if (box == BoxType.Great && !name.includes('Basket3')) {
      openAnimation?.reset().stop();
      rollAnimation?.reset().stop();
      return
    };
    if (box == BoxType.Battle && !name.includes('Basket_4')) {
      openAnimation?.reset().stop();
      rollAnimation?.reset().stop();
      return
    };

    if (status == 'loading') {
      openAnimation?.reset();
      rollAnimation?.reset();
    }
  
    const time = {
      [BoxType.Cheap]: 12300,
      [BoxType.Good]: 14800,
      [BoxType.Great]: 14800,
      [BoxType.Battle]: 14200,
    }

    if (status == 'process') {
      rollAnimation?.reset();
      openAnimation?.start(false, 1.2);
      timeout = setTimeout(() => {
        rollAnimation?.start(true, 1.2);
        console.log(rollAnimation)
      }, box ? time[box] : undefined)
    }    
  }, [status])

  useEffect(() => {
    if (!prize) return
    console.log(prize, box, name)
    if (box == BoxType.Cheap && !name.includes('Basket1')) return;
    if (box == BoxType.Good && !name.includes('Basket2')) return;
    if (box == BoxType.Great && !name.includes('Basket3')) return;
    if (box == BoxType.Battle && !name.includes('Basket_4')) return;

    rollAnimation?.stop()
    rollAnimation?.start(false, 1, framesByPrize[box!][prize], framesByPrize[box!][prize])
  }, [prize])

  return (
    <Model
      id={name}
      name={name}
      rootUrl={baseUrl}
      sceneFilename={`${name}.gltf`}
      scaleToDimension={undefined}
      position={position}
      onModelLoaded={onBoxLoaded}
    />
  )
}