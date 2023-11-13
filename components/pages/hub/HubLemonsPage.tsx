import LemonsTab from "components/inventory/LemonsTab";
import { useLemons } from "hooks/useLemons";
import { useOnMount } from "hooks/useOnMount";
import { TokenType } from "lemon";
import { useState } from "react";

export default function HubLemonsPage() {
  const [ lemons, setLemons ] = useState<TokenType[]>([])
  const { lemonTokens, lemonBalance } = useLemons()

  useOnMount(() => {
    lemonTokens().then(data => {
      if (data) {
        setLemons(data)
      }
    });
  })

  return (<div className="container">
    <h3 className="text-center py-3">{lemonBalance} Lemons:</h3>
    <LemonsTab />
  </div>);
};