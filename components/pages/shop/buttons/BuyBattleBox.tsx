import cn from 'classnames';
import styles from '../shop.module.css'
import { useEffect, useState } from 'react';
import { useContract } from 'hooks/useContract';
import { useParkBalance } from 'hooks/useParkBalance';
import ParkKey from './ParkKey';
import { NftMetaData } from 'lemon';
import { useLineaParkIsApprovedForAll } from 'hooks/generated';
import useAuth from 'context/AuthContext';
import ParkApprove from './ParkApprove';
import ParkBurn from './ParkBurn';
import { useGoldenKeyGetAll } from 'hooks/useGoldenKeyGetAll';

interface BuyBattleBoxProps {
  chainId: number
}

export default function BuyBattleBox({ chainId }: BuyBattleBoxProps) {
  const contract = useContract('PARK')
  const boxesContract = useContract('BOXES')
  const { address } = useAuth()
  const { balance: parkBalance, refreshBalance } = useParkBalance()
  const { allKeys, refreshAllKeys } = useGoldenKeyGetAll()
  console.log(allKeys)
  const lineaParkIsApproved = useLineaParkIsApprovedForAll({
    address: contract!,
    args: [address!, boxesContract!]
  })
  const [ isApproved, setIsApproved ] = useState<boolean>(false)
  const [ lineaParkKey, setLineaParkKey ] = useState<NftMetaData | undefined>()

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

        {!lineaParkKey?.tokenId && <>
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
            {allKeys ? allKeys[0].map((id, index) => {
              return Number(allKeys[1][index].nextBoxTimestamp) < 1 ? <li>
                <a className="dropdown-item" href="#" onClick={() => {}}>Golden Key #{Number(id) % 10000000}</a>
              </li> : <></>
            }) : <></>}
          </ul>
        </div>
      </div>

    </div>
  </>
  );
};