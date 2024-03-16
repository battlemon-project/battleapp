import Layout from 'components/layout/Web3Layout';
import ClaimPage from 'components/pages/ClaimPage';
import Head from 'next/head';

export default function Labs() {

  return (<>
    <Head>
      <title>Battlemon Claim</title>
    </Head>
    <Layout>
      <ClaimPage />
    </Layout>
  </>);
};
