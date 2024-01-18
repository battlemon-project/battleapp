import { BoxType, PrizeType, StatusType } from 'hooks/useBuyBox'
import { createContext, useContext } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'

interface DefaultStoreInterface {
  box: BoxType | undefined
  status: StatusType
  prize: PrizeType | undefined
}

interface StoreInterface extends DefaultStoreInterface {
  setBox: (box: BoxType) => void
  setStatus: (status: StatusType) => void
  setPrize: (prize: PrizeType) => void
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
    box: undefined,
    status: 'idle',
    prize: undefined,
  }
}

export function initializeStore(
  preloadedState: Partial<StoreInterface> = {}
) {
  return createStore<StoreInterface>((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    setBox: (box) => set((state) => ({ ...state, box })),
    setStatus: (status) => set((state) => ({ ...state, status })),
    setPrize: (prize) => set((state) => ({ ...state, prize })),
  }))
}

export function useBoxStore() {
  return useStore((store) => store)
}

