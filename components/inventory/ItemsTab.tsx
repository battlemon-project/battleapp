import { useItems } from 'hooks/useItems';
import TabsLayout from './TabsLayout';
import TokensList from './TokensList';
import styles from './inventory.module.css'
import TokensFilter from './TokensFilter';

export default function ItemsTab() {
  const { itemTokens, refreshItemTokens } = useItems()

  return (<div className={styles.lemonTab}>
    <TabsLayout>
      <TokensList tokens={itemTokens} filter={true} />
      <TokensFilter />
    </TabsLayout>
    <div className="row gx-2">
      <div className="col-12 col-sm-6 col-lg-4 mt-2">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Level up</button>
      </div>
      <div className="col-12 col-sm-6 col-lg-4 mt-2">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Sell</button>
      </div>
      <div className="col-12 col-sm-6 col-lg-4 mt-2">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Send</button>
      </div>
    </div>
  </div>)
}