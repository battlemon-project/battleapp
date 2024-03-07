import cn from 'classnames';
import { useEffect } from 'react';
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
  const { lemonBridge, lemonBridgeStatus } = useLayerZeroBridgeLemon({
    tokenId,
    dataArray,
    chainId
  });

  const handleLemonBridge = async () => {
    lemonBridge()
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