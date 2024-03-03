import cn from 'classnames';
import styles from './shop.module.css'
import BuyBox from './buttons/BuyBox';
import { BoxType, PrizeType, prizes } from 'hooks/useBuyBox';
import BoxScene from './scenes/BoxScene';
import { useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { decodeEventLog, parseAbi } from 'viem';
import { useBoxStore } from './store/boxStore';
import useWebSocket from 'react-use-websocket';

export default function BuyBoxPage() {
  const { address }  = useAccount();
  const { chain } = useNetwork();
  const { setPrize } = useBoxStore()
  const { lastMessage, sendMessage } = useWebSocket(process.env.NEXT_PUBLIC_SUBQUERY_IP!, {
    onOpen: () => {
      const query = `
        subscription {
          eventUsers(
            id:"${address}_${chain?.id}_box",
          ) {
            id,
            _entity
          }
        }
      `
      sendMessage(JSON.stringify({
        type: 'start',
        id: 1,
        payload: { query }
      }))
    },
    //shouldReconnect: (closeEvent) => true,
  });



  // useEffect(() => {
  //   if (!chain || !address) return;


    
  //   const webSocket = new WebSocket(process.env.NEXT_PUBLIC_SUBQUERY_IP!, "graphql-ws");
  
  //   webSocket.onopen = event => {
  //     webSocket.send(JSON.stringify({
  //       type: 'start',
  //       id: 1,
  //       payload: { query }
  //     }))
  //   }

  //   webSocket.onmessage = event => {
  //     const data = JSON.parse(event.data as string)
  //     if (data.type !== 'data') return
  //     const { data: logData, topics } = data.payload.data.eventUsers._entity

  //     const decoded = decodeEventLog({
  //       abi: parseAbi(['event Prize(bytes32, address, uint)']),
  //       data: logData,
  //       topics: topics
  //     })
  //     console.log(decoded)
  //     const prize = prizes[Number(decoded.args[2])]
  //     setPrize(prize)
  //   }
    
  //   return () => {
  //     webSocket.close();
  //   }
  // }, [chain, address])

  return (<>
    <div className="container py-3 mb-auto">
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
    </div>
  </>);
};