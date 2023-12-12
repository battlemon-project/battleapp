import styles from './inventory.module.css'
import cn from "classnames";
import { useState } from "react";
import LemonScene from "components/babylon/LemonScene";
import { ghostProperties } from "utils/properties";
import LemonStart from "./stages/LemonStart";
import { useLemonStore } from "./store/lemonStore";
import LemonAllItems from "./stages/LemonAllItems";
import { useLemonBalance } from "hooks/useLemonBalance";
import { useItemBalance } from 'hooks/useItemBalance';
import { PropertiesType } from 'lemon';
import LemonEquipedItems from './stages/LemonEquipedItems';
import useWindowSize from 'hooks/useWindowSize';

export default function LemonTab() {
  const size = useWindowSize()
  const { selectedLemons, stage } = useLemonStore()
  const [isModelLoading, setIsModelLoading ] = useState<boolean>(true)
  const { balance: lemonBalance } = useLemonBalance()
  const { balance: itemBalance } = useItemBalance()
  
  return (<div className="row">
    {size.width > 992 && <div className="col-5">
      {!lemonBalance && <img className={cn('img-fluid rounded-4', styles.lightBg)} src="/images/shop/lemons-gallery.gif" />}
      {!!lemonBalance && <div className="position-relative">
        <img src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' width='1000' height='1000' className='img-fluid' />
        <div className={styles.generatorContainer}>
          { isModelLoading && <div className="spinner-border text-light mx-auto position-absolute" style={{left: '50%', top: '48%', width: '3rem', height: '3rem'}} />}
          <LemonScene properties={selectedLemons[0]?.properties || (ghostProperties as PropertiesType)} onModelReady={() => setIsModelLoading(false)} />
        </div>
      </div>}
    </div>}
    <div className={cn('col-lg-7 col-12', styles.inventoryContainer)}>
      <div className={cn({'d-none': stage !== 'Start'})}>
        <LemonStart balance={lemonBalance} />
      </div>
      {stage == 'AllItems' && <div className={cn({'d-none': stage !== 'AllItems'})}>
        <LemonAllItems balance={itemBalance} />
      </div>}
      {stage == 'EquipedItems' && <div className={cn({'d-none': stage !== 'EquipedItems'})}>
        <LemonEquipedItems />
      </div>}
    </div>
  </div>)
}