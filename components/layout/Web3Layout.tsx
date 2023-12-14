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
  const { whitelist, openTime } = useWhitelist();
  const isMounted = useIsMounted();
  const router = useRouter();
  const { isSignedIn, isSupportedChain } = useAuth();
  
  return (<>
    <OgHead />
    <main className={cn('position-relative min-vh-100 d-flex flex-column', roboto.className)}>
      <Header hideDesktopMenu={hideDesktopMenu} fixedTop={fixedTop} />

      {isMounted && Date.now() < openTime*1000 && <div style={{position: 'absolute', top: '58px', left: '50%', transform: 'translateX(-50%)'}}>
        {!!whitelist?.[1] && <Link href="/shop/lemon" className="alert alert-success text-center d-block" style={{color: '#fff', fontSize: '18px', background: '#ae00cc'}}>
          You are in Whitelist, you can mint {whitelist?.[0]} Battlemons<br />
          {!router.pathname.includes('/shop') && <u>You can go to Shop</u>}
        </Link>}
        {!whitelist?.[1] && <div className="alert alert-danger">
          You are NOT IN Whitelist, you can mint after <Timer deadline={openTime*1000} />
        </div>}
      </div>}

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