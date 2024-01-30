import Link from 'next/link';
import styles from './inventory.module.css'
import cn from "classnames";
import TabsLayout from './layout/TabsLayout';
import { PropsWithChildren } from 'react';
import useWindowSize from 'hooks/useWindowSize';

export default function UnauthGemsTab({ children }: PropsWithChildren) {
  const size = useWindowSize()
  
  return (<div className="row">
    {size.width > 992 && <div className="col-5">
      <div className="position-relative">
        <img src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' width='1000' height='1000' className='img-fluid' />
      </div>
    </div>}
    <div className={cn('col-lg-7 col-12 position-relative mx-0', styles.inventoryContainer)}>
      <TabsLayout>
        <div className='d-flex flex-column justify-content-center' style={{height: '330px'}}>
          <p className='fs-14 text-center'>{children}</p>
        </div>
      </TabsLayout>
      <div className="col-12 mt-2">
        <Link href="/hub/pickaxes" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
          You can get Gem using Pickaxe
        </Link>
      </div>
    </div>
  </div>)
}