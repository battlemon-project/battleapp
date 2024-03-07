import cn from 'classnames';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLayerZeroBridgeItem } from 'hooks/useLayerZeroBridgeItem';
import type { BridgeItemArray } from 'hooks/useLayerZeroQuoteItem'
import { useItemStore } from '../store/itemStore';

interface ItemBridgeProps {
  tokenId: number,
  dataArray: BridgeItemArray,
  chainId: number
}

export default function ItemBridgeButton({ tokenId, dataArray, chainId }: ItemBridgeProps) {
  const { updateStore } = useItemStore();
  const { itemBridge, itemBridgeStatus } = useLayerZeroBridgeItem({
    tokenId,
    dataArray,
    chainId
  });

  const handleItemBridge = async () => {
    itemBridge()
  }

  useEffect(() => {
    if (itemBridgeStatus !== 'success') return;
    updateStore({ selectedItems: [], stage: 'Start' })
  }, [itemBridgeStatus])


  return (<>
    <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100', { disabled: tokenId < 0 })} onClick={handleItemBridge}>
      { itemBridgeStatus == 'loading' || itemBridgeStatus == 'process' ? 
        <div className="spinner-border spinner-border-sm" role="status"></div> :
        <>Approve</>
      }
    </button>
  </>
  );
};