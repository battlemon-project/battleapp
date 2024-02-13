import { ItemsArray, NftMetaData } from 'lemon'
import { createContext, useContext } from 'react'
import { addItemsToArray, dressedItemsToNftMetaData, removeItemsFromArray } from 'utils/properties'
import { createStore, useStore as useZustandStore } from 'zustand'

type StageType = 'Start' | 'AllItems' | 'EquipedItems' | 'Gems' | 'Bridge'

interface DefaultStoreInterface {
  stage: StageType
  selectedLemons: NftMetaData[]
  selectedItems: (NftMetaData | undefined)[]
  selectedGems: NftMetaData[]
}

interface StoreInterface extends DefaultStoreInterface {
  updateStore: (...args: any) => void
  changeStage: (stage: StageType) => void
  selectLemon: (token: NftMetaData) => void
  selectItem: (token: NftMetaData) => void
  confirmDressLemon: (itemsIds: number[]) => void
  selectGem: (token: NftMetaData) => void
}

export type StoreType = ReturnType<typeof initializeStore>

const zustandContext = createContext<StoreType | null>(null)

export const Provider = zustandContext.Provider

export function useStore<T>(selector: (state: StoreInterface) => T) {
  const store = useContext(zustandContext)

  if (!store) throw new Error('Store is missing the provider')

  return useZustandStore(store, selector)
}

function getDefaultInitialState(): DefaultStoreInterface {
  return {
    stage: 'Start',
    selectedLemons: [],
    selectedItems: [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
    selectedGems: [],
  }
}

export function initializeStore(
  preloadedState: Partial<StoreInterface> = {}
) {
  return createStore<StoreInterface>((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    updateStore: (newState) => set((state) => {
      const _state = { 
        ...state, 
        ...newState
      }
      return _state
    }),
    changeStage: (stage) => set((state) => {
      const _state = { 
        ...state, 
        stage
      }
      if (stage == 'Start') {
        _state.selectedItems = [];
      }
      if (stage == 'AllItems') {
        _state.selectedItems = [];
      }

      if (state.selectedLemons[0].original) {
        _state.selectedLemons = [state.selectedLemons[0].original];
        _state.selectedLemons[0].original = structuredClone(_state.selectedLemons[0]);
      }
      
      return _state;
    }),
    selectLemon: (token) => set((state) => {
      token.original = structuredClone(token)
      return {
        ...state, 
        selectedLemons: [token]
      }
    }),
    selectItem: (token) => set((state) => { 
      const lemon = structuredClone(state.selectedLemons[0]);
      const { type, name } = token.properties;
      
      let selectedItems: ItemsArray = []

      if (state.selectedItems?.find(data => data?.tokenId == token.tokenId)) {
        if (lemon?.properties) {
          if (state.stage == 'EquipedItems') {
            lemon.properties.items[type] = undefined
            if (lemon.properties.itemsData?.[type]) {
              delete lemon.properties.itemsData[type]
            }
          } else {
            lemon.properties.items[type] = lemon.original?.properties.items[type] || undefined
            if (lemon.original?.properties.itemsData?.[type] && lemon.properties.itemsData) {
              lemon.properties.itemsData[type] = lemon.original.properties.itemsData[type] 
            } else if (lemon.properties.itemsData) {
              delete lemon.properties.itemsData[type]
            }
          }
        }
        selectedItems = removeItemsFromArray(state.selectedItems, token, type)
      } else {
        if (lemon?.properties) {
          lemon.properties.items[type] = name
          if (lemon.properties.itemsData) {
            lemon.properties.itemsData[type] = { 
              level: token.properties.level,
              agility: token.properties.agility,
              speed: token.properties.speed,
              luck: token.properties.luck,
              dna: token.properties.dna,
              itemName: token.properties.name,
              tokenId: token.tokenId 
            }
          }
        }
        selectedItems = addItemsToArray(state.selectedItems, token, type)
      }
      
      if (lemon.properties.itemsData) {
        lemon.properties.agility = 3 + Object.values(lemon.properties.itemsData).map(i => i.agility).reduce((a,b)=>(a || 0)+(b || 0), 0)
        lemon.properties.speed = 3 + Object.values(lemon.properties.itemsData).map(i => i.speed).reduce((a,b)=>(a || 0)+(b || 0), 0)
        lemon.properties.luck = 3 + Object.values(lemon.properties.itemsData).map(i => i.luck).reduce((a,b)=>(a || 0)+(b || 0), 0)
      }

      return {
        ...state,
        selectedLemons: [lemon],
        selectedItems: selectedItems
      }
    }),
    confirmDressLemon: (itemsIds) => set((state) => {
      const _lemon = state.selectedLemons[0]
      _lemon.properties.dress = itemsIds;
      state.selectedItems.forEach(item => {
        if (!item) return
        _lemon.properties.items[item.properties.type] = item.properties.name
      })
      _lemon.original = _lemon;
      return {
        ...state,
        selectedLemons: [_lemon],
        selectedItems: state.stage == 'EquipedItems' ? state.selectedItems : []
      }
    }),
    selectGem: (token) => set((state) => {
      return {
        ...state, 
        selectedGems: [token]
      }
    }),
  }))
}

export function useLemonStore() {
  return useStore((store) => store)
}

