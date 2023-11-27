import { type PropsWithChildren, useRef } from 'react'
import type { StoreType } from './lemonStore'
import { initializeStore, Provider } from './lemonStore'

export default function StoreProvider({ children, ...props }: PropsWithChildren) {
  const storeRef = useRef<StoreType>();
  if (!storeRef.current) storeRef.current = initializeStore(props);
  return <Provider value={storeRef.current}>{children}</Provider>
}