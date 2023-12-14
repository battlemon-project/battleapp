import { PropsWithChildren } from "react";
import useAuth from 'context/AuthContext';
import { useIsMounted } from "hooks/useIsMounted";
import { Roboto } from 'next/font/google'
import cn from 'classnames'
import Header from "./Header";
import OgHead from "./OgScheme";
import Timer from "./Timer";
import { useRouter } from "next/router";
import { ToastContainer } from 'react-toastify';
import { useWhitelist } from 'hooks/useWhitelist';
import Link from "next/link";
 
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
  const { whitelist } = useWhitelist();
  const isMounted = useIsMounted();
  const router = useRouter();
  const { isSignedIn, isSupportedChain } = useAuth();
  
  return (<>
    <OgHead />
    <main className={cn('position-relative min-vh-100 d-flex flex-column', roboto.className)}>
      <Header hideDesktopMenu={hideDesktopMenu} fixedTop={fixedTop} />

      <div className="flex-fill d-flex flex-column justify-content-center align-items-center">
        {(() => {
          if (isMounted && (alwaysVisible || (isSignedIn && isSupportedChain))) {
            return children
          } else if (isSignedIn && !isSupportedChain) {
            return <span>Please Change Network</span>
          } else {
            return <span>Please Sign In</span>
          }
        })()}
      </div>

      <ToastContainer position="bottom-right" />
    </main>
  </>)
}