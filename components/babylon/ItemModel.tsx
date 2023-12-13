import { AbstractMesh } from '@babylonjs/core';
import { useEffect, useRef } from 'react';
import { ILoadedModel, Model, useScene } from 'react-babylonjs'

interface ItemModelProps { 
  name: string,
  placeholderName: string
  enabled: boolean
}

export default function ItemModel({ name, placeholderName, enabled }: ItemModelProps) {
  const itemRef = useRef<AbstractMesh | null>(null)
  const baseUrl = (false && process.env.NEXT_PUBLIC_ASSETS || '') + '/models/items/'
  const scene = useScene();

  const onItemLoaded = (model: ILoadedModel): void => {
    if (!model.rootMesh) {
      throw new Error('Model not loaded');
    }
    scene?.render()
    model.rootMesh.setEnabled(enabled);
    scene?.render()
    itemRef.current = model.rootMesh
    if (placeholderName) {
      const placeholder = scene?.getNodeById('placeholder_' + placeholderName)!
      model.rootMesh.parent = placeholder;
    }
  }

  useEffect(() => {
    if (!itemRef.current) return
    itemRef.current.setEnabled(enabled);
    scene?.render();
  }, [enabled])

  return (
    <Model
      id={name}
      name={name}
      rootUrl={baseUrl}
      sceneFilename={`${name}.gltf?hash=004`}
      scaleToDimension={undefined}
      onModelLoaded={onItemLoaded}
    />
  )
}