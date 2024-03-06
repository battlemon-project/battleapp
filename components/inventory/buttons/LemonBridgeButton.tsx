import cn from 'classnames';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLayerZeroBridgeLemon } from 'hooks/useLayerZeroBridgeLemon';
import type { BridgeLemonArray } from 'hooks/useLayerZeroQuoteLemon'

interface LemonBridgeProps {
  tokenId: number,
  dataArray: BridgeLemonArray,
  chainId: number
}

export default function LemonBridgeButton({ tokenId, dataArray, chainId }: LemonBridgeProps) {
  const { lemonBridge, lemonBridgeStatus } = useLayerZeroBridgeLemon({
    tokenId,
    dataArray,
    chainId
  });

  const handleLemonBridge = async () => {
    lemonBridge()
  }

  useEffect(() => {
    console.log('bridge status', lemonBridgeStatus)
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