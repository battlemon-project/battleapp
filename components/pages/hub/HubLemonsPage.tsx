import { useLemon } from "hooks/useLemon";
import { useOnMount } from "hooks/useOnMount";
import { LemonType } from "lemon";
import { useState } from "react";

export default function HubLemonsPage() {
  const [ lemons, setLemons ] = useState<LemonType[]>([])
  const { lemonTokens, lemonBalance } = useLemon()

  useOnMount(() => {
    lemonTokens().then(data => {
      if (data) {
        setLemons(data)
      }
    });
  })

  return (<div className="container mb-auto">
    <h3 className="text-center py-3">{lemonBalance} Lemons: </h3>
    <div className="row">
      {lemons.map(lemon => {
        return <div className="col-2"><img src={lemon.metaData.image} className="img-fluid" /></div>
      })}
    </div>
  </div>);
};