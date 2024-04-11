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
import GoldenKeysList from './GoldenKeysList';
import ParkOpenWithGoldenKey from './ParkOpenWithGoldenKey';
import { useGoldenKeyBalance } from 'hooks/useGoldenKeyBalance';

interface BuyBattleBoxProps {
  chainId: number
  address: `0x${string}`
}

export default function BuyBattleBox({ chainId, address }: BuyBattleBoxProps) {
  const contractPark = useContract('PARK')
  const contractKey = useContract('KEY')
  const boxesContract = useContract('BOXES')
  const { balance: parkBalance, refreshBalance: refreshParkBalance } = useParkBalance(address)
  const { balance: keyBalance } = useGoldenKeyBalance();
  const lineaParkIsApproved = useLineaParkIsApprovedForAll({
    address: contractPark!,
    args: [address, boxesContract!]
  })
  const [ isApproved, setIsApproved ] = useState<boolean>(false)
  const [ lineaParkKey, setLineaParkKey ] = useState<NftMetaData | undefined>()
  const [ goldenKey, setGoldenKey ] = useState<number | undefined>()
  const [readyKeys, setReadyKeys] = useState<Record<number, boolean | undefined>>({})

  useEffect(() => {
    if (lineaParkIsApproved?.data) {
      setIsApproved(true);
    }
  }, [lineaParkIsApproved?.data])
  
  useEffect(() => {
    if (!goldenKey) {
      refreshParkBalance?.()
    }
  }, [goldenKey])

  return (<>
    <div className="d-flex mb-4">
      <div className="btn-group w-100" role="group">
        
        {lineaParkKey?.tokenId && !isApproved && <>
          <ParkApprove contract={contractPark!} chainId={chainId} setIsApproved={setIsApproved} boxesContract={boxesContract!} />
        </>}
                
        {lineaParkKey?.tokenId && isApproved && <>
          <ParkBurn contract={boxesContract!} chainId={chainId} tokenId={lineaParkKey?.tokenId } setLineaParkKey={setLineaParkKey} />
        </>}
                
        {goldenKey !== undefined ? <>
          <ParkOpenWithGoldenKey contract={boxesContract!} chainId={chainId} tokenId={goldenKey} setGoldenKey={setGoldenKey} readyKeys={readyKeys} setReadyKeys={setReadyKeys}  />
        </> : <></>}

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
          <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-right" aria-labelledby="btnGroupDrop1">
            <div className="d-flex flex-column" style={{width: '200px'}}>
              {/* {!!parkBalance && <ParkKey balance={parkBalance} chainId={chainId} contract={contractPark!} setLineaParkKey={setLineaParkKey} />} */}
              {keyBalance ? <GoldenKeysList balance={keyBalance} chainId={chainId} contract={contractKey!} setGoldenKey={setGoldenKey} readyKeys={readyKeys} setReadyKeys={setReadyKeys} /> : <></>}
              {/* {!parkBalance && !keyBalance ? <li><a className={`dropdown-item disabled`}>You have not KEY</a></li> : <></>} */}
              {!keyBalance ? <li><a className={`dropdown-item disabled`}>You have not KEY</a></li> : <></>}
            </div>
          </ul>
        </div>
      </div>

    </div>
  </>
  );
};