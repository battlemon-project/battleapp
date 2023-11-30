import { Engine, Scene, AbstractMesh, TransformNode, Vector3 } from '@babylonjs/core'
import { useOnMount } from 'hooks/useOnMount';
import { PropertiesType } from 'lemon';
import { Dispatch, PropsWithChildren, SetStateAction, useEffect, useRef, useState } from 'react';
import { ILoadedModel, Model, useEngine, useScene } from 'react-babylonjs'

interface LemonModelType {
  onModelReady?: (...args: any) => void
  properties: PropertiesType,
  setProperties?: Dispatch<SetStateAction<PropertiesType>>
}

export default function LemonModel({ children, properties, setProperties, onModelReady }: PropsWithChildren<LemonModelType>) {
  const lemonRef = useRef<ILoadedModel | null>(null)
  const [ lemonNodes, setLemonNodes ] = useState<(AbstractMesh | TransformNode)[]>()
  const baseUrl = '/models/lemon/'
  const engine = useEngine();
  const scene = useScene();

  useOnMount(() => {
    if (!scene) return;
  })

  const onLemonLoaded = (model: ILoadedModel): void => {
    if (!model.rootMesh || !model.animationGroups) {
      throw new Error('Model not loaded');
    }
    lemonRef.current = model;
    let nodes = [...model.rootMesh.getChildMeshes(), ...model.rootMesh.getChildTransformNodes()]
    setLemonNodes(nodes);
    const traitNames = Object.values(properties.traits);
    scene?.render();
    nodes.forEach((node) => {
      if (!traitNames.includes(node.name) && node.parent?.name == 'Armature') {
        node.setEnabled(false);
      } else if (!traitNames.includes(node.name) && node instanceof AbstractMesh && !node.name.startsWith(node.parent?.name || 'Just check parent')) {
        node.visibility = 0;
      }
    });
    scene?.render();
    const idleAnimation = model.animationGroups.find(
      (animation) => animation.name == 'Idle'
    );
    idleAnimation?.start(false, 1, 0, 0);
    if (onModelReady) {
      setTimeout(() => onModelReady({ engine, scene, properties, setProperties }))
    }
  }

  useEffect(() => {
    if (!lemonNodes || !engine || !scene) return;
    const propNames = Object.values(properties.traits);
    lemonNodes.forEach((node) => {
      if (propNames.includes(node.name)) {
        node.setEnabled(true)
      }
    });
    scene?.render();
    return () => {
      if (!lemonNodes) return;
      const propNames = Object.values(properties.traits);
      lemonNodes.forEach((node) => {
        if (propNames.includes(node.name)) {
          node.setEnabled(false)
        }
      });
    }
  }, [lemonNodes, properties.traits])


  useEffect(() => {
    return () => {
      lemonRef.current?.dispose();
    }
  }, [])

  return (<>
    <Model
      name="Lemon"
      rootUrl={baseUrl}
      sceneFilename={`BTLMN_Lemon.gltf`}
      scaleToDimension={undefined}
      onModelLoaded={onLemonLoaded}
      position={new Vector3(0,-1.15,0)}
      scaling={new Vector3(1.2,1.2,1.2)}
    />
    {lemonNodes && children}
  </>)
}