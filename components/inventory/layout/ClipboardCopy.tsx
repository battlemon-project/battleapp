import { useState } from "react";

export default function ClipboardCopy({ copyText }: { copyText: string}) {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text: string) {
    if (typeof window == "undefined") return;
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className="input-group mb-3 input-group-lg">
        <input type="text" style={{background: 'rgba(0,0,0,0.9)', color: '#fff', border: '3px solid rgba(0,0,0,0.9)', fontSize: '18px'}} className="form-control" value={copyText} readOnly /> 
        <button className={`btn d-flex align-items-center ${isCopied ? 'btn-success' : 'btn-dark'}`} type="button" onClick={handleCopyClick}>
          <svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#fff" d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path></svg>
        </button>
      </div>
    </div>
  );
}