import PickaxesTab from "components/inventory/PickaxesTab";
import UnauthPickaxesTab from "components/inventory/UnauthPickaxesTab";
import PickaxeProvider from "components/inventory/store/PickaxeProvider";
import useAuth from "context/AuthContext";
import { SWRConfig } from 'swr'

const config = {
  revalidateOnFocus: false,
  revalidateOnMount: false,
  revalidateOnReconnect: false
}

export default function HubItemsPage() {
  const { isSignedIn, isSupportedChain } = useAuth();

  return (<div className="container">
    <SWRConfig value={config}>
      <PickaxeProvider>
        {(() => {
          if (!isSignedIn) {
            return <UnauthPickaxesTab>PLEASE SIGN IN</UnauthPickaxesTab>
          } else if (!isSupportedChain) {
            return <UnauthPickaxesTab>PLEASE CHANGE NETWORK</UnauthPickaxesTab>
          } else {
            return <PickaxesTab />
          }
        })()}
      </PickaxeProvider>
    </SWRConfig>
  </div>);
};