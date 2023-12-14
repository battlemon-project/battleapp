import Layout from 'components/layout/Web3Layout';
import Head from 'next/head';

export default function Mining() {
  return (<>
    <Head>
      <title>Battlemon Mining</title>
    </Head>
    <Layout>
      <div className="container text-center">
        <h4>Mining is coming soon...</h4>
        <p className="lead mt-3">
          Here you can mine gems from the mine.<br />
          A pickaxe is needed for mining.
        </p>
      </div>
    </Layout>
  </>);
};
