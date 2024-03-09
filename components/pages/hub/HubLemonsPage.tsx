import LemonsTab from "components/inventory/LemonsTab";
import UnauthLemonsTab from "components/inventory/UnauthLemonsTab";
import LemonProvider from "components/inventory/store/LemonProvider";
import useAuth from "context/AuthContext";
import { SWRConfig } from 'swr'

const config = {
  revalidateOnFocus: false,
  revalidateOnMount: true,
  revalidateOnReconnect: false
}

export default function HubLemonsPage() {
  const { isSignedIn, isSupportedChain } = useAuth();
  
  return (<div className="container">
    <SWRConfig value={config}>
      <LemonProvider>
        {(() => {
          if (!isSignedIn) {
            return <UnauthLemonsTab>PLEASE SIGN IN</UnauthLemonsTab>
          } else if (!isSupportedChain) {
            return <UnauthLemonsTab>PLEASE CHANGE NETWORK</UnauthLemonsTab>
          } else {
            return <LemonsTab />
          }
        })()}
      </LemonProvider>
    </SWRConfig>  
  </div>);
};