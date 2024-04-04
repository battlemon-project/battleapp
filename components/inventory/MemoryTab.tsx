import styles from './inventory.module.css'
import cn from "classnames";
import MemoryStart from './stages/MemoryStart';
import { useParkBalance } from 'hooks/useParkBalance';
import { useAccount, useNetwork } from 'wagmi';
import { useChainModal } from '@rainbow-me/rainbowkit';
import { SignInButton } from 'components/pages/shop/buttons/SignInButton';
import Link from 'next/link';


interface MemoryTabProps {
  address: `0x${string}`
}

export default function MemoryTab({ address }: MemoryTabProps) {
  const { chain } = useNetwork()
  const { isConnected } = useAccount();
  const { openChainModal } = useChainModal();
  const { balance } = useParkBalance(address)

  return (
    <div className="row">
      <div className="col-5 d-none d-lg-block">
        <img src="/images/lineapark.jpg" className="img-fluid rounded-4 order-1 mb-4" />
        {balance ? <div className={`text-center h6 py-4 rounded-4`} style={{background: 'rgba(0,0,0,0.4)'}}>
          You already got your NFT.
        </div> : isConnected ? <>
          {chain?.name.includes('inea') ?             
            <Link href="/claim" className='btn btn-lg btn-outline-light w-100'>
              Claim Linea Park NFT
            </Link> : <>
            <button className='btn btn-lg btn-outline-light w-100' onClick={openChainModal} type="button">
              Switch to Linea Network
            </button>
          </>}
        </> : <>
            <SignInButton />
        </>}
      </div>

      <div className={cn('col-lg-7 col-12 position-relative mx-0', styles.inventoryContainer)}>
        {chain?.id && <MemoryStart balance={balance} chainId={chain?.id} />}
      </div>
    </div>
  )
}