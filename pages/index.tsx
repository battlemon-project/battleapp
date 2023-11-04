import Layout from 'components/Layout';
import type { NextPage } from 'next';
import Head from 'next/head';
import IndexPage from 'scenes/Index/IndexPage';

const Home: NextPage = () => {

  return (<>
    <Head>
      <title>Web3 App</title>
    </Head>
    <Layout>
      <IndexPage />
    </Layout>
  </>);
};

export default Home;
