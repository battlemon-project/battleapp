import Layout from 'components/layout/Web3Layout';
import BuyLemonPage from 'components/pages/shop/BuyLemonPage';
import Head from 'next/head';

export default function Shop() {
  return (<>
    <Head>
      <title>Buy Lemon - Battlemon</title>
    </Head>
    <Layout>
      <BuyLemonPage />
    </Layout>
  </>);
};
