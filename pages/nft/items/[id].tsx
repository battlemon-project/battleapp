import EmptyLayout from 'components/layout/EmptyLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { getFromStorage } from 'utils/fetcher';

export default function NftItem() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR({
    contract: process.env.NEXT_PUBLIC_CONTRACT_ITEMS!,
    tokenId: id 
  }, getFromStorage, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false
  })


  return (<>
    <Head>
      <title>NFT Item</title>
    </Head>
    <EmptyLayout>
      <>
        {data?.image && <img src={data?.image} height="312" width="312" />}
      </>
    </EmptyLayout>
  </>);
};
