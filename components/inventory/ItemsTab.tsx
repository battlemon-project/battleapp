import { useItems } from 'hooks/useItems';
import TabsLayout from './TabsLayout';
import TokensList from './TokensList';
import styles from './inventory.module.css'
import TokensFilter from './TokensFilter';
import cn from "classnames";
import Link from 'next/link';
import { useState } from 'react';
import { NftMetaData } from 'lemon';

export default function ItemsTab() {
  const { tokens, nextTokens, isNextTokens, prevTokens, isPrevTokens, itemBalance, isLoading } = useItems()
  const [selectedItem, setSelectedItem] = useState('/images/hub/choose-item.png')

  const clickToItem = (token: NftMetaData) => ()  => {
    setSelectedItem(token.image)
  }

  return (<div className="row">
    <div className="col-5">
      {!itemBalance && <img className={cn('img-fluid rounded-4', styles.lightBg)} src="/images/shop/items-gallery.gif" />}
      {!!itemBalance && <div className="position-relative p-5">
        <img src={selectedItem} className="img-fluid pr-5" />
      </div>}
    </div>
    <div className={cn('col-7', styles.inventoryContainer)}>
      <TabsLayout>
        <TokensList tokens={tokens} colWidth={25} height={410} onClick={clickToItem} isLoading={isLoading} />
        <div className="d-flex justify-content-between">
          {isPrevTokens && <button onClick={prevTokens} className="btn btn-sm btn-default m-2">prev</button>}
          {isNextTokens && <button onClick={nextTokens} className={`btn btn-sm btn-default m-2 ${styles.nextBtn}`}>next</button>}
        </div>
      </TabsLayout>
      {!itemBalance && <>
        <div className="col-12 mt-2">
          <Link href="/shop/item" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
            Buy item in the Shop
          </Link>
        </div>
      </>}
      {!!itemBalance && <div className="row gx-2">
        <div className="col-12 col-sm-6 col-lg-4 mt-2">
          <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Level up</button>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 mt-2">
          <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Sell</button>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 mt-2">
          <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Send</button>
        </div>
      </div>}
    </div>
  </div>)
}