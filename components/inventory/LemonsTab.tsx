import styles from './inventory.module.css'
import cn from "classnames";
import { useState } from "react";
import LemonScene from "components/babylon/LemonScene";
import { ghostProperties } from "utils/properties";
import LemonStart from "./stages/LemonStart";
import { useLemonStore } from "./store/lemonStore";
import LemonAllItems from "./stages/LemonAllItems";
import LemonBridge from "./stages/LemonBridge";
import { useLemonBalance } from "hooks/useLemonBalance";
import { useItemBalance } from 'hooks/useItemBalance';
import { useGemBalance } from 'hooks/useGemBalance';
import { PropertiesType } from 'lemon';
import LemonEquipedItems from './stages/LemonEquipedItems';
import useWindowSize from 'hooks/useWindowSize';
import NftProps from './layout/NftProps';
import { useContract } from 'hooks/useContract';
import { useAccount, useNetwork } from 'wagmi';
import LemonGems from './stages/LemonGems';

export default function LemonsTab() {
  const { chain } = useNetwork()
  const lemonsContract = useContract('LEMONS')
  const itemsContract = useContract('ITEMS')
  const gemsContract = useContract('GEMS')
  const { address }  = useAccount();
  const size = useWindowSize()
  const { selectedLemons, stage } = useLemonStore()
  const [isModelLoading, setIsModelLoading ] = useState<boolean>(true)
  const { balance: lemonBalance } = useLemonBalance()
  const { balance: itemBalance } = useItemBalance()
  const { balance: gemBalance } = useGemBalance()
  
  return (<div className="row">
    {size.width > 992 && <div className="col-5">
      <div className="position-relative">
        <img src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' width='1000' height='1000' className='img-fluid' />
        <div className={styles.generatorContainer}>
          { isModelLoading && <div className="spinner-border text-light mx-auto position-absolute" style={{left: '50%', top: '48%', width: '3rem', height: '3rem'}} />}
          <LemonScene properties={selectedLemons[0]?.properties || (ghostProperties as PropertiesType)} onModelReady={() => setIsModelLoading(false)} />
        </div>
      </div>
    </div>}
    <div className={cn('col-lg-7 col-12 position-relative', styles.inventoryContainer)}>
      {selectedLemons[0] && <NftProps token={selectedLemons[0]} />}
      {chain && <div className={cn({'d-none': stage !== 'Start'})}>
        <LemonStart balance={lemonBalance} contract={lemonsContract!} chainId={chain.id} />
      </div>}
      {chain && stage == 'AllItems' && <div className={cn({'d-none': stage !== 'AllItems'})}>
        <LemonAllItems balance={itemBalance} contract={itemsContract!} chainId={chain.id} />
      </div>}
      {chain && stage == 'EquipedItems' && <div className={cn({'d-none': stage !== 'EquipedItems'})}>
        <LemonEquipedItems contract={lemonsContract!} chainId={chain.id} />
      </div>}
      {chain && stage == 'Gems' && <div className={cn({'d-none': stage !== 'Gems'})}>
        <LemonGems balance={gemBalance} contract={gemsContract!} chainId={chain.id} />
      </div>}
      {chain && stage == 'Bridge' && selectedLemons[0] && address && <div className={cn({'d-none': stage !== 'Bridge'})}>
        <LemonBridge chainId={chain.id} token={selectedLemons[0]} address={address} />
      </div>}
      
    </div>
  </div>)
}