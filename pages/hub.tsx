import Layout from 'components/layout/Web3Layout';
import Head from 'next/head';

export default function Hub() {
  return (<>
    <Head>
      <title>Battlemon Hub</title>
    </Head>
    <Layout paddingTop={80}>
      <div className="container">
        <h1 className="text-center">HUB</h1>
      </div>
    </Layout>
  </>);
};
