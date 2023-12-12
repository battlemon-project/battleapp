import Layout from 'components/layout/Web3Layout';
import Head from 'next/head';
import { useLemonAddToWhitelist } from 'hooks/generated'
import { useAccount } from 'wagmi';
import { useState } from 'react';

export default function Whitelist() {
  const [addresses, setAddresses] = useState<`0x${string}`[]>(['0x']);
  const { address } = useAccount();

  const addToWhitelist = address && useLemonAddToWhitelist({
    address: process.env.NEXT_PUBLIC_CONTRACT_LEMONS as '0x',
    args: [addresses]
  })

  const handleAddButton = () => {
    addToWhitelist?.write()
  }

  function update(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    const newAddresses = [...addresses];
    if (newAddresses[index]) {
      newAddresses[index] = event.target.value as `0x${string}`
    }
    setAddresses(newAddresses);
  }

  return (<>
    <Head>
      <title>Whitelist</title>
    </Head>
    <Layout>
      <div className="container">
        {addresses.map((address, index) => {
          return (
            <input
              key={index + address}
              className='form-control w-100 my-1'
              type="text"
              value={address}
              onChange={event => update(index, event)}
            />
          );
        })}
        <button className='btn btn-info' onClick={() => setAddresses([...addresses, '0x'])}>Add new</button> &nbsp;
        <button className='btn btn-success' onClick={handleAddButton}>Add to whitelist</button>
      </div>
    </Layout>
  </>);
};
