import LemonsTab from "components/inventory/LemonsTab";
import LemonProvider from "components/inventory/store/LemonProvider";

export default function HubLemonsPage() {
  return (<div className="container">
    <LemonProvider>
      <LemonsTab />
    </LemonProvider>
  </div>);
};