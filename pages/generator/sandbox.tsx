import EmptyLayout from 'components/layout/EmptyLayout';
import SandboxPage from 'components/pages/generator/SandboxPage';
import Head from 'next/head';

export default function Sandbox() {
  return (<>
    <Head>
      <title>Sandbox</title>
    </Head>
    <EmptyLayout>
      <SandboxPage />
    </EmptyLayout>
  </>);
};
