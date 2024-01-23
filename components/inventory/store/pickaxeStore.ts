import { StatusType } from 'hooks/useBuyBox'
import { NftMetaData } from 'lemon'
import { createContext, useContext } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'

type StageType = 'Start'

interface DefaultStoreInterface {
  stage: StageType
  selectedPickaxe: NftMetaData | undefined
  gemRank: number | undefined
  miningStatus: StatusType
  repairStatus: StatusType
}

interface StoreInterface extends DefaultStoreInterface {
  changeStage: (stage: StageType) => void
  selectPickaxe: (token: NftMetaData) => void
  setGemRank: (gemRank: number | undefined) => void
  setMiningStatus: (miningStatus: StatusType) => void
  setRepairStatus: (repairStatus: StatusType) => void
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
    selectedPickaxe: undefined,
    miningStatus: 'idle',
    repairStatus: 'idle',
    gemRank: undefined
  }
}

export function initializeStore(
  preloadedState: Partial<StoreInterface> = {}
) {
  return createStore<StoreInterface>((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    changeStage: (stage) => set((state) => ({ ...state, stage })),
    selectPickaxe: (selectedPickaxe) => set((state) => ({ ...state, selectedPickaxe })),
    setMiningStatus: (miningStatus) => set((state) => ({ ...state, miningStatus })),
    setRepairStatus: (repairStatus) => set((state) => ({ ...state, repairStatus })),
    setGemRank: (gemRank) => set((state) => ({ ...state, gemRank })),
  }))
}

export function usePickaxeStore() {
  return useStore((store) => store)
}
