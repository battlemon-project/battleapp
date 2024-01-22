import styles from './inventory.module.css'
import cn from "classnames";
import { usePickaxeStore } from './store/pickaxeStore';
import PickaxeStart from './stages/PickaxeStart';
import { usePickaxeBalance } from 'hooks/usePickaxeBalance';
import useWindowSize from 'hooks/useWindowSize';
import PickaxeScene from './scenes/PickaxeScene';
import { useState } from 'react';
import PickaxeProps from './layout/PickaxeProps';

export default function PickaxesTab() {
  const { selectedPickaxe, stage } = usePickaxeStore()
  const size = useWindowSize()
  const { balance } = usePickaxeBalance()

  return (<div className="row">
    {size.width > 992 && <div className="col-5">
      <div className="position-relative">
        <img src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' width='1000' height='1000' className='img-fluid' />
        <div className={styles.miningContainer}>
          <PickaxeScene pickaxeType={ Number(selectedPickaxe?.image.split('/').pop()?.split('.')[0])} />
        </div>
      </div>
    </div>}

    <div className={cn('col-lg-7 col-12 position-relative mx-0', styles.inventoryContainer)}>
      {selectedPickaxe && <PickaxeProps sharpness={100} />}
      {stage == 'Start' && <PickaxeStart balance={balance} />}
    </div>
  </div>)
}