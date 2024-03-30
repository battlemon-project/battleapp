import cn from "classnames";
import useWindowSize from "hooks/useWindowSize";
import Link from "next/link";
import { truncate } from "utils/misc";
import { useCookies } from 'react-cookie';
import useAuth from "context/AuthContext";
import { useEffect, useState } from "react";
import { StatusType } from "hooks/useBuyBox";
import { useNetwork } from "wagmi";
import SetReferralButton from "./SetReferralButton";
import ClipboardCopy from "components/inventory/layout/ClipboardCopy";

export default function ReferralPage({ address }: { address: `0x${string}` }) {
  const { chain } = useNetwork()
  const [ referralStatus, setReferralStatus ] = useState<StatusType>('idle')
  const { refProgram } = useAuth();
  const [cookies] = useCookies([
    'referral_program'
  ]);
  const size = useWindowSize()

  useEffect(() => {
    if (referralStatus !== 'success') return;
    setTimeout(() => {
      refProgram.refreshReferral?.()
    }, 1000)
  }, [referralStatus])

  // useEffect(() => {
  //   if (!myReferral) return;
  // }, [myReferral])

  return (<>
    <div className="container mt-1" style={{minHeight: 'calc(100vh - 250px)'}}>
      <h3 className='text-center mx-auto mb-5'>Referral Program</h3>
      <div className="row">
        <div className="col-5 d-none d-lg-block">
          <div className="position-relative" style={{padding: '0 100px'}}>
            <svg className="img-fluid" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 512 640" fill="#fff"><path d="M129.7,108.3c-30.3,0-45.6,36.8-24.1,58.3c21.4,21.5,58.3,6.2,58.3-24.2C163.8,123.6,148.5,108.3,129.7,108.3L129.7,108.3z   M150.7,184.7h-42.2c-26.2,0-47.7,21.5-47.7,47.7V250h137.5v-17.6C198.4,206.2,176.9,184.7,150.7,184.7L150.7,184.7z M256.1,40.7  c-30.2-11.2-63.8,4.1-75,34.2c-6.7,18.1-4.2,38.8,7.7,54.9c2.3,3.1,4.8,6,7.6,8.5c1.9,1.5,3,3.9,2.5,6.5l-1.9,9.3l9-5  c1.8-1.2,4.1-1.4,6.1-0.5c30.8,13.6,66.5-1.4,78.3-32.9C301.6,85.6,286.2,51.9,256.1,40.7L256.1,40.7z M265.1,92.1  c3.6,0,6.5,2.9,6.5,6.5c0,3.6-2.9,6.5-6.5,6.5h-55c-3.6,0-6.5-2.9-6.5-6.5c0-3.6,2.9-6.5,6.5-6.5H265.1z M265.1,116.8  c3.6,0,6.5,2.9,6.5,6.5c0,3.6-2.9,6.5-6.5,6.5h-55c-3.6,0-6.5-2.9-6.5-6.5c0-3.6,2.9-6.5,6.5-6.5H265.1z M265.1,67.3  c3.6,0,6.5,2.9,6.5,6.5c0,3.6-2.9,6.5-6.5,6.5h-55c-3.6,0-6.5-2.9-6.5-6.5c0-3.6,2.9-6.5,6.5-6.5H265.1z M382.4,108.3  c-29.8,0-44.9,36.2-23.8,57.3c21.1,21.1,57.3,6.1,57.3-23.8C416,123.3,400.9,108.3,382.4,108.3L382.4,108.3z M403.4,184.7h-42.2  c-26.2,0-47.7,21.5-47.7,47.7V250h137.5v-17.6C451.1,206.2,429.7,184.7,403.4,184.7L403.4,184.7z M128.5,335.8  c-29.2,0-43.9,35.5-23.3,56.1c20.7,20.7,56.2,6,56.2-23.2C161.4,350.6,146.6,335.8,128.5,335.8L128.5,335.8z M149.2,410.9h-41.4  c-25.7,0-46.8,21.1-46.8,46.8V475H196v-17.3C196,432,174.9,410.9,149.2,410.9L149.2,410.9z M360.3,288.1c-24,0-43.5,19.5-43.5,43.5  s19.5,43.5,43.5,43.5s43.5-19.5,43.5-43.5S384.3,288.1,360.3,288.1L360.3,288.1z M387.5,386.6h-54.4c-35,0-63.6,28.6-63.6,63.6V475  h181.6v-24.8C451.1,415.2,422.5,386.6,387.5,386.6L387.5,386.6z M228.2,215.6c-3.3,0-6-2.7-6-6c0-3.3,2.7-6,6-6h32.9  c-7.5-4.4-1-14.4,5.6-10.6l19.6,11.3c4.1,2.3,4.1,8.1,0.1,10.4L266.8,226c-2.9,1.6-6.5,0.7-8.2-2.2c-1.6-2.9-0.7-6.5,2.4-8.2H228.2z   M122.3,268.9c0-3.3,2.7-6,6-6c3.3,0,6,2.7,6,6V290c4.3-7.5,14.4-1,10.5,5.6l-11.3,19.6c-2.3,4-8.1,4-10.4,0l-11.3-19.6  c-1.6-2.9-0.7-6.5,2.2-8.2c2.9-1.6,6.5-0.7,8.2,2.3V268.9z M209.5,279.1c-2.4-2.3-2.5-6.1-0.2-8.5c2.3-2.4,6.1-2.5,8.4-0.2  l53.4,51.2c-2.4-8.2,9.2-11.1,11.4-3.7l6.3,21.5c1.4,4.6-2.7,8.7-7.1,7.6l-22-5.3c-7.5-1.8-5.1-13.5,3.1-11.6L209.5,279.1z"/></svg>
          </div>
        </div>
        <div className={cn('col-lg-7 col-12 position-relative mx-0')}>
          {refProgram.myReferral ? <>
            <h5>Your Invited By: {truncate(refProgram.myReferral, 8)}</h5>
            <div className="mt-3" style={{background: 'rgba(0,0,0,0.9)', color: '#fff', border: '3px solid rgba(200,200,200,0.14)', borderRadius: '10px', padding: '10px 15px'}}>
              Congratulations!<br />
              You have a 5% discount for all purchases.<br />
            </div>
          </> : cookies.referral_program ? <>
            <h5>You Invited By: {truncate(cookies.referral_program, 8)}</h5>
            <div className="mt-3" style={{background: 'rgba(0,0,0,0.9)', color: '#fff', border: '3px solid rgba(200,200,200,0.14)', borderRadius: '10px', padding: '10px 15px'}}>
              Invited user receives a 5% discount for all purchases.<br />
              If you invite a user, then you receive 5% of his purchases.
            </div>
            <div className="mt-3 mb-2">
              <SetReferralButton address={address as '0x'} referral={cookies.referral_program as '0x'} setReferralStatus={setReferralStatus} chainId={chain?.id} />
            </div>
          </> : <>
            <h5>Nobody Invite you yet.</h5>
            <div className="mt-3" style={{background: 'rgba(0,0,0,0.9)', color: '#fff', border: '3px solid rgba(200,200,200,0.14)', borderRadius: '10px', padding: '10px 15px'}}>
              Invited user receives a 5% discount on all purchases.<br />
              If you invite a user, then you receive 5% of his purchases.
            </div>
          </> }
          

          <br />
          <h6>Your Referral Link:</h6>
          <div className="my-3">
            <ClipboardCopy copyText={`https://battlemon.com/referral?${address}`} />
          </div>
          You can create short url using <Link href="https://t.ly/" style={{ textDecoration: 'underline' }} target="_blank">https://t.ly/</Link> or another service.
        </div>
      </div>
    </div>
  </>);
};
