import Timer from 'components/layout/Timer';
import Layout from 'components/layout/Web3Layout';
import Head from 'next/head';

export default function Referral() {
  return (<>
    <Head>
      <title>Battlemon Referral</title>
    </Head>
    <Layout>
      <div className="container text-center">
        <h4>Referral Program is coming in <Timer deadline={1712064400000} onFinished={() => {}} isDays={true} /></h4>
      </div>
    </Layout>
  </>);
};
