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

interface BuyBattleBoxProps {
  chainId: number
}

export default function BuyBattleBox({ chainId }: BuyBattleBoxProps) {
  const contract = useContract('PARK')
  const boxesContract = useContract('BOXES')
  const { address } = useAuth()
  const { balance: parkBalance, refreshBalance } = useParkBalance()
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
            <li><a className="dropdown-item" href="#">Dropdown link</a></li>
            <li><a className="dropdown-item" href="#">Dropdown link</a></li>
          </ul>
        </div>
      </div>

    </div>
  </>
  );
};