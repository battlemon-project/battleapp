import cn from 'classnames'
import Link from "next/link";
import { useRouter } from 'next/router';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header({ fixedTop, hideDesktopMenu }: { fixedTop?: boolean, hideDesktopMenu?: boolean }) {
  const router = useRouter();

  return (
    <nav className={cn('navbar navbar-expand-lg py-3', { 'fixed-top': fixedTop })}>
      <div className="container">
        <Link href="/" className="navbar-brand d-flex">
          <svg height="23" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 146.68 26.68"><g><g><path fill="currentColor" d="M108.23,4.29c0-1.44,0.31-2.48,0.95-3.11c0.63-0.63,1.49-0.95,2.57-0.95h1.9v2.9l0,0.1l0.01,16.11v0.06 c0,0.5,0.09,0.79,0.26,0.88c0.18,0.09,0.45,0.15,0.81,0.15l1.27-0.01v1.91h-4.25c-1.08,0-1.94-0.31-2.57-0.94 c-0.63-0.63-0.95-1.66-0.95-3.11V4.29L108.23,4.29z M115.47,0.23h4.01c1.24,0,2.18,0.32,2.81,0.95c0.63,0.63,0.95,1.67,0.95,3.11 v13.97c0,1.45-0.32,2.49-0.95,3.12c-0.63,0.63-1.58,0.94-2.84,0.94h-1.62v-2.96v-0.02V18.3V3.23c0-0.54-0.09-0.86-0.28-0.95 c-0.18-0.09-0.45-0.14-0.81-0.14h-1.27V0.23L115.47,0.23z M7.89,26.68H2.43V2.7L0,1.41V0.18h2.43h2.74h2.72v0v1.91v1.43v8.33v1.58 v2.25v0.82v8.25h5.39c0.35,0,0.62-0.05,0.81-0.14c0.18-0.09,0.28-0.41,0.28-0.95v-2.58v-0.67v-4.79c0-0.54-0.11-0.84-0.28-0.95 l-2.19-1.35L9.73,14.6v-2.26l3.23-1.92c0.17-0.1,0.28-0.41,0.28-0.95V6.43V4.61V3.17c0-0.54-0.09-0.86-0.28-0.95 c-0.18-0.09-0.45-0.14-0.81-0.14H9.73V0.18h5.16c1.24,0,2.18,0.32,2.81,0.95c0.63,0.63,0.95,1.67,0.95,3.11v0.38v1.81V6.8 c0,1.38-0.29,2.43-0.96,3.12c-0.07,0.07-0.14,0.13-0.22,0.17l0,0c-0.02,0.01-0.05,0.03-0.07,0.04c-0.92,0.52-1.87,1.07-2.84,1.64 c1.5,0.88,1.4,0.84,3.97,2.3c0.02,0.01,0.04,0.02,0.06,0.03l0,0v0c0.08,0.05,0.16,0.11,0.23,0.18c0.67,0.69,0.96,1.74,0.96,3.12v3 v0.67v1.52c0,1.44-0.32,2.48-0.95,3.11c-0.63,0.63-1.57,0.95-2.81,0.95H7.89V26.68L7.89,26.68z M22.59,0 c1.04,0,1.88,0.84,1.88,1.88l0,0.05c-0.03,1.56-0.65,3.08-1.88,4.55c-1.23-1.48-1.86-2.99-1.88-4.55l0-0.05 C20.71,0.84,21.55,0,22.59,0L22.59,0z M95.19,0c1.04,0,1.88,0.84,1.88,1.88l0,0.05c-0.03,1.56-0.65,3.08-1.88,4.55 c-1.23-1.48-1.86-2.99-1.88-4.55l0-0.05C93.3,0.84,94.15,0,95.19,0L95.19,0z M93.97,26.6h2.06l4.06-16.43v16.5h5.46V0.18h-5.46 L95,20.77L89.91,0.18h-5.46v26.5h5.46v-16.5L93.97,26.6L93.97,26.6z M29.28,7.88h-3.49c-1.24,0-2.18,0.32-2.81,0.95 c-0.63,0.63-0.95,1.67-0.95,3.11v0.18h5.41v-1.25c0-0.54,0.09-0.86,0.28-0.95c0.18-0.09,0.45-0.14,0.81-0.14h0.75h0.54h0.75 c0.35,0,0.62,0.05,0.81,0.14c0.18,0.09,0.28,0.41,0.28,0.95v15.8h5.41V11.94c0-1.44-0.32-2.48-0.95-3.11 c-0.63-0.63-1.57-0.95-2.81-0.95h-3.49H29.28L29.28,7.88z M29.82,14.9h-4.03c-1.24,0-2.18,0.32-2.81,0.95 c-0.63,0.63-0.95,1.67-0.95,3.11v1.62v0.41v1.62c0,1.44,0.32,2.48,0.95,3.11c0.63,0.63,1.57,0.95,2.81,0.95h4.03v-1.91h-1.29 c-0.35,0-0.62-0.05-0.81-0.14c-0.18-0.09-0.28-0.41-0.28-0.95v-2.69v-0.41v-2.69c0-0.54,0.09-0.86,0.28-0.95 c0.18-0.09,0.45-0.14,0.81-0.14h1.29V14.9L29.82,14.9z M59.89,26.66h-6.14c-1.24,0-2.18-0.32-2.81-0.95 c-0.63-0.63-0.95-1.67-0.95-3.11v-1.46v-0.57v-8.36h-2.25V10.3h2.25V6.12h4.17l1.24,2.35v1.84h4.48v1.91H55.4v8.36v0.57v2.53 c0,0.54,0.09,0.86,0.28,0.95c0.18,0.09,0.45,0.14,0.81,0.14h3.41V26.66L59.89,26.66z M76.84,10.53h3.52V8.62h-3.52V2.09h4.61V0.18 h-4.61h-5.46v1.91v14.97v1.91h5.46h4.61v-1.91h-4.61V10.53L76.84,10.53z M45.87,0.18h7.06h3.72h3.26v5.17h-4.24l-1.72-3.26h-8.07 v24.59H40.4V2.09h-7.44l-1.72,3.26H27V0.18h3.26h3.72h6.43h1.62h2.85H45.87L45.87,0.18z M131.23,7.56l7.45,19.05v0.07h5.46V2.76 l2.54-1.34V0.18h-2.54h-2.63h-2.84v19.05l-7.45-19.05h-5.46v24.59h-17.54v1.91h17.54h1.37h4.09V7.56L131.23,7.56z M68.05,26.68 h6.43h3.72h3.26v-5.17h-4.24l-1.72,3.26h-7.44V0.18h-5.46v26.5h3.84H68.05L68.05,26.68z" style={{fillRule: 'evenodd', clipRule: 'evenodd'}}></path></g></g></svg>
        </Link>
        
        <div className="order-lg-2 navbar-connectbutton">
          <ConnectButton accountStatus={'address'} showBalance={false}/>
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
          <ul className={`navbar-nav navbar-dark fs-5 ${hideDesktopMenu ? 'd-lg-none' : ''}`}>
            <li className="nav-item px-1">
              <Link href="/hub/lemons" className={`nav-link ${router.pathname.startsWith("/hub") ? "active" : ""}`}>NFT Hub</Link>
            </li>
            <li className="nav-item px-1">
              <Link href="/shop" className={`nav-link ${router.pathname.startsWith("/shop") ? "active" : ""}`}>Shop</Link>
            </li>
            <li className="nav-item px-1">
              <Link href="/labs" className={`nav-link ${router.pathname.startsWith("/labs") ? "active" : ""}`}>Labs</Link>
            </li>
            <li className="nav-item px-1">
              <Link href="/mining" className={`nav-link ${router.pathname.startsWith("/mining") ? "active" : ""}`}>Mining</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}