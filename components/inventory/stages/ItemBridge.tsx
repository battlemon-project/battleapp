import cn from 'classnames'
import TokensList from "../layout/TokensList";
import styles from '../inventory.module.css'
import { useItemStore } from "../store/itemStore";
import TabsLayout from '../layout/TabsLayout';
import { NftMetaData } from 'lemon';
import { useState } from 'react';
import ItemBridgeButton from '../buttons/ItemBridgeButton';
import { BridgeItemArray } from 'hooks/useLayerZeroQuoteItem';
import { bridgeChains } from 'hooks/useLayerZeroQuoteLemon';
import { versionItemsPlaces } from 'utils/properties';

interface ItemBridgeProps {
  chainId: number,
  token: NftMetaData,
  address: `0x${string}`,
}

export default function ItemBridge({ chainId, token, address }: ItemBridgeProps) {
  const { changeStage } = useItemStore()
  const dataArray: BridgeItemArray = [
    address, 
    BigInt(token.tokenId),
    versionItemsPlaces['0xc2'].indexOf(token.properties.type), 
    token.properties.level,
    BigInt(token.properties.agility), 
    BigInt(token.properties.speed), 
    BigInt(token.properties.luck),
    token.properties.dna as `0x${string}`
  ]
  console.log(dataArray)
  const [ selectedChain, setSelectedChain ] = useState<NftMetaData>()

  const handleSelect = (token: NftMetaData) => {
    setSelectedChain(token)
  }

  const disabledTokens = bridgeChains.filter(x => x.image.includes('Sticker_SKALE'))
  
  return (<>
    <TabsLayout>
      <TokensList tokens={bridgeChains.filter(x => x.tokenId !== chainId)} colWidth={20} height={410} selectedTokens={[selectedChain]} onClick={handleSelect} isValidating={false} contract={undefined} isNextPage={false} chainId={chainId} disabledTokens={disabledTokens} />
      {/* <TokensFilter /> */}
    </TabsLayout>
    <div className={styles.inventoryButtonsRow}>
      <div className='row gx-2'>
        <div className="col-6 col-lg-5 mt-2 d-flex">
          <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100')} onClick={() => {changeStage('Start')}}>Back</button>
        </div>
        <div className="col-6 col-lg-7 mt-2 d-flex">
          {selectedChain && <ItemBridgeButton chainId={selectedChain.tokenId} dataArray={dataArray} tokenId={token.tokenId} />}
          {!selectedChain && <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100 disabled')}>Approve</button>}
        </div>
      </div>
    </div>
  </>)
}