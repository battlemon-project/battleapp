import { type PropsWithChildren, useRef } from 'react'
import type { StoreType } from './boxStore'
import { initializeStore, Provider } from './boxStore'

export default function StoreProvider({ children, ...props }: PropsWithChildren) {
  const storeRef = useRef<StoreType>();
  if (!storeRef.current) storeRef.current = initializeStore(props);
  return <Provider value={storeRef.current}>{children}</Provider>
}