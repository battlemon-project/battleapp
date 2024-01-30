import Layout from 'components/layout/Web3Layout';
import HubStickersPage from 'components/pages/hub/HubStickersPage';
import Head from 'next/head';

export default function Hub() {
  return (<>
    <Head>
      <title>Battlemon Stickers Hub</title>
    </Head>
    <Layout>
      <HubStickersPage />
    </Layout>
  </>);
};
