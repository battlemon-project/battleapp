import LemonsTab from "components/inventory/LemonsTab";
import LemonProvider from "components/inventory/store/LemonProvider";
import { SWRConfig } from 'swr'

const config = {
  revalidateOnFocus: false,
  revalidateOnMount: false,
  revalidateOnReconnect: false
}

export default function HubLemonsPage() {
  return (<div className="container">
    <SWRConfig value={config}>
      <LemonProvider>
        <LemonsTab />
      </LemonProvider>
    </SWRConfig>  
  </div>);
};