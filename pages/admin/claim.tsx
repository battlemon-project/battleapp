import Layout from 'components/layout/Web3Layout';
import Head from 'next/head';
import { useLemonWithdraw, useItemWithdraw } from 'hooks/generated'
import { useState } from 'react';

export default function Whitelist() {

  const lemonWithdraw = useLemonWithdraw({
    address: process.env.NEXT_PUBLIC_CONTRACT_LEMONS as '0x'
  })

  const itemWithdraw = useItemWithdraw({
    address: process.env.NEXT_PUBLIC_CONTRACT_ITEMS as '0x'
  })

  const handleWithdrawLemonButton = () => {
    lemonWithdraw?.write()
  }
  
  const handleWithdrawItemButton = () => {
    itemWithdraw?.write()
  }

  return (<>
    <Head>
      <title>Withdraw</title>
    </Head>
    <Layout>
      <div className="text-center">
        <button className='btn btn-success btn-lg mx-3' onClick={handleWithdrawLemonButton}>Withdraw Lemons</button>
        <button className='btn btn-success btn-lg mx-3' onClick={handleWithdrawItemButton}>Withdraw Items</button>
      </div>
    </Layout>
  </>);
};
