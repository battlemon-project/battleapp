import { useLemons } from "hooks/useLemons";
import TabsLayout from "./TabsLayout";
import styles from './inventory.module.css'
import TokensList from "./TokensList";
import TokensFilter from "./TokensFilter";

export default function LemonTab() {
  const { lemonTokens, refreshLemonTokens } = useLemons()

  return (<div className={styles.lemonTab}>
    <TabsLayout>
      <TokensList tokens={lemonTokens} width={25}/>
    </TabsLayout>
    <div className="row gx-2 ">
      <div className="col-12 col-sm-6 col-lg-4 mt-2">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Level up</button>
      </div>
      <div className="col-12 col-sm-6 col-lg-4 mt-2">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Dress</button>
      </div>
      <div className="col-12 col-sm-6 col-lg-4 mt-2">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Undress</button>
      </div>
    </div>
  </div>)
}