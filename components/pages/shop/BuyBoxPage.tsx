import cn from 'classnames';
import styles from './shop.module.css'
import Link from 'next/link';
import BuyBox from './buttons/BuyBox';
import useAuth from 'context/AuthContext';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { truncate } from 'utils/misc';
import { BoxType, PrizeType, prizes } from 'hooks/useBuyBox';
import { SignInButton } from './buttons/SignInButton';
import BoxScene from './scenes/BoxScene';
import { useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { decodeEventLog, parseAbi } from 'viem';
import { useBoxStore } from './store/boxStore';

export default function BuyBoxPage() {
  const { address }  = useAccount();
  const { chain } = useNetwork();
  const [ warning, setWarning ] = useState<boolean>(false)
  const { setPrize, status, prize } = useBoxStore()
  const { isSignedIn, isSupportedChain } = useAuth();


  useEffect(() => {
    if (['process', 'success'].includes(status) && !prize) {
      setWarning(true)
    } else {
      setWarning(false)
    }
  }, [status, prize])


  useEffect(() => {
    if (!chain || !address) return;

    const query = `
      subscription {
        eventUsers(
          id:"${address}_${chain.id}_box",
        ) {
          id,
          _entity
        }
      }
    `
    
    const webSocket = new ReconnectingWebSocket(process.env.NEXT_PUBLIC_SUBQUERY_IP!, "graphql-ws");
  
    webSocket.onopen = event => {
      webSocket.send(JSON.stringify({
        type: 'start',
        id: 1,
        payload: { query }
      }))
    }

    webSocket.onmessage = event => {
      const data = JSON.parse(event.data as string)
      if (data.type !== 'data') return
      const { data: logData, topics } = data.payload.data.eventUsers._entity

      const decoded = decodeEventLog({
        abi: parseAbi(['event Prize(uint, bytes32, address, uint)']),
        data: logData,
        topics: topics
      })
      console.log(decoded)
      const prize = prizes[Number(decoded.args[3])]
      setPrize(prize)
    }
    
    return () => {
      webSocket.close();
    }
  }, [chain, address])


  return (<>
    <div className="container py-3 mb-auto">
      <h3 className='text-center'>Get your Prize</h3>
      
      {warning ? <>
        <div className="alert alert-primary text-center py-2" style={{fontSize: '18px', margin: '17px 0'}} role="alert">
          Please wait, API3 Oracle is running.
        </div>
      </> : <>
        <br /><br /><br />
      </>}

      <div style={{height: '400px'}} key={chain?.id}>
        <BoxScene name='Basket_Chests_LP_oneReward' debug={false} chainId={chain?.id} />
      </div>
      {isSignedIn && isSupportedChain && chain ? <>
        <div className='row'>
            <div className='col-md-4 col-12'>
              <BuyBox boxType={BoxType.Cheap} chainId={chain.id} />
            </div>
            <div className='col-md-4 col-12'>
              <BuyBox boxType={BoxType.Good} chainId={chain.id} />
            </div>
            <div className='col-md-4 col-12'>
              <BuyBox boxType={BoxType.Great} chainId={chain.id} />
            </div>
        </div>
      </> : <>
        <div className='row justify-content-center'>
          <div className='col-4'>
            <SignInButton />
          </div>
        </div>
      </>}

    </div>
  </>);
};