import Layout from 'components/layout/Web3Layout';
import ShopPage from 'components/pages/shop/ShopPage';
import Head from 'next/head';

export default function Shop() {
  return (<>
    <Head>
      <title>Battlemon Shop</title>
    </Head>
    <Layout>
      <ShopPage />
    </Layout>
  </>);
};
