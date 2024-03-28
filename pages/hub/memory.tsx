import Layout from 'components/layout/Web3Layout';
import HubMemoryPage from 'components/pages/hub/HubMemoryPage';
import Head from 'next/head';

export default function Hub() {
  return (<>
    <Head>
      <title>Battlemon Memory Hub</title>
    </Head>
    <Layout>
      <HubMemoryPage />
    </Layout>
  </>);
};
