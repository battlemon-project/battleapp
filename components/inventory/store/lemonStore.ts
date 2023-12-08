import { ItemsArray, NftMetaData } from 'lemon'
import { createContext, useContext } from 'react'
import { addItemsToArray, dressedItemsToNftMetaData, removeItemsFromArray } from 'utils/properties'
import { createStore, useStore as useZustandStore } from 'zustand'

type StageType = 'Start' | 'AllItems' | 'EquipedItems' | 'Gems'

interface DefaultStoreInterface {
  stage: StageType
  selectedLemons: NftMetaData[]
  selectedItems: (NftMetaData | undefined)[]
  selectedGems: NftMetaData[]
}

interface StoreInterface extends DefaultStoreInterface {
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
    changeStage: (stage) => set((state) => {
      const _state = { 
        ...state, 
        stage
      }
      if (stage == 'Start') {
        _state.selectedItems = [];
      }
      if (stage == 'EquipedItems') {
        _state.selectedItems = dressedItemsToNftMetaData(state.selectedLemons[0].properties.itemsData);
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
      const [ _png, name, type ]: string[] = token.image.split(/[/.]+/).reverse();
      
      let selectedItems: ItemsArray = []

      if (state.selectedItems?.find(data => data?.tokenId == token.tokenId)) {
        if (lemon?.properties) {
          if (state.stage == 'EquipedItems') {
            lemon.properties.items[type] = undefined
          } else {
            lemon.properties.items[type] = lemon.original?.properties.items[type] || undefined
          }
        }
        selectedItems = removeItemsFromArray(state.selectedItems, token, type)
      } else {
        if (lemon?.properties) {
          lemon.properties.items[type] = name
        }
        selectedItems = addItemsToArray(state.selectedItems, token, type)
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
        selectedItems: []
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

