import cn from 'classnames'
import TokensList from "../layout/TokensList";
import styles from '../inventory.module.css'
import { useLemonStore } from "../store/lemonStore";
import TabsLayout from '../layout/TabsLayout';
import { NftMetaData } from 'lemon';

interface ItemBridgeProps {
  chainId: number
}

export default function LemonBridge({ chainId }: ItemBridgeProps) {
  const { changeStage } = useLemonStore()

  const handleSelect = (token: NftMetaData) => {

  }

  const brands: NftMetaData[] = [{
    tokenId: 3,
    image: '/images/brands/Sticker_Polygon.png',
    properties: { dna: '', type: '', traits: {}, items: {}, name: '', dress: [], agility: 3, speed: 3, luck: 3, level: 1 }
  },{
    tokenId: 1,
    image: '/images/brands/Sticker_Blast.png',
    properties: { dna: '', type: '', traits: {}, items: {}, name: '', dress: [], agility: 3, speed: 3, luck: 3, level: 1 }
  },{
    tokenId: 2,
    image: '/images/brands/Sticker_Linea.png',
    properties: { dna: '', type: '', traits: {}, items: {}, name: '', dress: [], agility: 3, speed: 3, luck: 3, level: 1 }
  },{
    tokenId: 4,
    image: '/images/brands/Sticker_SKALE.png',
    properties: { dna: '', type: '', traits: {}, items: {}, name: '', dress: [], agility: 3, speed: 3, luck: 3, level: 1 }
  }]

  return (<>
    <TabsLayout>
      <TokensList tokens={brands} colWidth={20} height={410} selectedTokens={brands.slice(0,1)} onClick={handleSelect} isValidating={false} contract={undefined} isNextPage={false} chainId={chainId} />
      {/* <TokensFilter /> */}
    </TabsLayout>
    <div className={styles.inventoryButtonsRow}>
      <div className='row gx-2'>
        <div className="col-6 col-lg-5 mt-2 d-flex">
          <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100')} onClick={() => {changeStage('Start')}}>Back</button>
        </div>
        <div className="col-6 col-lg-7 mt-2 d-flex">
          <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100 disabled')}>Approve</button>
        </div>
      </div>
    </div>
  </>)
}