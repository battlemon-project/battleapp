import { useLemons } from "hooks/useLemons";
import TabsLayout from "./TabsLayout";
import styles from './inventory.module.css'
import TokensList from "./TokensList";
import cn from "classnames";
import Link from "next/link";
import { NftMetaData, PropertiesType } from "lemon";
import { useState } from "react";
import LemonScene from "components/babylon/LemonScene";
import { ghostProperties } from "utils/properties";
import { useOnMount } from "hooks/useOnMount";
import LemonsInit from "./stages/LemonsInit";

export default function LemonTab() {
  const [properties, setProperties] = useState<PropertiesType>(ghostProperties)
  const [isModelLoading, setIsModelLoading ] = useState<boolean>(true)
  const lemonHook = useLemons()
  const { lemonBalance, refreshTokens } = lemonHook

  useOnMount(() => {
    refreshTokens();
  })

  return (<div className="row">
    <div className="col-5">
      {!lemonBalance && <img className={cn('img-fluid rounded-4', styles.lightBg)} src="/images/shop/lemons-gallery.gif" />}
      {!!lemonBalance && <div className="position-relative">
        <img src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' width='1000' height='1000' className='img-fluid' />
        <div className={styles.generatorContainer}>
          { isModelLoading && <div className="spinner-border text-light mx-auto position-absolute" style={{left: '50%', top: '48%', width: '3rem', height: '3rem'}} />}
          <LemonScene properties={properties} onModelReady={() => setIsModelLoading(false)} />
        </div>
      </div>}
    </div>
    <div className={cn('col-7', styles.inventoryContainer)}>
      <LemonsInit lemonHook={lemonHook} />
    </div>
  </div>)
}