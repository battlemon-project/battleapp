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
import Timer from 'components/layout/Timer';


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
            <a href="https://element.market/collections/battlemon-linea-park" className="d-flex rounded-3 btn btn-primary w-100 mt-3 py-2 align-items-center justify-content-center fs-15" target='_blank'>
              <img src="https://element.market/resource/images/favicon-32.png" />
              <span>&nbsp; Battlemon Linea Park on Element &nbsp; </span>
            </a>
          </div>
        </div>
        <div className="col-12 col-md-7 order-md-2">
          
          <div className={cn('p-3 py-4 rounded-4 mb-4', shopStyles.lightBg)}>
            <p className="mb-3">Step into the "Voyage Linea Park" GameFi event with our special edition NFT, crafted to enrich your gaming experience. This token, powered by zkRollup technology on Layer 2 (L2), not only stands as a testament to your journey within the game, but also boosts your ability to earn Battlemon Points (BP)</p>
            <div className="d-flex justify-content-between mb-2">
              <b>Event end in</b>
              <div><Timer deadline={1712264400000} onFinished={() => {}} isDays={true} /></div>
            </div>
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
              <svg width="40" viewBox="0 0 300 271" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"/>
              </svg>
            </div>
            <div className="col px-2 d-flex flex-row align-items-center">
              <p className="mb-1">
                <b>Follow us on X</b>
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
