import Layout from 'components/layout/Web3Layout';
import Head from 'next/head';

export default function Claim() {
  return (<>
    <Head>
      <title>Battlemon Claim</title>
    </Head>
    <Layout>
      <div className="container text-center">
        <h4>Claim is coming soon...</h4>
        <p className="lead mt-3">
          Here you can exchange a level 10 gem for a limited Genesis collection Alpha Lemon.<br />
          Total supply 33333.
        </p>
      </div>
    </Layout>
  </>);
};
