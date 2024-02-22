import Layout from 'components/layout/Web3Layout';
import Head from 'next/head';
import { useLemonAddToWhitelist } from 'hooks/generated'
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { useContract } from 'hooks/useContract';

export default function Whitelist() {
  const NEXT_PUBLIC_CONTRACT_LEMONS = useContract('LEMONS')
  const [addresses, setAddresses] = useState<`0x${string}`[]>(['0x']);

  const addToWhitelist = useLemonAddToWhitelist({
    address: NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
    args: [addresses]
  })

  const handleAddButton = () => {
    addToWhitelist?.write()
  }

  function update(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newAddresses = event.target.value.split(/\n/) as `0x${string}`[]
    setAddresses(newAddresses.map(x => x.trim() as `0x${string}`).filter(x => x && x.length == 42));
  }

  return (<>
    <Head>
      <title>Whitelist</title>
    </Head>
    <Layout>
      <button className='btn btn-success mt-5' onClick={handleAddButton}>Add to whitelist {addresses?.length || 0} adresses</button>
      <div className="container mx-auto" style={{maxWidth: '800px'}}>
      <textarea style={{height: '1000px'}}
              className='form-control w-100 my-1'
              value={addresses.join('\n')}
              onChange={event => update(event)}
            />
      </div>
    </Layout>
  </>);
};
