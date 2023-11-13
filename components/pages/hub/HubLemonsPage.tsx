import LemonsTab from "components/inventory/LemonsTab";
import { useLemons } from "hooks/useLemons";

export default function HubLemonsPage() {
  const { lemonTokens, refreshLemonTokens } = useLemons()

  return (<div className="container">
    <h3 className="text-center py-3">{lemonTokens?.length} Lemons:</h3>
    <LemonsTab />
    <button onClick={() => refreshLemonTokens()}>test</button>
  </div>);
};