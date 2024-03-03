import Layout from 'components/layout/Web3Layout';
import BuyBoxPage from 'components/pages/shop/BuyBoxPage';
import { SignInButton } from 'components/pages/shop/buttons/SignInButton';
import BoxProvider from 'components/pages/shop/store/BoxProvider';
import Head from 'next/head';
import Link from 'next/link';
import { useAccount, useNetwork } from 'wagmi';

export default function Shop() {
  const { address }  = useAccount();
  const { chain } = useNetwork();
  
  return (<>
    <Head>
      <title>Buy Chest - Battlemon</title>
    </Head>
    <Layout>
      <BoxProvider>
        <Link href="/shop">
          <button className='btn btn-outline-light'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left mb-05" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            <span className='ps-2'>Back to Shop</span>
          </button>
        </Link>
        {address && chain ? <BuyBoxPage /> : <>
          <div className='row justify-content-center'>
            <div className='col-4'>
              <SignInButton />
            </div>
          </div>
        </>}
      </BoxProvider>
    </Layout>
  </>);
};
