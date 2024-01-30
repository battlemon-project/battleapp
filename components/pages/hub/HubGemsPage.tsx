import GemsTab from "components/inventory/GemsTab";
import UnauthGemsTab from "components/inventory/UnauthGemsTab";
import GemProvider from "components/inventory/store/GemProvider";
import useAuth from "context/AuthContext";
import { SWRConfig } from 'swr'

const config = {
  revalidateOnFocus: false,
  revalidateOnMount: false,
  revalidateOnReconnect: false
}

export default function HubGemsPage() {
  const { isSignedIn, isSupportedChain } = useAuth();

  return (<div className="container">
    <SWRConfig value={config}>
      <GemProvider>
        {(() => {
          if (!isSignedIn) {
            return <UnauthGemsTab>PLEASE SIGN IN</UnauthGemsTab>
          } else if (!isSupportedChain) {
            return <UnauthGemsTab>PLEASE CHANGE NETWORK</UnauthGemsTab>
          } else {
            return <GemsTab />
          }
        })()}
      </GemProvider>
    </SWRConfig>
  </div>);
};