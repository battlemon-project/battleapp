import cn from 'classnames';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLineaParkSetApprovalForAll } from 'hooks/generated';
import { StatusType } from 'hooks/useBuyBox';
import { useWaitForTransaction } from 'wagmi';

interface ParkApproveProps {
  chainId: number
  contract: `0x${string}`
  boxesContract: `0x${string}`
  setIsApproved: Dispatch<SetStateAction<boolean>>
}

export default function ParkApprove({ contract, boxesContract, chainId, setIsApproved }: ParkApproveProps) {
  const [ status, setStatus ] = useState<StatusType>('idle')

  const setApproval = useLineaParkSetApprovalForAll({
    address: contract as '0x',
    args: [boxesContract, true],
    onError: (error) => {
      let message = error.message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    }
  })

  const setApprovalResult = useWaitForTransaction({ hash: setApproval?.data?.hash });

  const handleApprove = () => {
    setApproval?.write()
  }

  useEffect(() => {
    if (setApproval?.status === 'success') {
      setStatus('process')
    }    
    if (setApproval?.status === 'loading') {
      setStatus('loading');
    };
    if (setApproval?.status === 'error') {
      setStatus('error');
    };
  }, [setApproval?.status])

  
  useEffect(() => {
    if (!setApprovalResult.isSuccess) return;
    setIsApproved(true);
    setStatus('success')
  }, [setApprovalResult.isSuccess])

  return (<>
    <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100')} onClick={handleApprove}>
      { status == 'loading' || status == 'process' ? 
        <div className="spinner-border spinner-border-sm" role="status"></div> :
        <>Approve</>
      }
    </button>
  </>
  );
};