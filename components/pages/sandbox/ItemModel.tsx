import { AbstractMesh } from '@babylonjs/core';
import { useEffect, useRef } from 'react';
import { ILoadedModel, Model, useScene } from 'react-babylonjs'

export default function ItemModel({ name, placeholderName }: { name: string, placeholderName?: string }) {
  const itemRef = useRef<AbstractMesh | null>(null)
  const baseUrl = '/models/items/'
  const scene = useScene();

  const onItemLoaded = (model: ILoadedModel): void => {
    if (!model.rootMesh) {
      throw new Error('Model not loaded');
    }
    itemRef.current = model.rootMesh
    if (placeholderName) {
      const placeholder = scene?.getNodeById('placeholder_' + placeholderName)!
      itemRef.current.parent = placeholder;
    }
  }

  useEffect(() => {
    return () => {
      itemRef.current?.dispose();
    }
  }, [])

  return (
    <Model
      id={name}
      name={name}
      rootUrl={baseUrl}
      sceneFilename={`${name}.gltf`}
      scaleToDimension={undefined}
      onModelLoaded={onItemLoaded}
    />
  )
}