import cn from 'classnames';
import styles from './shop.module.css'
import Link from 'next/link';
import { truncate } from 'utils/misc';
import PolSymbol from 'components/layout/PolSymbol';
import MintItem from './buttons/MintItem';
import useAuth from 'context/AuthContext';
import { SignInButton } from './buttons/SignInButton';
import { useContract } from 'hooks/useContract';
import { useNetwork } from 'wagmi';

export default function BuyItemPage() {
  const NEXT_PUBLIC_CONTRACT_ITEMS = useContract('ITEMS')
  const { chain } = useNetwork();
  const { isSignedIn, isSupportedChain } = useAuth();

  return (
    <div className="container py-3 mb-auto">
      <div className="d-flex justify-content-between">
        <Link href="/shop">
          <button className='btn btn-outline-light'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left mb-05" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            <span className='ps-2'>Back to Shop</span>
          </button>
        </Link>
        <Link href="/hub/items">
          <button className='btn btn-outline-light'>
            Open Items Hub 
          </button>
        </Link>
      </div>

      <div className="row mt-3">
        <div className='col-12 col-md-5 mb-4'>
          <img className={cn('rounded-4 img-fluid', styles.lightBg)} src="/images/shop/items-gallery.gif" />
        </div>
        <div className="col-12 col-md-7">
          <div className={cn('p-3 py-4 rounded-4 mb-4', styles.lightBg)}>
            <p className="mb-3">The items are boost for the character. Each item has luck, agility, and speed, which affect the results of the raid. The more items you wear into the raid, the better your results will be.</p>
            <div className="d-flex justify-content-between mb-2">
              <b>Contract Address</b>
              <div>{truncate(NEXT_PUBLIC_CONTRACT_ITEMS, 8)}</div>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <b>Token Standard</b>
              <div>ERC721</div>
            </div>
            {chain && <div className="d-flex justify-content-between ">
              <b>Network</b>
              <div className='fs-16'><PolSymbol>{chain.name}</PolSymbol></div>
            </div>}
          </div>

          {(() => {
            if (!isSignedIn || !isSupportedChain) {
              return <SignInButton />
            } else {
              return NEXT_PUBLIC_CONTRACT_ITEMS && <MintItem />
            }
          })()}
          
        </div>
      </div>
    </div>
  );
};