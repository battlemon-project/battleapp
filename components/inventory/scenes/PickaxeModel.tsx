import { AbstractMesh, AnimationGroup, Mesh, Nullable, TransformNode, Vector3 } from '@babylonjs/core';
import { StatusType } from 'hooks/useBuyBox';
import { NftMetaData } from 'lemon';
import { useEffect, useState } from 'react';
import { ILoadedModel, Model, useScene } from 'react-babylonjs'

interface PickaxeModelProps { 
  pickaxeType: number
  miningStatus: StatusType
  selectedPickaxe: NftMetaData | undefined
  gemRank: number | undefined
}

export default function BoxModel({ pickaxeType, miningStatus, selectedPickaxe, gemRank }: PickaxeModelProps) {
  const baseUrl = (false && process.env.NEXT_PUBLIC_ASSETS || '') + '/models/mining/';
  const [ pickaxes, setPickaxes ] = useState<TransformNode[]>()
  const [ gems, setGems ] = useState<Mesh[]>()
  const [ placeholderGem, setPlaceholderGem] = useState<AbstractMesh>()
  const [ idleAnimation, setIdleAnimation] = useState<Nullable<AnimationGroup>>()
  const [ miningAnimation, setMiningAnimation] = useState<Nullable<AnimationGroup>>()
  const [ gemAppearAnimation, setGemAppearAnimation] = useState<Nullable<AnimationGroup>>()
  const [ happyLemonAnimation, setHappyLemonAnimation] = useState<Nullable<AnimationGroup>>()
  const [ sadLemonAnimation, setSadLemonAnimation] = useState<Nullable<AnimationGroup>>()
  const [ sharpingAnimation, setSharpingAnimation] = useState<Nullable<AnimationGroup>>()
  const scene = useScene();

  const onPickaxeLoaded = (model: ILoadedModel): void => {
    if (!scene) return;
    const _idleAnimation = scene.getAnimationGroupByName('Idle');
    _idleAnimation?.start(true, 1);
    setIdleAnimation(_idleAnimation)
    const _pickaxes: TransformNode[] = [
      scene.getTransformNodeByName('IcePick_Yellow') as TransformNode,
      scene.getTransformNodeByName('IcePick_Blue') as TransformNode,
      scene.getTransformNodeByName('IcePick_Purple') as TransformNode,
    ]
    _pickaxes.forEach(pa => pa.setEnabled(false))
    setPickaxes(_pickaxes);

    const _gems: Mesh[] = [
      scene.getMeshByName('Gem_01') as Mesh,
      scene.getMeshByName('Gem_02') as Mesh,
      scene.getMeshByName('Gem_03') as Mesh,
      scene.getMeshByName('Gem_04') as Mesh,
      scene.getMeshByName('Gem_05') as Mesh,
      scene.getMeshByName('Gem_06') as Mesh,
      scene.getMeshByName('Gem_07') as Mesh,
      scene.getMeshByName('Gem_08') as Mesh,
      scene.getMeshByName('Gem_09') as Mesh,
      scene.getMeshByName('Gem_10') as Mesh,
    ];
    _gems.forEach(gem => gem.setEnabled(false))
    setGems(_gems);

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

  const showGem = (rank: number) => {
    rank = rank - 1;
    gems?.forEach((gem, index) => {
      if (!gem) return;
      if (index !== rank) gem.setEnabled(false)
    });
    if (rank < 0 || !gems?.[rank]) return;
    gems[rank].setEnabled(true)
  };

  useEffect(() => {
    if (!pickaxes) return;
    pickaxes[pickaxeType].setEnabled(true);
    return () => {
      pickaxes[pickaxeType].setEnabled(false);
    }
  }, [pickaxeType])

  useEffect(() => {
    if (miningStatus == 'process') {
      miningAnimation?.start(true, 1);
      showGem(-1);
    }
  }, [miningStatus])

  useEffect(() => {
    if (miningStatus == 'success') {
      if (gemRank && gemRank >= 0) showGem(gemRank);
      console.log(gemRank)
      miningAnimation?.reset();
      miningAnimation?.stop();
      gemAppearAnimation?.start(false, 1);
      happyLemonAnimation?.start(true, 1);
    }
  }, [gemRank])

  useEffect(() => {
    scene?.stopAllAnimations();
    idleAnimation?.start(true, 1);
    showGem(-1)
  }, [selectedPickaxe?.tokenId])

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