import { useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { decodeEventLog, parseAbi } from 'viem';
import { toast } from 'react-toastify';
import { PrizeType, prizes } from 'hooks/useBuyBox';
import EventIcon from './EventIcon';
import { useTaskQueue, Task } from 'hooks/useTaskQueue'
import { useAccount } from 'wagmi';

export default function BuyEvents() {
  const { address } = useAccount()
  const { addTask } = useTaskQueue({ shouldProcess: true })
  useEffect(() => {
    const query = `
      subscription {
        eventUsers {
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
      const { data: logData, topics, transaction_hash, chain_id } = data.payload.data.eventUsers._entity

      const decoded = decodeEventLog({
        abi: parseAbi(['event Prize(uint, bytes32, address, uint)']),
        data: logData,
        topics: topics
      })
      //console.log(decoded);
      const prize = prizes[Number(decoded.args[3])];

      addTask(
        () => new Promise((resolve, reject) => {
          const youWin = address && decoded.args[2] && address.toLowerCase() == decoded.args[2].toLowerCase();
          toast.info(<EventIcon prize={prize} hash={transaction_hash} text={youWin ? 'You Win!' : 'New Winner!'} chain_id={chain_id} />, {
            position: "top-right",
            autoClose: 3500,
            closeOnClick: false,
            hideProgressBar: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            className: youWin ? 'youwin' : '',
            icon: false,
          })
          setTimeout(() => {
            resolve();
          }, 5000)
        })
      )

    }
    
    return () => {
      webSocket.close();
    }
  }, [])

  return <></>
}