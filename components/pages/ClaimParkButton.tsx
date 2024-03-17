import cn from 'classnames';
import styles from './Claim.module.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLineaParkMint } from 'hooks/useLineaParkMint';
import { useCookies } from 'react-cookie';

interface ClaimParkProps {
  chainId: number
}

export default function ClaimParkButton({ chainId }: ClaimParkProps) {
  const [cookies, setCookie] = useCookies(['check_mint']);
  const { parkMint, parkMintStatus, estimateGas } = useLineaParkMint();


  const handleParkMint = async () => {
    estimateGas().then(({ gas, gasPrice }) => {
      parkMint(chainId == 59144 ? {} : { gas, gasPrice })
    }).catch(e => {
      let message = (e as any).message;
      message = message.split('Raw Call Arguments')[0];
      message = message.split('Request Arguments')[0];
      message = message.split('Contract Call')[0];
      toast.error(message)
    })
  }

  useEffect(() => {
    if (parkMintStatus == 'success') {
      setCookie('check_mint', 'true');
    }
  }, [parkMintStatus])
  
  return (<>
    <button
      onClick={handleParkMint}
      className={`btn btn-success btn-lg px-4 py-3 w-100 ${styles.mint_btn}`}>
        { parkMintStatus == 'loading' || parkMintStatus == 'process' ? 
          <span className="spinner-border spinner-border-sm" role="status"></span> :
          <>MINT</>
        }
    </button>
  </>
  );
};