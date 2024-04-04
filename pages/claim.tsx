import Layout from 'components/layout/Web3Layout';
import GoldenKeyPage from 'components/pages/GoldenKeyPage';
import Head from 'next/head';

export default function Labs() {

  return (<>
    <Head>
      <title>Battlemon Claim</title>
    </Head>
    <Layout>
      <GoldenKeyPage />
    </Layout>
  </>);
};
