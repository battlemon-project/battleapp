import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useAccount, useNetwork } from 'wagmi';
import PolSymbol from 'components/layout/PolSymbol';
import cn from 'classnames';
import styles from './Claim.module.css';
import shopStyles from './shop/shop.module.css'
import { truncate } from 'utils/misc';
import { SignInButton } from './shop/buttons/SignInButton';
import ClaimParkButton from './ClaimParkButton';
import { useChainModal } from '@rainbow-me/rainbowkit';


export default function ClaimPage() {
  const { chain } = useNetwork();
  const { openChainModal } = useChainModal();
  const { isConnected } = useAccount();
  const [checkFollow, setCheckFollow] = useState(false);
  const [checkJoin, setCheckJoin] = useState(false);
  const [checkMint, setCheckMint] = useState(false);
  const [cookies, setCookie] = useCookies([
    'check_twitter',
    'check_telegram',
    'check_mint'
  ]);

  const checkTwitterFollow = () => {
    setTimeout(() => {
      setCookie('check_twitter', 'true');
    }, 3000);
  };

  const checkTelegramJoin = () => {
    setTimeout(() => {
      setCookie('check_telegram', 'true');
    }, 3000);
  };

  useEffect(() => {
    if (isConnected) {
      if (cookies.check_twitter) {
        setCheckFollow(true);
      }
      if (cookies.check_telegram) {
        setCheckJoin(true);
      }
      if (cookies.check_twitter && cookies.check_telegram) {
        setCheckMint(true);
      }
    } else {
      setCheckFollow(false);
      setCheckJoin(false);
      setCheckMint(false);
    }
  }, [cookies, isConnected]);


  return (<>
    <div className="container mt-1" style={{minHeight: 'calc(100vh - 250px)'}}>
      
      <h3 className='text-center mx-auto mb-5'>Claim your NFT</h3>
      <div className="row">
        <div className="col-12 col-md-5 order-1 d-flex flex-column">
          <img src="/images/lineapark.jpg" className='img-fluid rounded-4 order-1' />
          <div className='order-md-2 mb-3'>
            {cookies.check_mint ? (
              <>
                <div
                  className={`${styles.bg_card_description} mt-4 text-center h6 py-3`}
                >
                  You got your NFT. Congratulations!
                </div>
              </>
            ) : (
              <>
                <div className={`mt-4 ${styles.mint_container} ${checkMint ? '' : styles.mint_disabled}`}>

                  {isConnected ? <>
                    {chain?.name.includes('inea') ? <ClaimParkButton chainId={chain.id} /> : <>
                      <button className='btn btn-lg btn-outline-light w-100' onClick={openChainModal} type="button">
                        Switch to Linea Network
                      </button>
                    </>}
                  </> : <>
                      <SignInButton />
                  </>}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-12 col-md-7 order-md-2">
          
          <div className={cn('p-3 py-4 rounded-4 mb-4', shopStyles.lightBg)}>
            <p className="mb-3">Step into the "Voyage Linea Park" GameFi event with our special edition NFT, crafted to enrich your experience subtly. This commemorative token, powered by zkRollup technology on Layer 2 (L2), not only stands as a testament to your journey within the game but also gently boosts your ability to earn Battlemon Points (BP)</p>
            <div className="d-flex justify-content-between mb-2">
              <b>Contract Address</b>
              <div>{truncate(process.env.NEXT_PUBLIC_CONTRACT_LINEA_PARK, 8)}</div>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <b>Token Standard</b>
              <div>ERC721</div>
            </div>
            {chain && <div className="d-flex justify-content-between ">
              <b>Network</b>
              <div className='fs-16'><PolSymbol>{chain.name}</PolSymbol></div>
            </div>}
          </div>
          <div
            className={`shadow p-2 mb-3 rounded d-flex ${styles.bg_card} ${
              checkFollow ? styles.bg_card_done : ''
            }`}
          >
            <div className="col col-auto d-flex justify-content-center px-2">
              <svg
                fill="none"
                viewBox="0 0 26 22"
                width="40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M23.3382 5.66804C23.348 5.89575 23.3545 6.12347 23.3545 6.35441C23.3545 13.3587 17.9887 21.437 8.177 21.437C5.16425 21.437 2.36112 20.5601 0 19.0565C0.417625 19.1049 0.84175 19.1292 1.27238 19.1292C3.77163 19.1292 6.071 18.2829 7.8975 16.8601C5.56237 16.8181 3.59288 15.2854 2.91363 13.1795C3.24025 13.2408 3.57337 13.2731 3.91788 13.2731C4.40375 13.2731 4.875 13.2085 5.3235 13.0874C2.88275 12.6013 1.04487 10.4582 1.04487 7.89029V7.82246C1.76312 8.21976 2.587 8.45878 3.46125 8.48623C2.02963 7.53499 1.08712 5.9119 1.08712 4.07402C1.08712 3.10178 1.35037 2.19091 1.81025 1.40763C4.44112 4.61505 8.372 6.72587 12.805 6.94713C12.714 6.55952 12.6669 6.15415 12.6669 5.7391C12.6669 2.81108 15.0556 0.437012 18.0001 0.437012C19.5357 0.437012 20.9219 1.0814 21.8936 2.11178C23.1091 1.87437 24.2515 1.43347 25.2817 0.826229C24.8836 2.06333 24.037 3.10178 22.9369 3.75909C24.0159 3.62989 25.0429 3.34565 26 2.92413C25.285 3.98681 24.3799 4.92028 23.3382 5.66804Z"
                  fill="#fff"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <div className="col px-2 d-flex flex-row align-items-center">
              <p className="mb-1">
                <b>Follow us on Twitter</b>
              </p>
            </div>
            <div className="col text-end">
              <a
                target="_blank"
                rel="noreferrer"
                className={`btn btn-lg ${styles.bg_card_btn}`}
                onClick={checkTwitterFollow}

                href="https://twitter.com/BATTLEM0N"
              >
                {checkFollow ? 'Done' : 'Follow'}
              </a>
            </div>
          </div>
          <div
            className={`shadow p-2 mb-3 rounded ${styles.bg_card} ${
              !checkFollow ? styles.bg_card_disabled : ''
            } ${checkJoin === true ? styles.bg_card_done : ''}`}
          >
            <div className="d-flex">
              <div className="col col-auto d-flex justify-content-center px-2">
                <svg width="40" id="Social_Media_Icons" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><defs></defs><path fill="#fff" d="M477,43.86,13.32,223.29a5.86,5.86,0,0,0-.8.38c-3.76,2.13-30,18.18,7,32.57l.38.14,110.41,35.67a6.08,6.08,0,0,0,5.09-.62L409.25,120.57a6,6,0,0,1,2.2-.83c3.81-.63,14.78-1.81,7.84,7-7.85,10-194.9,177.62-215.66,196.21a6.3,6.3,0,0,0-2.07,4.17l-9.06,108a7.08,7.08,0,0,0,2.83,5.67,6.88,6.88,0,0,0,8.17-.62l65.6-58.63a6.09,6.09,0,0,1,7.63-.39l114.45,83.1.37.25c2.77,1.71,32.69,19.12,41.33-19.76l79-375.65c.11-1.19,1.18-14.27-8.17-22-9.82-8.08-23.72-4-25.81-3.56A6,6,0,0,0,477,43.86Z" id="Telegram"/></svg>
              </div>
              <div className="col px-2 d-flex flex-row align-items-center">
                <p className="mb-1">
                  <b>Join Telegram</b>
                </p>
              </div>
              <div className="col-auto text-end">
                <a
                  href="https://t.me/Battlemon_Ann"
                  target="_blank"
                  rel="noreferrer"
                  className={`btn btn-lg ${styles.bg_card_btn}`}
                  onClick={checkTelegramJoin}
                >
                  {checkJoin === true ? 'Done' : 'Join'}
                </a>
              </div>
            </div>
          </div>
          
          {/* <div className={styles.bg_card_description}>
            <p>
              Unique Key-card that gives access to the incredible game world of
              Lemoland, full of adventures and NFT treasures.{' '}
            </p>

            <p>
              Unique NFT key-pass will be available in Testnet and also
              transferred to Mainnet.
            </p>

            <div className="d-flex justify-content-between">
              <b>Contract Address</b>
              <div>0x60efdg33a...434iq357c6</div>
            </div>
            <div className="d-flex justify-content-between">
              <b>Token Standard</b>
              <div>ERC721</div>
            </div>
            <div className="d-flex justify-content-between">
              <b>Total minted</b>
              <div>25 Keys</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  </>);
};
