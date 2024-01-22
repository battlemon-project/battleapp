import { AbstractMesh, AnimationGroup, Nullable, TransformNode, Vector3 } from '@babylonjs/core';
import { useEffect, useState } from 'react';
import { ILoadedModel, Model, useScene } from 'react-babylonjs'

interface PickaxeModelProps { 
  pickaxeType: number
}

export default function BoxModel({ pickaxeType }: PickaxeModelProps) {
  const baseUrl = (false && process.env.NEXT_PUBLIC_ASSETS || '') + '/models/mining/';
  const [ pickaxes, setPickaxes ] = useState<TransformNode[]>()
  const [ placeholderGem, setPlaceholderGem] = useState<AbstractMesh>()
  const [ miningAnimation, setMiningAnimation] = useState<Nullable<AnimationGroup>>()
  const [ gemAppearAnimation, setGemAppearAnimation] = useState<Nullable<AnimationGroup>>()
  const [ happyLemonAnimation, setHappyLemonAnimation] = useState<Nullable<AnimationGroup>>()
  const [ sadLemonAnimation, setSadLemonAnimation] = useState<Nullable<AnimationGroup>>()
  const [ sharpingAnimation, setSharpingAnimation] = useState<Nullable<AnimationGroup>>()
  const scene = useScene();

  const onPickaxeLoaded = (model: ILoadedModel): void => {
    if (!scene) return;
    const idleAnimation = scene.getAnimationGroupByName('Idle');
    idleAnimation?.start(true, 1);
    const _pickaxes: TransformNode[] = [
      scene.getTransformNodeByName('IcePick_Yellow') as TransformNode,
      scene.getTransformNodeByName('IcePick_Blue') as TransformNode,
      scene.getTransformNodeByName('IcePick_Purple') as TransformNode,
    ]
    _pickaxes.forEach(pa => pa.setEnabled(false))
    setPickaxes(_pickaxes);
    const _placeholderGem = scene.getMeshByName('placeholder_gem');
    if (_placeholderGem)  {
      _placeholderGem.visibility = 0;
      setPlaceholderGem(_placeholderGem)
    }
    const _miningAnimation = scene.getAnimationGroupByName('Mining');
    setMiningAnimation(_miningAnimation)
    const _gemAppearAnimation = scene.getAnimationGroupByName('GemAppear');
    setGemAppearAnimation(_gemAppearAnimation)
    const _happyLemonAnimation = scene.getAnimationGroupByName('HappyLemon');
    setHappyLemonAnimation(_happyLemonAnimation)
    const _sadLemonAnimation = scene.getAnimationGroupByName('SadLemon');
    setSadLemonAnimation(_sadLemonAnimation)
    const _sharpingAnimation = scene.getAnimationGroupByName('Sharping');
    _sharpingAnimation?.start(false, 1, 240, 241);
    setSharpingAnimation(_sharpingAnimation)
  }

  useEffect(() => {
    if (!pickaxes) return;
    pickaxes[pickaxeType].setEnabled(true);
    return () => {
      pickaxes[pickaxeType].setEnabled(false);
    }
  }, [pickaxeType])

  return (
    <Model
      id={'BTLMN_Lemon_Mining'}
      name={'BTLMN_Lemon_Mining'}
      rootUrl={baseUrl}
      sceneFilename={`BTLMN_Lemon_Mining.gltf`}
      scaleToDimension={undefined}
      onModelLoaded={onPickaxeLoaded}
    />
  )
}