import cn from 'classnames';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useReferralSetUser } from 'hooks/useReferralSetUser';
import { StatusType } from 'hooks/useBuyBox';
import { useCookies } from 'react-cookie';

interface PickaxeRepairProps {
  address: `0x${string}`
  referral: `0x${string}`
  setReferralStatus: (status: StatusType) => any
  chainId: number | undefined
}

export default function SetReferralButton({ address, referral, setReferralStatus, chainId }: PickaxeRepairProps) {
  const { referralSetUser, referralSetUserStatus, estimateGas } = useReferralSetUser(address, referral);
  const removeCookie = useCookies([
    'referral_program'
  ])[2];

  const handleSetReferral = async () => {
    if (address?.toLocaleLowerCase() == referral?.toLocaleLowerCase()) {
      toast.error("Sender can't be referee");
      removeCookie('referral_program');
      return;
    }
    estimateGas().then(({ gas, gasPrice }) => {
      setReferralStatus('loading')
      referralSetUser(chainId == 59144 ? {} : { gas, gasPrice })
    }).catch(e => {
      setReferralStatus('idle')
      let message = (e as any).message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    })
  }

  useEffect(() => {
    setReferralStatus(referralSetUserStatus)
  }, [referralSetUserStatus])

  return (<>
    <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100')} onClick={handleSetReferral}>
      { referralSetUserStatus == 'loading' || referralSetUserStatus == 'process' ? 
        <div className="spinner-border spinner-border-sm" role="status"></div> :
        <>Confirm</>
      }
    </button>
  </>
  );
};