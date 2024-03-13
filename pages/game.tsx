import Layout from 'components/layout/Web3Layout';
import BuyBoxPage from 'components/pages/shop/BuyBoxPage';
import BoxProvider from 'components/pages/shop/store/BoxProvider';
import Head from 'next/head';

export default function Game() {
  return (<>
    <Head>
      <title>Buy Box - Battlemon</title>
    </Head>
    <Layout>
      <BoxProvider>
        <BuyBoxPage />
      </BoxProvider>
    </Layout>
  </>);
};
