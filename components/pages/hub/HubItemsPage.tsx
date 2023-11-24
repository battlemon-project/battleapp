import { ItemsProvider } from "components/inventory/ItemsContext";
import ItemsTab from "components/inventory/ItemsTab";

export default function HubItemsPage() {
  return (<div className="container">
    <ItemsProvider>
      <ItemsTab />
    </ItemsProvider>
  </div>);
};