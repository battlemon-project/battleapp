import Layout from 'components/Layout';
import Head from 'next/head';

export default function Labs() {
  return (<>
    <Head>
      <title>Battlemon Labs</title>
    </Head>
    <Layout paddingTop={100}>
      <div className="container">
        <h1 className="text-center">LABS</h1>
      </div>
    </Layout>
  </>);
};
