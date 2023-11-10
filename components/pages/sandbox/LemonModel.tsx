import { Color4, CubeTexture, Vector3 } from '@babylonjs/core'
import { useOnMount } from 'hooks/useOnMount';
import { ILoadedModel, Model, useScene } from 'react-babylonjs'

export default function LemonModel() {
  const baseUrl = '/models/lemon/'
  const scene = useScene();

  useOnMount(() => {
    if (!scene) return;

    scene.clearColor = new Color4(0, 0, 0, 0);
    const hdrTexture = CubeTexture.CreateFromPrefilteredData(
      `/models/lemon/environmentSpecular.env`,
      scene
    );
    scene.environmentTexture = hdrTexture;
    scene.environmentTexture.level = 1;
  })

  const onLemonLoaded = (model: ILoadedModel): void => {
    if (!model.meshes || !model.animationGroups) {
      throw new Error('model.meshes not set')
    }
    //let lemon = model.meshes[0];

    const idleAnimation = model.animationGroups.find(
      (animation) => animation.name == 'Idle'
    );

    idleAnimation?.start(false, 1, 10, 10);
  }

  return (
    <Model
      name="Lemon"
      rootUrl={baseUrl}
      sceneFilename={`BTLMN_Lemon.gltf`}
      scaleToDimension={undefined}
      onModelLoaded={onLemonLoaded}
    />
  )
}