import { useLemons } from "hooks/useLemons";
import styles from './inventory.module.css'
import cn from "classnames";
import { useState } from "react";
import LemonScene from "components/babylon/LemonScene";
import { ghostProperties } from "utils/properties";
import LemonStart from "./stages/LemonStart";
import { useLemonStore } from "./store/lemon";
import { useItems } from "hooks/useItems";
import LemonItems from "./stages/LemonItems";

export default function LemonTab() {
  const { selectedLemon, stage } = useLemonStore()
  const [isModelLoading, setIsModelLoading ] = useState<boolean>(true)
  const lemonHook = useLemons()
  const itemHook = useItems()
  const { lemonBalance } = lemonHook

  return (<div className="row">
    <div className="col-5">
      {!lemonBalance && <img className={cn('img-fluid rounded-4', styles.lightBg)} src="/images/shop/lemons-gallery.gif" />}
      {!!lemonBalance && <div className="position-relative">
        <img src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' width='1000' height='1000' className='img-fluid' />
        <div className={styles.generatorContainer}>
          { isModelLoading && <div className="spinner-border text-light mx-auto position-absolute" style={{left: '50%', top: '48%', width: '3rem', height: '3rem'}} />}
          <LemonScene properties={selectedLemon?.properties || ghostProperties} onModelReady={() => setIsModelLoading(false)} />
        </div>
      </div>}
    </div>
    <div className={cn('col-7', styles.inventoryContainer)}>
      {stage == 'Start' && <LemonStart lemonHook={lemonHook} />}
      {stage == 'Items' && <LemonItems itemHook={itemHook} />}
    </div>
  </div>)
}