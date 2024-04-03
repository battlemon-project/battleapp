import Layout from 'components/layout/Web3Layout';
import KeyPage from 'components/pages/GoldenKeyPage';
import Head from 'next/head';

export default function Labs() {

  return (<>
    <Head>
      <title>Battlemon Golden Key</title>
    </Head>
    <Layout>
      <KeyPage />
    </Layout>
  </>);
};
