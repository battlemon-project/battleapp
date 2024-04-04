import cn from 'classnames';
import styles from '../shop.module.css'
import { useEffect, useState } from 'react';
import { useContract } from 'hooks/useContract';
import { useParkBalance } from 'hooks/useParkBalance';
import ParkKey from './ParkKey';
import { NftMetaData } from 'lemon';
import { useLineaParkIsApprovedForAll } from 'hooks/generated';
import ParkApprove from './ParkApprove';
import ParkBurn from './ParkBurn';
import { useGoldenKeyGetAll } from 'hooks/useGoldenKeyGetAll';
import Timer from 'components/layout/Timer';
import GoldenKeysList from './GoldenKeysList';
import ParkOpenWithGoldenKey from './ParkOpenWithGoldenKey';

interface BuyBattleBoxProps {
  chainId: number
  address: `0x${string}`
}

export default function BuyBattleBox({ chainId, address }: BuyBattleBoxProps) {
  const contract = useContract('PARK')
  const boxesContract = useContract('BOXES')
  const { balance: parkBalance, refreshBalance } = useParkBalance(address)
  const { allKeys, refreshAllKeys } = useGoldenKeyGetAll(address)
  const lineaParkIsApproved = useLineaParkIsApprovedForAll({
    address: contract!,
    args: [address, boxesContract!]
  })
  const [ isApproved, setIsApproved ] = useState<boolean>(false)
  const [ lineaParkKey, setLineaParkKey ] = useState<NftMetaData | undefined>()
  const [ goldenKey, setGoldenKey ] = useState<number | undefined>()

  useEffect(() => {
    if (lineaParkIsApproved?.data) {
      setIsApproved(true);
    }
  }, [lineaParkIsApproved?.data])

  useEffect(() => {
    if (!lineaParkKey) {
      refreshBalance?.()
    }
  }, [lineaParkKey])

  return (<>
    <div className="d-flex mb-4">
      <div className="btn-group w-100" role="group">
        
        {lineaParkKey?.tokenId && !isApproved && <>
          <ParkApprove contract={contract!} chainId={chainId} setIsApproved={setIsApproved} boxesContract={boxesContract!} />
        </>}
                
        {lineaParkKey?.tokenId && isApproved && <>
          <ParkBurn contract={boxesContract!} chainId={chainId} tokenId={lineaParkKey?.tokenId } setLineaParkKey={setLineaParkKey} />
        </>}
                
        {goldenKey && isApproved && <>
          <ParkOpenWithGoldenKey contract={boxesContract!} chainId={chainId} tokenId={goldenKey} setGoldenKey={setGoldenKey} refreshAllKeys={refreshAllKeys}  />
        </>}

        {(!lineaParkKey?.tokenId && !goldenKey) && <>
          <button type="button" className={cn('d-flex justify-content-center btn btn-default disabled', styles.buyBtn)}>
            <div className='d-flex'>
              <span className='fs-15'>SELECT KEY</span>
            </div>
          </button>
        </>}

        <div className="btn-group" role="group">
          <button id="btnGroupDrop1" type="button" className="btn btn-default dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          </button>
          <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="btnGroupDrop1">
            {!!parkBalance && <ParkKey balance={parkBalance} chainId={chainId} contract={contract!} setLineaParkKey={setLineaParkKey} />}
            {allKeys && Object.values(allKeys).length && <GoldenKeysList allKeys={allKeys} chainId={chainId} contract={contract!} setGoldenKey={setGoldenKey} />}
          </ul>
        </div>
      </div>

    </div>
  </>
  );
};