import EmptyLayout from 'components/layout/EmptyLayout';
import SandboxPage from 'components/pages/generator/SanboxPage';
import Head from 'next/head';

export default function Sandbox() {
  return (<>
    <Head>
      <title>Battlemon Sandbox</title>
    </Head>
    <EmptyLayout>
      <SandboxPage />
    </EmptyLayout>
  </>);
};
