export const runtime = 'experimental-edge';
import Layout from 'components/layout/Web3Layout';
import { SignInButton } from 'components/pages/shop/buttons/SignInButton';
import useAuth from 'context/AuthContext';
import { GetStaticProps, NextPageContext } from 'next';
import Head from 'next/head';
import { useState } from 'react';

Connect.getInitialProps = async (ctx: NextPageContext) => {
  return { device_id: ctx.query.device_id as string}
}

export default function Connect({ device_id }: { device_id: string | undefined }) {
  const [ status, setStatus ] = useState<'idle' | 'loading' | 'success'>('idle')
  const { address, isSupportedChain } = useAuth();

  const approveDevice = async () => {
    setStatus('loading');
    const res = await fetch(`/api/siwe/device?id=${device_id}`)
    const json = await res.json()
    if (json.address) {
      setStatus('success')
    } else {
      setStatus('idle')
    }
  }

  return (<>
    <Head>
      <title>Connect</title>
    </Head>
    <Layout>
      <h4 className="mb-4">Please approve Game connection</h4>
      <div className='text-center' style={{margin: '0 auto', width: '600px'}}>
        {(!address || !isSupportedChain) && <SignInButton />}
        {address && isSupportedChain && <>
          {device_id ? <>
            {status !== 'success' && <button className='btn btn-lg btn-outline-light w-100' onClick={approveDevice} type="button">
              { status == 'loading' ? 
                <div className="spinner-border spinner-border-sm" role="status"></div> :
                <>Approve my Device</>
              }
            </button>}
            {status === 'success' && <h5>
              Success! You can return to Game
            </h5>}
          </> : <>
            Wrong Device Id
          </>}
        </>}
      </div>
    </Layout>
  </>);
};