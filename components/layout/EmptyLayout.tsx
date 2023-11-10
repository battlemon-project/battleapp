import { PropsWithChildren } from "react";
import { useIsMounted } from "hooks/useIsMounted";
import cn from "classnames"
 

export default function Layout({ children }: PropsWithChildren) {
  const isMounted = useIsMounted()
  
  return (
    <main className={cn('position-relative min-vh-100 d-flex flex-column')}>
      <div className="flex-fill d-flex flex-column justify-content-center align-items-center">
        { children }
      </div>
    </main>
  )
}