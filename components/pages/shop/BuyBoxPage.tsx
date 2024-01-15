import cn from 'classnames';
import styles from './shop.module.css'
import Link from 'next/link';
import BuyBox from './buttons/BuyBox';
import useAuth from 'context/AuthContext';
import { truncate } from 'utils/misc';
import { BoxType } from 'hooks/useBuyBox';
import { SignInButton } from './buttons/SignInButton';

export default function BuyBoxPage() {
  const { isSignedIn, isSupportedChain } = useAuth();

  return (
    <div className="container py-3 mb-auto">
      <Link href="/shop">
        <button className='btn btn-outline-light'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left mb-05" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          <span className='ps-2'>Back to Shop</span>
        </button>
      </Link>
      <br /><br /><br />
      {(() => {
        if (!isSignedIn || !isSupportedChain) {
          return <SignInButton />
        } else {
          return <div className='row'>
            <div className='col-4'>
              <BuyBox type={BoxType.Cheap} />
            </div>
            <div className='col-4'>
              <BuyBox type={BoxType.Good} />
            </div>
            <div className='col-4'>
              <BuyBox type={BoxType.Great} />
            </div>
          </div>
        }
      })()}

    </div>
  );
};