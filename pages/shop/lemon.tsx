import Layout from 'components/layout/Web3Layout';
import BuyLemonPage from 'components/pages/shop/buy/BuyLemonPage';
import Head from 'next/head';

export default function Shop() {
  return (<>
    <Head>
      <title>Buy Lemon - Battlemon</title>
    </Head>
    <Layout paddingTop={80}>
      <BuyLemonPage />
    </Layout>
  </>);
};
