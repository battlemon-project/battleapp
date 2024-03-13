import cn from 'classnames';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLayerZeroBridgeLemon } from 'hooks/useLayerZeroBridgeLemon';
import type { BridgeLemonArray } from 'hooks/useLayerZeroQuoteLemon';
import { useLemonStore } from '../store/lemonStore';

interface LemonBridgeProps {
  tokenId: number,
  dataArray: BridgeLemonArray,
  chainId: number
}

export default function LemonBridgeButton({ tokenId, dataArray, chainId }: LemonBridgeProps) {
  const { updateStore } = useLemonStore();
  const { estimateGas, lemonBridge, lemonBridgeStatus } = useLayerZeroBridgeLemon({
    tokenId,
    dataArray,
    chainId
  });

  const handleLemonBridge = async () => {
    estimateGas().then(({ gas, gasPrice }) => {
      lemonBridge({ gas, gasPrice });
    }).catch(e => {
      console.log(e)
      let message = (e as any).message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    })
  }

  useEffect(() => {
    if (lemonBridgeStatus !== 'success') return;
    updateStore({ selectedLemons: [], stage: 'Start' })
  }, [lemonBridgeStatus])


  return (<>
    <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100', { disabled: tokenId < 0 })} onClick={handleLemonBridge}>
      { lemonBridgeStatus == 'loading' || lemonBridgeStatus == 'process' ? 
        <div className="spinner-border spinner-border-sm" role="status"></div> :
        <>Approve</>
      }
    </button>
  </>
  );
};