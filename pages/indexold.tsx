import Layout from 'components/layout/Web3Layout';
import type { NextPage } from 'next';
import Head from 'next/head';
import IndexPage from 'components/pages/index/IndexPage';

const Home: NextPage = () => {

  return (<>
    <Head>
      <title>Web3 App</title>
    </Head>
    <Layout hideDesktopMenu={true} fixedTop={true}>
      <IndexPage />
    </Layout>
  </>);
};

export default Home;
