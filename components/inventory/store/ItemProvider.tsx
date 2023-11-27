import { type PropsWithChildren, useRef } from 'react'
import type { StoreType } from './itemStore'
import { initializeStore, Provider } from './itemStore'

export default function StoreProvider({ children, ...props }: PropsWithChildren) {
  const storeRef = useRef<StoreType>();
  if (!storeRef.current) storeRef.current = initializeStore(props);
  return <Provider value={storeRef.current}>{children}</Provider>
}