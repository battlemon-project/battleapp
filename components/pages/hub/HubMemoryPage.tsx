import MemoryTab from "components/inventory/MemoryTab";
import UnauthMemoryTab from "components/inventory/UnauthMemoryTab";
import useAuth from "context/AuthContext";

export default function HubMemoryPage() {
  const { isSupportedChain, address } = useAuth();

  return (<div className="container">
    {(() => {
      if (!address) {
        return <UnauthMemoryTab>PLEASE SIGN IN</UnauthMemoryTab>
      } else if (!isSupportedChain) {
        return <UnauthMemoryTab>PLEASE CHANGE NETWORK</UnauthMemoryTab>
      } else {
        return <MemoryTab address={address} />
      }
    })()}
  </div>);
};