import Layout from 'components/Layout';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAccount} from 'wagmi';
import HomeScene from 'scenes/Home'

const Home: NextPage = () => {
  const { address } = useAccount();

  return (<>
    <Head>
      <title>Web3 App</title>
    </Head>
    <Layout>
      <HomeScene />
      <div className="position-relative pt-5">
        <div className="container pt-5">
          <div className="row">
            <div className="col-6">
              123
            </div>
            <div className="col-6">
              123
            </div>
          </div>
        </div>
      </div>
    </Layout>
  </>);
};

export default Home;
