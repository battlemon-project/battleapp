import Link from 'next/link';
import styles from './inventory.module.css'
import cn from "classnames";
import TabsLayout from './layout/TabsLayout';
import { PropsWithChildren } from 'react';

export default function UnauthItemsTab({ children }: PropsWithChildren) {
  return (<div className="row">
    <div className="col-5">
      <img className={cn('img-fluid rounded-4', styles.lightBg)} src="/images/shop/items-gallery.gif" />
    </div>
    <div className={cn('col-lg-7 col-12 position-relative', styles.inventoryContainer)}>
      <TabsLayout>
        <div className='d-flex flex-column justify-content-center' style={{height: '330px'}}>
          <p className='fs-14 text-center'>{children}</p>
        </div>
      </TabsLayout>
      <div className="col-12 mt-2">
        <Link href="/shop" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
          Buy Box in the Shop
        </Link>
      </div>
    </div>
  </div>)
}