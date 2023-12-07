import { ItemsArray, NftMetaData } from 'lemon'
import { createContext, useContext } from 'react'
import { addItemsToArray } from 'utils/properties'
import { createStore, useStore as useZustandStore } from 'zustand'

type StageType = 'Start' | 'Items' | 'Gems'

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
        if (state.selectedLemons[0].original) {
          _state.selectedLemons = [state.selectedLemons[0].original];
        }
      }
      if (stage == 'Items') {
        _state.selectedItems = [];
        state.selectedLemons[0].original = structuredClone(state.selectedLemons[0])
      }
      return _state;
    }),
    selectLemon: (token) => set((state) => {
      return {
        ...state, 
        selectedLemons: [token]
      }
    }),
    selectItem: (token) => set((state) => { 
      const lemon = structuredClone(state.selectedLemons[0]);
      const [ _png, name, type ]: [string, string, string] = token.image.split(/[/.]+/).reverse();
      if (lemon?.properties) {
        lemon.properties.items[type] = name
      }
      const selectedItems: ItemsArray = addItemsToArray(state.selectedItems, token, type)
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

