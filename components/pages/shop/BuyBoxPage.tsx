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
      {/* <Link href="/shop">
        <button className='btn btn-outline-light'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left mb-05" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          <span className='ps-2'>Back to Shop</span>
        </button>
      </Link> */}
      
      {warning ? <>
        <div className="alert alert-danger text-center" role="alert">
          Warning! API3 Oracle is running, wait until you will get your prize.
        </div>
      </> : <>
        <br /><br /><br />
      </>}
      {(() => {
        if (!isSignedIn || !isSupportedChain) {
          return <div className='row justify-content-center'>
            <div className='col-4'>
              <SignInButton />
            </div>
          </div>
        } else {
          return <>
            <div style={{height: '400px'}}>
              <BoxScene name='Basket_Chests_LP_oneReward' debug={false} />
            </div>
            <div className='row'>
              <div className='col-md-4 col-12'>
                <BuyBox boxType={BoxType.Cheap} />
              </div>
              <div className='col-md-4 col-12'>
                <BuyBox boxType={BoxType.Good} />
              </div>
              <div className='col-md-4 col-12'>
                <BuyBox boxType={BoxType.Great} />
              </div>
            </div>
          </>}
      })()}

    </div>
  </>);
};