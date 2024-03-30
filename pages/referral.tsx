import Layout from 'components/layout/Web3Layout';
import ReferralPage from 'components/pages/referral/ReferralPage';
import UnauthReferralPage from 'components/pages/referral/UnauthReferralPage';
import useAuth from 'context/AuthContext';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useAccount } from 'wagmi';

export default function Referral() {
  const { isSignedIn, isSupportedChain } = useAuth();
  const { address } = useAccount();
  const router = useRouter()
  const [cookies, setCookie] = useCookies([
    'referral_program'
  ]);
  
  useEffect(() => {
    if (cookies.referral_program) return
    if (router?.query && Object.keys(router?.query).length) {
      const addr = Object.keys(router.query)[0];
      if (addr.length == 42) {
        setCookie('referral_program', Object.keys(router.query)[0])
      }
    }
  }, [router?.query])
  
  return (<>
    <Head>
      <title>Battlemon Referral</title>
    </Head>
    <Layout>
      <div className="container">
        {isSignedIn && isSupportedChain && address ? <ReferralPage address={address} /> : <UnauthReferralPage isSupportedChain={!isSignedIn || !isSupportedChain} />}
      </div>
    </Layout>
  </>);
};
