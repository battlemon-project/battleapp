import ItemsTab from "components/inventory/ItemsTab";
import UnauthItemsTab from "components/inventory/UnauthItemsTab";
import ItemProvider from "components/inventory/store/ItemProvider";
import useAuth from "context/AuthContext";
import { SWRConfig } from 'swr'

const config = {
  revalidateOnFocus: false,
  revalidateOnMount: true,
  revalidateOnReconnect: false
}

export default function HubItemsPage() {
  const { isSignedIn, isSupportedChain } = useAuth();

  return (<div className="container">
    <SWRConfig value={config}>
      <ItemProvider>
        {(() => {
          if (!isSignedIn) {
            return <UnauthItemsTab>PLEASE SIGN IN</UnauthItemsTab>
          } else if (!isSupportedChain) {
            return <UnauthItemsTab>PLEASE CHANGE NETWORK</UnauthItemsTab>
          } else {
            return <ItemsTab />
          }
        })()}
      </ItemProvider>
    </SWRConfig>
  </div>);
};