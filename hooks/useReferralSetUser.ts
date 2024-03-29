import { useReferralSetReferee, referralABI } from './generated';
import { useEffect, useState } from 'react';
import { useFeeData, useWaitForTransaction, usePublicClient } from 'wagmi';
import { toast } from 'react-toastify';
import { StatusType } from './useBuyBox';
import { useContract } from './useContract';

export function useReferralSetUser(address: `0x${string}`, referral: `0x${string}`) {
  console.log('render useReferralSetUser')
  const NEXT_PUBLIC_CONTRACT_REFERRAL = useContract('REFERRAL')
  const publicClient = usePublicClient()
  const [ status, setStatus ] = useState<StatusType>('idle')
  const fee = useFeeData()
   
  const estimateGas = async () => {
    const gas = await publicClient.estimateContractGas({
      address: NEXT_PUBLIC_CONTRACT_REFERRAL as '0x',
      abi: referralABI,
      functionName: 'setReferee',
      account: address as '0x',
      args: [referral],
    })
    const gasPrice = fee?.data?.gasPrice ? fee?.data?.gasPrice * BigInt(2) : undefined
    return {
      gas: gas * BigInt(3),
      gasPrice
    }
  }

  const referralSetUser = useReferralSetReferee({
    address: NEXT_PUBLIC_CONTRACT_REFERRAL as '0x',
    args: [referral],
    onError: (error) => {
      let message = error.message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      console.log('error 4')
      setStatus('error');
      toast.error(message)
    }
  })

  const referralSetUserResult = useWaitForTransaction({ hash: referralSetUser?.data?.hash });
  
  useEffect(() => {
    if (referralSetUser?.status === 'success') {
      setStatus('process');
      return;
    }    
    if (referralSetUser?.status === 'loading') {
      setStatus('loading');
      return;
    };
    if (referralSetUser?.status === 'error') {
      setStatus('error');
      return;
    };
  }, [referralSetUser?.status]);

  useEffect(() => {
    if (!referralSetUserResult.isError) return;
    setStatus('error');
  }, [referralSetUserResult.isError]);
  
  useEffect(() => {
    if (!referralSetUserResult.isSuccess) return;
    setStatus('success');
  }, [referralSetUserResult.isSuccess])

  return {
    estimateGas: estimateGas,
    referralSetUser: referralSetUser?.write || (() => {}),
    referralSetUserStatus: status
  };
}