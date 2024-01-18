import { AnimationGroup, Nullable } from '@babylonjs/core';
import { BoxType, PrizeType, StatusType } from 'hooks/useBuyBox';
import { useEffect, useState } from 'react';
import { ILoadedModel, Model, useScene } from 'react-babylonjs'

interface BoxModelProps { 
  name: string
}

export default function BoxModel({ name }: BoxModelProps) {
  // Надо переписать всю логику анимаций, и выташить их в родительский компонент, т.к. этот компонент циклично ререндерится. Надо использовать useState в компоненте выше, проверять что этот компонент загружен и проверять статусы.
  const baseUrl = (false && process.env.NEXT_PUBLIC_ASSETS || '') + '/models/boxes/';


  return (

  )
}