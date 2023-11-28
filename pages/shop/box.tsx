import Layout from 'components/layout/Web3Layout';
import BuyBoxPage from 'components/pages/shop/BuyBoxPage';
import Head from 'next/head';

export default function Shop() {
  return (<>
    <Head>
      <title>Buy Chest - Battlemon</title>
    </Head>
    <Layout>
      <BuyBoxPage />
    </Layout>
  </>);
};
