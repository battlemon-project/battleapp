import { NftMetaData } from 'lemon'
import { createContext, useContext } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'

type StageType = 'Start' | 'Gems'

interface DefaultStoreInterface {
  stage: StageType
  selectedItems: NftMetaData[]
  selectedGems: NftMetaData[]
}

interface StoreInterface extends DefaultStoreInterface {
  changeStage: (stage: StageType) => void
  selectItem: (token: NftMetaData) => () => void
  selectGem: (token: NftMetaData) => () => void
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
    selectedItems: [],
    selectedGems: [],
  }
}

export function initializeStore(
  preloadedState: Partial<StoreInterface> = {}
) {
  return createStore<StoreInterface>((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    changeStage: (stage) => set((state) => ({ ...state, stage })),
    selectItem: (token) => () => set((state) => {
      return {
        ...state, 
        selectedItems: [token]
      }
    }),
    selectGem: (token) => () => set((state) => {
      return {
        ...state, 
        selectedGems: [token]
      }
    }),
  }))
}

export function useItemStore() {
  return useStore((store) => store)
}

