import cn from 'classnames'
import TokensList from "../layout/TokensList";
import styles from '../inventory.module.css'
import { useLemonStore } from "../store/lemonStore";
import TabsLayout from '../layout/TabsLayout';
import { NftMetaData } from 'lemon';
import { useState } from 'react';
import LemonBridgeButton from '../buttons/LemonBridgeButton';
import { BridgeLemonArray, bridgeChains } from 'hooks/useLayerZeroQuoteLemon';

interface LemonBridgeProps {
  chainId: number,
  token: NftMetaData,
  address: `0x${string}`,
}

export default function LemonBridge({ chainId, token, address }: LemonBridgeProps) {
  const { changeStage } = useLemonStore()
  const dataArray: BridgeLemonArray = [
    address, 
    BigInt(token.tokenId), 
    token.properties.level, 
    token.properties.type.includes('lfa') ? 0 : 1, 
    token.properties.dna as `0x${string}`, 
    BigInt(token.properties.agility), 
    BigInt(token.properties.speed), 
    BigInt(token.properties.luck)
  ]
  const [ selectedChain, setSelectedChain ] = useState<NftMetaData>()

  const handleSelect = (token: NftMetaData) => {
    setSelectedChain(token)
  }

  const disabledTokens = bridgeChains.filter(x => x.image.includes('Sticker_SKALE') || x.image.includes('Sticker_Blast'))
  
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
          {selectedChain && <LemonBridgeButton chainId={selectedChain.tokenId} dataArray={dataArray} tokenId={token.tokenId} />}
          {!selectedChain && <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100 disabled')}>Approve</button>}
        </div>
      </div>
    </div>
  </>)
}