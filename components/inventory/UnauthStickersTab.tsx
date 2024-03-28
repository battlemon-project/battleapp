import Link from 'next/link';
import styles from './inventory.module.css'
import cn from "classnames";
import TabsLayout from './layout/TabsLayout';
import { PropsWithChildren } from 'react';

export default function UnauthStickersTab({ children }: PropsWithChildren) {
  
  return (<div className="row">
    <div className="col-5 d-none d-lg-block">
      <div className="position-relative">
        <img src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' width='1000' height='1000' className='img-fluid' />
      </div>
    </div>
    <div className={cn('col-lg-7 col-12 position-relative mx-0', styles.inventoryContainer)}>
      <TabsLayout>
        <div className='d-flex flex-column justify-content-center' style={{height: '330px'}}>
          <p className='fs-14 text-center'>{children}</p>
        </div>
      </TabsLayout>
      <div className="col-12 mt-2">
        <Link href="/game" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
          Buy box in the Shop
        </Link>
      </div>
    </div>
  </div>)
}