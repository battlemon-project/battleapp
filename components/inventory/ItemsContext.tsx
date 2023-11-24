// tutorial about context https://www.johno.com/using-react-context-with-a-custom-hook
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";
import React, { useContext } from 'react'
import { useItems as useItemsHook } from "hooks/useItems";
import { NftMetaData, PropertiesType } from "lemon";

interface ItemsContextProps {
  useItems: ReturnType<typeof useItemsHook>,
  selectedItem: NftMetaData | undefined
  setSelectedItem: Dispatch<SetStateAction<NftMetaData | undefined>>
  clickToItem: (token: NftMetaData) => () => void
}

const ItemsContext = 
  createContext<ItemsContextProps | undefined>(undefined)

export const ItemsProvider = ({ children }: PropsWithChildren) => {
  const useItems = useItemsHook()
  const [selectedItem, setSelectedItem] = useState<NftMetaData>()

  const clickToItem = (token: NftMetaData) => ()  => {
    setSelectedItem(token)
  }

  const value = {
    useItems,
    selectedItem, 
    setSelectedItem, 
    clickToItem
  }

  return (
    <ItemsContext.Provider value={value}>
      {children}
    </ItemsContext.Provider>
  )
}

export const useItemsContext = () => {
  const lemonsContext = useContext(ItemsContext)
  if (lemonsContext === undefined) {
    throw new Error('Used outside of ItemsContext')
  }
  const {
    useItems, 
    selectedItem, 
    setSelectedItem, 
    clickToItem
  } = lemonsContext
  return {
    ...useItems,
    selectedItem, 
    setSelectedItem, 
    clickToItem
  }
}