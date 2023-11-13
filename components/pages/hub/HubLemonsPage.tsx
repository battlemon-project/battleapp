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

  return (<div className="container mb-auto">
    <h3 className="text-center py-3">{lemonBalance} Lemons: {lemons.length}</h3>
    <LemonsTab />
  </div>);
};