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
  setGemRank: (gemRank: number | undefined) => void
  repairStatus: StatusType
}

export default function PickaxeModel({ pickaxeType, miningStatus, selectedPickaxe, gemRank, setGemRank, repairStatus }: PickaxeModelProps) {
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
      scene.getNodeByName('Gem_01') as Mesh,
      scene.getNodeByName('Gem_02') as Mesh,
      scene.getNodeByName('Gem_03') as Mesh,
      scene.getNodeByName('Gem_04') as Mesh,
      scene.getNodeByName('Gem_05') as Mesh,
      scene.getNodeByName('Gem_06') as Mesh,
      scene.getNodeByName('Gem_07') as Mesh,
      scene.getNodeByName('Gem_08') as Mesh,
      scene.getNodeByName('Gem_09') as Mesh,
      scene.getNodeByName('Gem_10') as Mesh,
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
    gems?.forEach((gem, index) => {
      if (!gem) return;
      if (index !== rank) gem.setEnabled(false)
    });
    if (rank < 0 || !gems?.[rank]) return;
    gems[rank].setEnabled(true)
  };

  useEffect(() => {
    console.log('test 3')
    if (!pickaxes) return;
    pickaxes[pickaxeType].setEnabled(true);
    return () => {
      pickaxes[pickaxeType].setEnabled(false);
    }
  }, [pickaxeType])

  useEffect(() => {
    console.log('test 2')
    if (miningStatus == 'process') {
      miningAnimation?.start(true, 1);
      showGem(-1);
    }
    if (miningStatus == 'error') {
      showGem(-1);
      scene?.stopAllAnimations();
      sadLemonAnimation?.start(true, 1);
    }
  }, [miningStatus])

  useEffect(() => {
    console.log('test 1')
    if (miningStatus == 'success' && gemRank !== undefined) {
      if (gemRank >= 0) showGem(gemRank);
      scene?.stopAllAnimations();
      gemAppearAnimation?.start(false, 1);
      happyLemonAnimation?.start(true, 1);
      setGemRank(undefined);
    }
  }, [gemRank])

  useEffect(() => {
    scene?.stopAllAnimations();
    idleAnimation?.start(true, 1);
    showGem(-1)
  }, [selectedPickaxe?.tokenId])

  
  useEffect(() => {
    scene?.stopAllAnimations();
    idleAnimation?.start(true, 1);
    showGem(-1)
  }, [selectedPickaxe?.tokenId])

  useEffect(() => {
    if (repairStatus == 'process') {
      scene?.stopAllAnimations();
      sharpingAnimation?.start(true, 1);
    }
    if (repairStatus == 'success') {
      scene?.stopAllAnimations();
      idleAnimation?.start(true, 1);
    }
  }, [repairStatus])

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