import styles from './inventory.module.css'
import cn from "classnames";
import TabsLayout from './layout/TabsLayout';
import { PropsWithChildren } from 'react';
import { SignInButton } from 'components/pages/shop/buttons/SignInButton';

export default function UnauthMemoryTab({ children }: PropsWithChildren) {
  
  return (<div className="row">
    <div className="col-5 d-none d-lg-block">
      <div className="position-relative">
        <img src="/images/lineapark.jpg" className="img-fluid rounded-4 order-1 mb-4" />
        <SignInButton />
      </div>
    </div>
    <div className={cn('col-lg-7 col-12 position-relative mx-0', styles.inventoryContainer)}>
      <TabsLayout>
        <div className='d-flex flex-column justify-content-center' style={{height: '330px'}}>
          <p className='fs-14 text-center'>{children}</p>
        </div>
      </TabsLayout>
    </div>
  </div>)
}