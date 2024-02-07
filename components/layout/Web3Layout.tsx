import { PropsWithChildren } from "react";
import { useIsMounted } from "hooks/useIsMounted";
import { Roboto } from 'next/font/google'
import cn from 'classnames'
import Header from "./Header";
import OgHead from "./OgScheme";
import { ToastContainer } from 'react-toastify';
import Footer from "./Footer";
import { useRouter } from "next/router";
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

interface LayoutProps {
  hideDesktopMenu?: boolean,
  fixedTop?: boolean
}

export default function Layout({ children, hideDesktopMenu, fixedTop }: PropsWithChildren<LayoutProps>) {
  const router = useRouter();
  const isMounted = useIsMounted();
  
  return (<>
    <OgHead />
    <main className={cn('position-relative min-vh-100 d-flex flex-column', roboto.className)}>
      <Header hideDesktopMenu={hideDesktopMenu} fixedTop={fixedTop} />

      <div className={cn('flex-fill d-flex flex-column justify-content-center align-items-center', {'pb-5': router.pathname !== '/' })}>
        {isMounted && children}
      </div>

      <ToastContainer position="bottom-right" />
      <Footer />
    </main>
  </>)
}