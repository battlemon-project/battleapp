import Layout from 'components/Layout';
import Head from 'next/head';

export default function Hub() {
  return (<>
    <Head>
      <title>Battlemon Hub</title>
    </Head>
    <Layout paddingTop={100}>
      <div className="container">
        <h1 className="text-center">HUB</h1>
      </div>
    </Layout>
  </>);
};
