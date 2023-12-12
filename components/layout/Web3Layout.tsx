import { PropsWithChildren } from "react";
import useAuth from 'context/AuthContext';
import { useIsMounted } from "hooks/useIsMounted";
import { Roboto } from 'next/font/google'
import cn from 'classnames'
import Header from "./Header";
import OgHead from "./OgScheme";
import Timer from "./Timer";
import { useRouter } from "next/router";
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

interface LayoutProps {
  hideDesktopMenu?: boolean,
  alwaysVisible?: boolean,
  fixedTop?: boolean
}

export default function Layout({ children, hideDesktopMenu, alwaysVisible, fixedTop }: PropsWithChildren<LayoutProps>) {
  const isMounted = useIsMounted();
  const router = useRouter();
  const { isSignedIn, isSupportedChain } = useAuth();
  
  return (<>
    <OgHead />
    <main className={cn('position-relative min-vh-100 d-flex flex-column', roboto.className)}>
      <Header hideDesktopMenu={hideDesktopMenu} fixedTop={fixedTop} />

      <div className="flex-fill d-flex flex-column justify-content-center align-items-center">
        {(() => {
          if (process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'false' && router.pathname !== '/') {
            return isMounted && <span className="fs-18">Battlemon will fly after <Timer deadline={"Dec 14 2023 13:00:00 GMT+0100"} /></span>
          }
          if (isMounted && (alwaysVisible || (isSignedIn && isSupportedChain))) {
            return children
          } else if (isSignedIn && !isSupportedChain) {
            return <span>Please Change Network</span>
          } else {
            return <span>Please Sign In</span>
          }
        })()}
      </div>
    </main>
  </>)
}