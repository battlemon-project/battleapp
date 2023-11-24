// tutorial about context https://www.johno.com/using-react-context-with-a-custom-hook
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";
import React, { useContext } from 'react'
import { useLemons as useLemonsHook } from "hooks/useLemons";
import { NftMetaData, PropertiesType } from "lemon";
import { getRandomTraits } from "utils/properties";

const defaultTraits: PropertiesType = {
  eyes: 'Eyes_Ghost',
  exo_top: 'ExoTop_Ghost',
  exo_bot: 'ExoBot_Ghost',
  feet: 'Feet_Ghost',
  hands: 'Hands_Ghost',
  head: 'Head_Ghost',
}

interface LemonsContextProps {
  useLemons: ReturnType<typeof useLemonsHook>,
  traits: PropertiesType
  setTraits: Dispatch<SetStateAction<PropertiesType>>
  items: PropertiesType
  setItems: Dispatch<SetStateAction<PropertiesType>>
  selectedLemon: NftMetaData | undefined
  setSelectedLemon: Dispatch<SetStateAction<NftMetaData | undefined>>
  clickToLemon: (token: NftMetaData) => () => void
}

const LemonsContext = 
  createContext<LemonsContextProps | undefined>(undefined)

export const LemonsProvider = ({ children }: PropsWithChildren) => {
  const useLemons = useLemonsHook()
  const [traits, setTraits] = useState<PropertiesType>(defaultTraits)
  const [items, setItems] = useState<PropertiesType>({})
  const [selectedLemon, setSelectedLemon] = useState<NftMetaData>()

  const clickToLemon = (token: NftMetaData) => ()  => {
    setSelectedLemon(token)
    setTraits(getRandomTraits())
  }

  const value = {
    useLemons, 
    traits, 
    setTraits, 
    items, 
    setItems, 
    selectedLemon, 
    setSelectedLemon, 
    clickToLemon
  }

  return (
    <LemonsContext.Provider value={value}>
      {children}
    </LemonsContext.Provider>
  )
}

export const useLemonsContext = () => {
  const lemonsContext = useContext(LemonsContext)
  if (lemonsContext === undefined) {
    throw new Error('Used outside of LemonsContext')
  }
  const {
    useLemons, 
    traits, 
    setTraits, 
    items, 
    setItems, 
    selectedLemon, 
    setSelectedLemon, 
    clickToLemon
  } = lemonsContext
  return {
    ...useLemons, 
    traits, 
    setTraits, 
    items, 
    setItems, 
    selectedLemon, 
    setSelectedLemon, 
    clickToLemon
  }
}