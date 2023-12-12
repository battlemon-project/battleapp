import { PropsWithChildren } from "react";
import { useIsMounted } from "hooks/useIsMounted";
import cn from "classnames"
import OgHead from "./OgScheme";
 
export default function Layout({ children }: PropsWithChildren) {  
  const isMounted = useIsMounted()
  return (<>
    <OgHead />
    <main className={cn('position-relative min-vh-100 d-flex flex-column')}>
      <div className="flex-fill d-flex flex-column justify-content-center align-items-center">
        { isMounted && children }
      </div>
    </main>
  </>)
}