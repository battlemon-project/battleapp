import { StatusType } from 'hooks/useBuyBox'
import { NftMetaData } from 'lemon'
import { createContext, useContext } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'

type StageType = 'Start'

interface DefaultStoreInterface {
  stage: StageType
  selectedStickers: NftMetaData[]
  mergeStatus: StatusType
}

interface StoreInterface extends DefaultStoreInterface {
  changeStage: (stage: StageType) => void
  selectSticker: (sticker: NftMetaData) => void
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
    selectedStickers: [],
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
    selectSticker: (selectedSticker) => set((state) => ({ 
      ...state, 
      selectedStickers: [selectedSticker, ...(state.selectedStickers || []) ]
    })),
    setMergeStatus: (miningStatus) => set((state) => ({ ...state, miningStatus }))
  }))
}

export function useStickerStore() {
  return useStore((store) => store)
}
