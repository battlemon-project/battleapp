import Link from 'next/link';
import styles from './inventory.module.css'
import cn from "classnames";
import TabsLayout from './layout/TabsLayout';
import { PropsWithChildren } from 'react';

export default function UnauthPickaxesTab({ children }: PropsWithChildren) {
  return (<div className="row">
    <div className="col-5">
      
    </div>
    <div className={cn('col-lg-7 col-12 position-relative', styles.inventoryContainer)}>
      <TabsLayout>
        <div className='d-flex flex-column justify-content-center' style={{height: '330px'}}>
          <p className='fs-14 text-center'>{children}</p>
        </div>
      </TabsLayout>
      <div className="col-12 mt-2">
        <Link href="/shop/box" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
          Buy box in the Shop for getting Pickaxe
        </Link>
      </div>
    </div>
  </div>)
}