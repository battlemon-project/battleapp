import { ILoadedModel, Model, useScene } from 'react-babylonjs'

interface PickaxeModelProps { 
  pickaxeType: string | undefined
}

export default function BoxModel({ pickaxeType }: PickaxeModelProps) {
  const baseUrl = (false && process.env.NEXT_PUBLIC_ASSETS || '') + '/models/boxes/';
  const scene = useScene();

  const onPickaxeLoaded = (model: ILoadedModel): void => {
    if (!scene) return;
  }

  return (
    <Model
      id={'Lemon_Mining'}
      name={'Lemon_Mining'}
      rootUrl={baseUrl}
      sceneFilename={`Basket_Chests_LP_oneReward.gltf`}
      scaleToDimension={undefined}
      onModelLoaded={onPickaxeLoaded}
    />
  )
}