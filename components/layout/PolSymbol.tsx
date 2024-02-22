import { PropsWithChildren } from "react";
import { useNetwork } from 'wagmi';

export default function PolSymbol({ children }: PropsWithChildren) {
  const { chain } = useNetwork()
  return (
    <div className="d-flex align-items-center position-relative" style={{top: '1px'}}>
      {chain?.name.includes('Polygon') && 
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="20" viewBox="0 0 29 25" fill="none" className='position-relative' style={{top: '-1px'}}>
          <path d="M22.3026 18.3936L28.2424 14.9638C28.5573 14.7816 28.7519 14.4437 28.7519 14.0811V7.22144C28.7519 6.85882 28.5573 6.52097 28.2424 6.33877L22.3026 2.90893C21.9877 2.72674 21.5968 2.72851 21.2837 2.90893L15.3438 6.33877C15.029 6.52097 14.8344 6.85882 14.8344 7.22144V19.4797L10.6687 21.8836L6.50301 19.4797V14.6702L10.6687 12.2663L13.4158 13.8529V10.6265L11.1781 9.33347C11.0242 9.24503 10.8474 9.19727 10.6687 9.19727C10.49 9.19727 10.3132 9.24503 10.1593 9.33347L4.2194 12.7633C3.90454 12.9455 3.70996 13.2834 3.70996 13.646V20.5057C3.70996 20.8683 3.90454 21.2061 4.2194 21.3883L10.1593 24.8182C10.4741 24.9986 10.8633 24.9986 11.1781 24.8182L17.118 21.3883C17.4329 21.2061 17.6274 20.8683 17.6274 20.5057V8.24562L17.7017 8.20316L21.7914 5.84172L25.9571 8.24562V13.0552L21.7914 15.4591L19.0478 13.8759V17.1024L21.2819 18.3919C21.5968 18.5723 21.9877 18.5723 22.3008 18.3919L22.3026 18.3936Z" fill="url(#paint0_linear_5033_61058)"/>
          <defs>
          <linearGradient id="paint0_linear_5033_61058" x1="3.62859" y1="21.1778" x2="27.6764" y2="7.21967" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A726C1"/>
          <stop offset="0.88" stopColor="#803BDF"/>
          <stop offset="1" stopColor="#7B3FE4"/>
          </linearGradient>
          </defs>
        </svg>
      }
      {chain?.name.includes('Linea') && 
        <img alt="Linea Goerli Testnet" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAJFBMVEUSEhISEhIBAQH///+dnZ3i4uLX19dnZ2eFhYU4ODi0tLT+/v4sSrrFAAAAAXRSTlP9g+pWxwAAAGhJREFUKJHN0MESgCAIRVF5YKL9//9mpTWJtGnTXXqGYSQECk4VyO8nCMBFSBSM2AagzKx4IjSW/QmloowoHA/MzGt2kECJxp0XUqc52n9+xNYU01k256vYKxZ16ak9PO7Mzlk/xBcNG58yBE9ktPjgAAAAAElFTkSuQmCC" style={{width: '20px', height: '20px', borderRadius: '10px'}} />
      }
      <span className="fst-italic fw-semi ps-1">
        {children}
      </span>
    </div>
  );
}