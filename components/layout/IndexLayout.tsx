import { PropsWithChildren } from "react";
import { useIsMounted } from "hooks/useIsMounted";
import OgHead from "./OgScheme";
import Script from "next/script";
 
export default function Layout({ children }: PropsWithChildren) {  
  const isMounted = useIsMounted()
  return (<>
    <OgHead />
    { children }
  </>)
}