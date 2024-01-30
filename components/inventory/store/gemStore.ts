import { StatusType } from 'hooks/useBuyBox'
import { NftMetaData } from 'lemon'
import { createContext, useContext } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'

type StageType = 'Start'

interface DefaultStoreInterface {
  stage: StageType
  selectedGems: NftMetaData[]
  mergeStatus: StatusType
}

interface StoreInterface extends DefaultStoreInterface {
  changeStage: (stage: StageType) => void
  selectGem: (sticker: NftMetaData) => void
  setMergeStatus: (mergeStatus: StatusType) => void
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
    selectedGems: [],
    mergeStatus: 'idle'
  }
}

export function initializeStore(
  preloadedState: Partial<StoreInterface> = {}
) {
  return createStore<StoreInterface>((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    changeStage: (stage) => set((state) => ({ ...state, stage })),
    selectGem: (selectedGem) => set((state) => ({ 
      ...state, 
      selectedGems: [selectedGem, ...(state.selectedGems || []) ]
    })),
    setMergeStatus: (miningStatus) => set((state) => ({ ...state, miningStatus }))
  }))
}

export function useGemStore() {
  return useStore((store) => store)
}
