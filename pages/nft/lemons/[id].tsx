import EmptyLayout from 'components/layout/EmptyLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { getFromStorage } from 'utils/fetcher';

export default function NftLemon() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR({
    contract: process.env.NEXT_PUBLIC_CONTRACT_LEMONS!,
    tokenId: id 
  }, getFromStorage, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false
  })


  return (<>
    <Head>
      <title>NFT Lemon</title>
    </Head>
    <EmptyLayout>
      <>
        {data?.image && <img src={data?.image} />}
      </>
    </EmptyLayout>
  </>);
};
