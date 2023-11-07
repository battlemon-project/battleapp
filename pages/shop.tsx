import Layout from 'components/Layout';
import Head from 'next/head';

export default function Shop() {
  return (<>
    <Head>
      <title>Battlemon Shop</title>
    </Head>
    <Layout paddingTop={100}>
    <div className="container py-3">
      <div className="p-4 marketplace-bg rounded-5">
        <div className="d-flex mb-4">
          <div className="col-6">
            <button className="text-center btn w-100 btn-marketplace-top py-3 rounded-4">MARKETPLACE</button>
          </div>
          <div className="col-6">
            <button className="text-center btn w-100 btn-marketplace-top active py-3 rounded-4">LAUNCHPAD</button>
          </div>
        </div>
        <img className="position-relative rounded-4 img-fluid w-100" src="/images/marketplace-frame.png" />
      </div>
    </div>

    </Layout>
  </>);
};
