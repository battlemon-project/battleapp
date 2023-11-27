import ItemsTab from "components/inventory/ItemsTab";
import ItemProvider from "components/inventory/store/ItemProvider";

export default function HubItemsPage() {
  return (<div className="container">
    <ItemProvider>
      <ItemsTab />
    </ItemProvider>
  </div>);
};