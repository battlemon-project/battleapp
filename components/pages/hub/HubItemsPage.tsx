import ItemsTab from "components/inventory/ItemsTab";
import { useItems } from "hooks/useItems";
import { useOnMount } from "hooks/useOnMount";
import { TokenType } from "lemon";
import { useState } from "react";

export default function HubItemsPage() {
  const [ items, setItems ] = useState<TokenType[]>([])
  const { itemTokens, itemBalance } = useItems()

  useOnMount(() => {
    itemTokens().then(data => {
      if (data) {
        setItems(data)
      }
    });
  })

  return (<div className="container">
  <h3 className="text-center py-3">{itemBalance} Items:</h3>
  <ItemsTab />
</div>);
};