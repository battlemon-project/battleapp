import Layout from 'components/layout/Web3Layout';
import HubGemsPage from 'components/pages/hub/HubGemsPage';
import Head from 'next/head';

export default function Hub() {
  return (<>
    <Head>
      <title>Battlemon Gems Hub</title>
    </Head>
    <Layout>
      <HubGemsPage />
    </Layout>
  </>);
};
