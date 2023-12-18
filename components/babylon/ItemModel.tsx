import { AbstractMesh, Vector3 } from '@babylonjs/core';
import { useEffect, useRef } from 'react';
import { ILoadedModel, Model, useScene } from 'react-babylonjs'

interface ItemModelProps { 
  onModelReady?: (...args: any) => void
  name: string,
  placeholderName?: string
  enabled: boolean
  positionX?: number
}

export default function ItemModel({ name, placeholderName, enabled, positionX, onModelReady }: ItemModelProps) {
  const itemRef = useRef<AbstractMesh | null>(null)
  const baseUrl = (false && process.env.NEXT_PUBLIC_ASSETS || '') + '/models/items/'
  const scene = useScene();

  const onItemLoaded = (model: ILoadedModel): void => {
    if (!model.rootMesh) {
      throw new Error('Model not loaded');
    }
    scene?.render()
    model.rootMesh.position = new Vector3(positionX || 0, 0, 0)
    model.rootMesh.setEnabled(enabled);
    scene?.render()
    itemRef.current = model.rootMesh
    if (placeholderName) {
      const placeholder = scene?.getNodeById('placeholder_' + placeholderName)!
      model.rootMesh.parent = placeholder;
    }
    if (onModelReady) {
      setTimeout(() => onModelReady())
    }
  }

  useEffect(() => {
    if (!itemRef.current) return
    itemRef.current.setEnabled(enabled);
    scene?.render();
  }, [enabled])

  useEffect(() => {
    return () => {
      itemRef.current?.dispose()
    }
  }, [])

  return (
    <Model
      id={name}
      name={name}
      rootUrl={baseUrl}
      sceneFilename={`${name}.gltf?hash=005`}
      scaleToDimension={undefined}
      onModelLoaded={onItemLoaded}
    />
  )
}