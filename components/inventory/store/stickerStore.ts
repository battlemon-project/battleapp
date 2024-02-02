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
    selectSticker: (selectedSticker) => set((state) => {
      if (state.selectedStickers.map(g => g.tokenId).includes(selectedSticker.tokenId)) {
        return {
          ...state, 
          selectedStickers: state.selectedStickers.filter(g => g.tokenId !== selectedSticker.tokenId)
        }
      } else {
        return {
          ...state, 
          selectedStickers: [ selectedSticker, ...(state.selectedStickers?.slice(-3) || []) ]
        }
      }
    }),
    setMergeStatus: (mergeStatus) => set((state) => ({ ...state, mergeStatus })),
    mergeSuccessResult: () => set((state) => ({ ...state, selectedStickers: [] })),
    mergeErrorResult: () => set((state) => ({ ...state, selectedStickers: [] })) 
  }))
}

export function useStickerStore() {
  return useStore((store) => store)
}
