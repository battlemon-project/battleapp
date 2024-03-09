import styles from './inventory.module.css'
import cn from "classnames";
import { useItemStore } from './store/itemStore';
import ItemStart from './stages/ItemStart';
import ItemBridge from './stages/ItemBridge';
import ItemGems from './stages/ItemGems';
import { useItemBalance } from 'hooks/useItemBalance';
import useWindowSize from 'hooks/useWindowSize';
import ItemScene from 'components/babylon/ItemScene';
import { useState } from 'react';
import NftProps from './layout/NftProps';
import { useContract } from 'hooks/useContract';
import { useNetwork, useAccount } from 'wagmi';
import { useGemBalance } from 'hooks/useGemBalance';

export default function ItemsTab() {
  const { chain } = useNetwork()
  const lemonsContract = useContract('ITEMS')
  const gemsContract = useContract('GEMS')
  const { address }  = useAccount();
  const [isModelLoading, setIsModelLoading ] = useState<boolean>(true)
  const { selectedItems, stage } = useItemStore()
  const size = useWindowSize()
  const { balance } = useItemBalance()
  const { balance: gemBalance } = useGemBalance()

  return (<div className="row">
    {size.width > 992 && <div className="col-5">
      {(!balance && !selectedItems[0]) && <img className={cn('img-fluid rounded-4', styles.lightBg)} src="/images/shop/items-gallery.gif" />}
      {!!(balance && !selectedItems[0]) && <img src={'/images/hub/choose-item.png'} className="img-fluid pr-5" />}
      {!!balance && selectedItems[0] && <div className="position-relative p-5">
        <img src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' width='1000' height='1000' className='img-fluid' />
        <div className={styles.generatorContainer}>
          { isModelLoading && <div className="spinner-border text-light mx-auto position-absolute" style={{left: '50%', top: '48%', width: '3rem', height: '3rem'}} />}
          <ItemScene name={selectedItems[0].properties.name} onModelReady={() => setIsModelLoading(false)} />
        </div>
      </div>}
    </div>}

    <div className={cn('col-lg-7 col-12 position-relative', styles.inventoryContainer)}>
      {selectedItems[0] && <NftProps token={selectedItems[0]} />}
      {chain && stage == 'Start' && <div className={cn({'d-none': stage !== 'Start'})}>
        <ItemStart balance={balance} contract={lemonsContract!} chainId={chain.id} />
      </div>}      
      {chain && stage == 'Gems' && <div className={cn({'d-none': stage !== 'Gems'})}>
        <ItemGems balance={gemBalance} contract={gemsContract!} chainId={chain.id} />
      </div>}
      {chain && stage == 'Bridge' && selectedItems[0] && address && <div className={cn({'d-none': stage !== 'Bridge'})}>
        <ItemBridge chainId={chain.id} token={selectedItems[0]} address={address} />
      </div>}
    </div>
  </div>)
}