import Layout from 'components/layout/Web3Layout';
import HubLemonsPage from 'components/pages/hub/HubLemonsPage';
import Head from 'next/head';

export default function Hub() {
  return (<>
    <Head>
      <title>Battlemon Lemons Hub</title>
    </Head>
    <Layout>
      <HubLemonsPage />
    </Layout>
  </>);
};
