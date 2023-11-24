import { LemonsProvider } from "components/inventory/LemonsContext";
import LemonsTab from "components/inventory/LemonsTab";

export default function HubLemonsPage() {
  return (<div className="container">
    <LemonsProvider>
      <LemonsTab />
    </LemonsProvider>
  </div>);
};