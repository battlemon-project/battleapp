import Layout from 'components/layout/Web3Layout';
import HubPickaxesPage from 'components/pages/hub/HubPickaxesPage';
import Head from 'next/head';

export default function Hub() {
  return (<>
    <Head>
      <title>Battlemon Pickaxes Hub</title>
    </Head>
    <Layout>
      <HubPickaxesPage />
    </Layout>
  </>);
};
