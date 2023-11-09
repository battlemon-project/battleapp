import Layout from 'components/layout/Web3Layout';
import HubItemsPage from 'components/pages/hub/HubItemsPage';
import Head from 'next/head';

export default function Hub() {
  return (<>
    <Head>
      <title>Battlemon Items Hub</title>
    </Head>
    <Layout>
      <HubItemsPage />
    </Layout>
  </>);
};
