import { PropsWithChildren } from "react";

export default function EthSymbol({ children }: PropsWithChildren) {
  return (
    <div className="d-flex align-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <g clipPath="url(#clip0_1076_501)">
          <path d="M12.8457 24C19.4731 24 24.8457 18.6274 24.8457 12C24.8457 5.37258 19.4731 0 12.8457 0C6.21829 0 0.845703 5.37258 0.845703 12C0.845703 18.6274 6.21829 24 12.8457 24Z" fill="#627EEA"/>
          <path d="M13.2188 3V9.6525L18.8415 12.165L13.2188 3Z" fill="white" fillOpacity="0.602"/>
          <path d="M13.2192 3L7.5957 12.165L13.2192 9.6525V3Z" fill="white"/>
          <path d="M13.2188 16.476V20.9963L18.8453 13.212L13.2188 16.476Z" fill="white" fillOpacity="0.602"/>
          <path d="M13.2192 20.9963V16.4753L7.5957 13.212L13.2192 20.9963Z" fill="white"/>
          <path d="M13.2188 15.4297L18.8415 12.165L13.2188 9.65399V15.4297Z" fill="white" fillOpacity="0.2"/>
          <path d="M7.5957 12.165L13.2192 15.4297V9.65399L7.5957 12.165Z" fill="white" fillOpacity="0.602"/>
        </g>
        <defs>
          <clipPath id="clip0_1076_501">
            <rect width="24" height="24" fill="white" transform="translate(0.845703)"/>
          </clipPath>
        </defs>
      </svg>
      <span className="fst-italic fw-semi fs-14 ps-1">
        {children}
      </span>
    </div>
  );
}