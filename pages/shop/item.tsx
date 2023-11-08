import Layout from 'components/layout/Web3Layout';
import BuyItemPage from 'components/pages/shop/buy/BuyItemPage';
import Head from 'next/head';

export default function Shop() {
  return (<>
    <Head>
      <title>Buy Item - Battlemon</title>
    </Head>
    <Layout paddingTop={80}>
      <BuyItemPage />
    </Layout>
  </>);
};
