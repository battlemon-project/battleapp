import { NftMetaData } from 'lemon'
import { createContext, useContext } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'

type StageType = 'Start' | 'Items' | 'Gems'

interface DefaultStoreInterface {
  stage: StageType
  selectedLemon: NftMetaData | undefined
  selectedItem: NftMetaData | undefined
  selectedGem: NftMetaData | undefined
}

interface StoreInterface extends DefaultStoreInterface {
  changeStage: (stage: StageType) => void
  selectLemon: (token: NftMetaData) => () => void
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
    selectedLemon: undefined,
    selectedItem: undefined,
    selectedGem: undefined,
  }
}

export function initializeStore(
  preloadedState: Partial<StoreInterface> = {}
) {
  return createStore<StoreInterface>((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    changeStage: (stage) => set((state) => ({ ...state, stage })),
    selectLemon: (token) => () => set((state) => ({ ...state, selectedLemon: token })),
    selectItem: (token) => () => set((state) => { 
      const lemon = structuredClone(state.selectedLemon);
      const [ _png, name, type ] = token.image.split(/[/.]+/).reverse();
      if (lemon?.properties) {
        lemon.properties.items[type] = name
      }
      return {
        ...state,
        selectedItem: token,
        selectedLemon: lemon
      }
    }),
    selectGem: (token) => () => set((state) => ({ ...state, selectedItem: token })),
  }))
}

export function useLemonStore() {
  return useStore((store) => store)
}

