import { AbstractMesh, TransformNode, Vector3 } from '@babylonjs/core'
import { useOnMount } from 'hooks/useOnMount';
import { PropertiesType } from 'lemon';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { ILoadedModel, Model, useScene } from 'react-babylonjs'

export default function LemonModel({ children, properties }: PropsWithChildren<{ properties: PropertiesType }>) {
  const lemonRef = useRef<AbstractMesh | null>(null)
  const [ lemonNodes, setLemonNodes ] = useState<(AbstractMesh | TransformNode)[]>()
  const baseUrl = '/models/lemon/'
  const scene = useScene();

  useOnMount(() => {
    if (!scene) return;
  })

  const onLemonLoaded = (model: ILoadedModel): void => {
    if (!model.rootMesh || !model.animationGroups) {
      throw new Error('Model not loaded');
    }
    let lemon = model.rootMesh;
    lemonRef.current = lemon;
    let nodes = [...lemon.getChildMeshes(), ...lemon.getChildTransformNodes()]
    setLemonNodes(nodes);
    nodes.forEach((node) => {
      if (node.parent?.name == 'Armature') {
        node.setEnabled(false);
      } else if (node instanceof AbstractMesh && !node.name.startsWith(node.parent?.name || 'Just check parent')) {
        node.visibility = 0;
      }
    });

    const idleAnimation = model.animationGroups.find(
      (animation) => animation.name == 'Idle'
    );
    idleAnimation?.start(false, 1, 10, 10);
  }

  useEffect(() => {
    if (!lemonNodes) return;
    const propNames = Object.values(properties);
    lemonNodes.forEach((node) => {
      if (propNames.includes(node.name)) {
        node.setEnabled(true)
      }
    });
    return () => {
      if (!lemonNodes) return;
      const propNames = Object.values(properties);
      lemonNodes.forEach((node) => {
        if (propNames.includes(node.name)) {
          node.setEnabled(false)
        }
      });
    }
  }, [lemonNodes, properties])


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
      position={new Vector3(0,-1.2,0)}
    />
    {lemonNodes && children}
  </>)
}