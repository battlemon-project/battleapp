import Layout from 'components/Layout';
import Head from 'next/head';

export default function Mining() {
  return (<>
    <Head>
      <title>Battlemon Mining</title>
    </Head>
    <Layout paddingTop={100}>
      <div className="container">
        <h1 className="text-center">MINING</h1>
      </div>
    </Layout>
  </>);
};
