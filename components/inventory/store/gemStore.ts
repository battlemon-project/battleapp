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
  mergeSuccessResult: () => void
  mergeErrorResult: () => void
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
    selectGem: (selectedGem) => set((state) => {
      if (!state.selectedGems.map(g => g.image).includes(selectedGem.image)) {
        return {
          ...state, 
          selectedGems: [selectedGem]
        }
      }
      if (state.selectedGems.map(g => g.tokenId).includes(selectedGem.tokenId)) {
        return {
          ...state, 
          selectedGems: state.selectedGems.filter(g => g.tokenId !== selectedGem.tokenId)
        }
      } else {
        return {
          ...state, 
          selectedGems: [ selectedGem, ...(state.selectedGems?.slice(-1) || []) ]
        }
      }
    }),
    setMergeStatus: (mergeStatus) => set((state) => ({ ...state, mergeStatus })),
    mergeSuccessResult: () => set((state) => ({ ...state, selectedGems: [] })),
    mergeErrorResult: () => set((state) => ({ ...state, selectedGems: [] })) 
  }))
}

export function useGemStore() {
  return useStore((store) => store)
}
