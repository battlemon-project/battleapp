import { useEffect, useState } from 'react';
import PolSymbol from 'components/layout/PolSymbol';
import cn from 'classnames';
import styles from './Claim.module.css';
import shopStyles from './shop/shop.module.css'
import { truncate } from 'utils/misc';
import { SignInButton } from './shop/buttons/SignInButton';
import ClaimParkButton from './ClaimParkButton';
import { useChainModal } from '@rainbow-me/rainbowkit';
import { useContract } from 'hooks/useContract';
import useAuth from 'context/AuthContext';
import BuyGoldenKey from './shop/buttons/BuyGoldenKey';
import Timer from 'components/layout/Timer';


export default function GoldenKeyPage() {
  const NEXT_PUBLIC_CONTRACT_KEY = useContract('KEY')
  const { chain, address } = useAuth();
  const { openChainModal } = useChainModal();

  return (<>
    <div className="container mt-1" style={{minHeight: 'calc(100vh - 250px)'}}>
      
      <h3 className='text-center mx-auto mb-5'>Buy Golden Key</h3>
      <div className="row">
        <div className="col-12 col-md-5 d-flex flex-column mb-3">
          <video autoPlay={true} muted preload="auto" loop className='w-100 mx-auto' style={{maxWidth: '400px'}}>
            <source src="/media/Keycard.webm" type="video/webm" />
          </video>
          
          <p className="mx-3 rounded-3 mb-4" style={{borderLeft: '5px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.1)', padding: '8px 15px', fontSize: '15px'}}>
            Golden single KEY open single BOX once per 24H;<br />
            You are guaranteed to receive points in the BOX;<br />
            The purchased KEY never breaks.
          </p>
        </div>
        <div className="col-12 col-md-7">
          
          <div className={cn('p-3 py-4 rounded-4 mb-4', shopStyles.lightBg)}>
            <p className="mb-1">Omnichain NFT with built-in Battlemon Points miner and the ability to open a special box BOX a day</p>
            <p className="mb-3">70% of the funds collected from the sale of “golden keys” will go to the LXP-L earning pool, most of which will be distributed among BP holders</p>
            <div className="d-flex justify-content-between mb-2">
              <b>When the timer ends, all unsold NFTs will be burned</b>
              <div style={{fontSize: '18px'}}><Timer deadline={1713433238000} onFinished={() => {}} isDays={true} /></div>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <b>Contract Address</b>
              <div>{truncate(NEXT_PUBLIC_CONTRACT_KEY, 8)}</div>
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
          <div className='order-md-2 mb-3'>
            {address ? <>
              {chain && chain?.id !== 137 ? <BuyGoldenKey chain={chain} contract={NEXT_PUBLIC_CONTRACT_KEY!} address={address} /> : <>
                <button className='btn btn-lg btn-outline-light w-100' onClick={openChainModal} type="button">
                  Switch to Linea Network
                </button>
              </>}
            </> : <>
                <SignInButton />
            </>}
          </div>
          <div className="row">
            <div className="col-6">
              <a href={`https://element.market/assets/linea/0x534F9515875B0FA3103ea78031217632Cac8c3D0`} className="d-flex rounded-3 btn btn-primary w-100 mt-3 py-2 align-items-center justify-content-center fs-18" target='_blank'>
                <img src="https://element.market/resource/images/favicon-32.png" />
                <span>&nbsp; Keys on Element</span>
              </a>
            </div>
                
            <div className="col-6">
              <a href={`/game`} className="d-flex rounded-3 btn btn-default w-100 mt-3 py-2 align-items-center justify-content-center fs-18">
                <img src="/images/shop/boxicon.png" height="29" className='rounded-4' />
                <span>&nbsp; Open BOX</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
};
