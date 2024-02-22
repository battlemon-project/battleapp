import EmptyLayout from 'components/layout/EmptyLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { getFromStorage } from 'utils/fetcher';
import { useContract } from 'hooks/useContract';

export default function NftLemon() {
  const NEXT_PUBLIC_CONTRACT_LEMONS = useContract('LEMONS')
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR({
    contract: NEXT_PUBLIC_CONTRACT_LEMONS!,
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
