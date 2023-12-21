import cn from 'classnames';
import styles from './shop.module.css';
import Link from 'next/link';
import { truncate } from 'utils/misc';
import PolSymbol from 'components/layout/PolSymbol';
import MintLemon from './buttons/MintLemon';
import { SignInButton } from './buttons/SignInButton';
import useAuth from 'context/AuthContext';

export default function BuyLemonPage() {
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
      </div>

      <div className="row mt-3">
        <div className='col-12 col-md-5 mb-4'>
          <img className={cn('rounded-4 img-fluid', styles.lightBg)} src="/images/shop/lemons-gallery.gif" />
        </div>
        <div className="col-12 col-md-7">
          <div className={cn('p-3 py-4 rounded-4 mb-4', styles.lightBg)}>
            <p className="mb-3">Dynamic NFT with a unique 3D view, where you can build your own setup, level up on smart contracts in the blockchain, unlocking increasingly unique content, as well as sending your hero on an exciting adventure for valuable prizes, where commissions from mechanics and royalties will be distributed.</p>
            <div className="d-flex justify-content-between mb-2">
              <b>Contract Address</b>
              <div>{truncate(process.env.NEXT_PUBLIC_CONTRACT_LEMONS!, 8)}</div>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <b>Token Standard</b>
              <div>ERC721</div>
            </div>
            <div className="d-flex justify-content-between">
              <b>Network</b>
              <div className='fs-16'><PolSymbol>Polygon</PolSymbol></div>
            </div>
          </div>

          {(() => {
            if (!isSignedIn || !isSupportedChain) {
              return <SignInButton />
            } else {
              return <MintLemon />
            }
          })()}
          
        </div>
      </div>
    </div>
  );
};