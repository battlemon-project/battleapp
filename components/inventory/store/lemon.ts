import { create } from 'zustand'
import { NftMetaData } from 'lemon'


export interface LemonState {
  stage: 'Start' | 'Items'
  changeStage: (stage: 'Start' | 'Items') => void
  selectedLemon: NftMetaData | undefined,
  selectLemon: (token: NftMetaData) => () => void
  selectedItem: NftMetaData | undefined,
  selectItem: (token: NftMetaData) => () => void
}

export const useLemonStore = create<LemonState>()((set) => ({
  stage: 'Start',
  changeStage: (stage) => set((state) => ({ ...state, stage })),
  selectedLemon: undefined,
  selectLemon: (token) => () => set((state) => ({ ...state, selectedLemon: token })),
  selectedItem: undefined,
  selectItem: (token) => () => set((state) => ({ ...state, selectedItem: token })),
}))
