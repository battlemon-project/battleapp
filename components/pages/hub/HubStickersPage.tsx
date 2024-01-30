import StickersTab from "components/inventory/StickersTab";
import UnauthStickersTab from "components/inventory/UnauthStickersTab";
import StickerProvider from "components/inventory/store/StickerProvider";
import useAuth from "context/AuthContext";
import { SWRConfig } from 'swr'

const config = {
  revalidateOnFocus: false,
  revalidateOnMount: false,
  revalidateOnReconnect: false
}

export default function HubStickersPage() {
  const { isSignedIn, isSupportedChain } = useAuth();

  return (<div className="container">
    <SWRConfig value={config}>
      <StickerProvider>
        {(() => {
          if (!isSignedIn) {
            return <UnauthStickersTab>PLEASE SIGN IN</UnauthStickersTab>
          } else if (!isSupportedChain) {
            return <UnauthStickersTab>PLEASE CHANGE NETWORK</UnauthStickersTab>
          } else {
            return <StickersTab />
          }
        })()}
      </StickerProvider>
    </SWRConfig>
  </div>);
};