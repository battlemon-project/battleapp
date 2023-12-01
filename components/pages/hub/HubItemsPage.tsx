import ItemsTab from "components/inventory/ItemsTab";
import ItemProvider from "components/inventory/store/ItemProvider";
import { SWRConfig } from 'swr'

const config = {
  revalidateOnFocus: false,
  revalidateOnMount: false,
  revalidateOnReconnect: false
}

export default function HubItemsPage() {
  return (<div className="container">
    <SWRConfig value={config}>
      <ItemProvider>
        <ItemsTab />
      </ItemProvider>
    </SWRConfig>
  </div>);
};