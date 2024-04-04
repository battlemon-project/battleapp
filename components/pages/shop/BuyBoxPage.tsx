import cn from 'classnames';
import BuyBox from './buttons/BuyBox';
import useAuth from 'context/AuthContext';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { BoxType, PrizeType, prizes } from 'hooks/useBuyBox';
import { SignInButton } from './buttons/SignInButton';
import BoxScene from './scenes/BoxScene';
import { useEffect, useState } from 'react';
import { decodeEventLog, parseAbi } from 'viem';
import { useBoxStore } from './store/boxStore';
import { useBoxPrices } from 'hooks/useBoxPrices';
import Tippy from 'components/inventory/layout/Tippy';
import BuyBattleBox from './buttons/BuyBattleBox';

export default function BuyBoxPage() {
  const { address, chain }  = useAuth();
  const [ warning, setWarning ] = useState<boolean>(false)
  const { prices: { Cheap, Good, Great }, symbol } = useBoxPrices()
  const [ startProgress, setStartProgress ] = useState<boolean>(false)
  const { setPrize, status, prize } = useBoxStore()
  const { isSignedIn, isSupportedChain } = useAuth();


  useEffect(() => {
    if (['process', 'success'].includes(status) && !prize) {
      setWarning(true)
      setTimeout(() => {
        setStartProgress(true)
      }, 2000)
    } else {
      setWarning(false)
      setStartProgress(false)
    }
  }, [status, prize])


  useEffect(() => {
    if (!chain || !address) return;

    const query = `
      subscription {
        eventUsers(
          id:"${address}_${chain.id}_box",
        ) {
          id,
          _entity
        }
      }
    `
    
    const webSocket = new ReconnectingWebSocket(process.env.NEXT_PUBLIC_SUBQUERY_IP!, "graphql-ws");
  
    webSocket.onopen = event => {
      webSocket.send(JSON.stringify({
        type: 'start',
        id: 1,
        payload: { query }
      }))
    }

    webSocket.onmessage = event => {
      const data = JSON.parse(event.data as string)
      if (data.type !== 'data') return
      const { data: logData, topics } = data.payload.data.eventUsers._entity

      const decoded = decodeEventLog({
        abi: parseAbi(['event Prize(uint, bytes32, address, uint)']),
        data: logData,
        topics: topics
      })
      console.log(decoded)
      const prize = prizes[Number(decoded.args[3])]
      setPrize(prize)
    }
    
    return () => {
      webSocket.close();
    }
  }, [chain, address])


  return (<>
    <div className="container py-3 mb-auto">
      <div className="row">
        <div className="col-xl-5 col-lg-7 col-md-9 col-sm-11 mx-auto">
          {warning ? <div className="position-relative text-center" style={{color: '#052c65', fontSize: '18px', margin: '3px 0 4px', textShadow: '0px 1px rgba(255,255,255,0.3)'}}>
            <div className="progress position-absolute" style={{background: '#cfe2ff', width: '100%', height: '100%' }}>
              <div className={cn("progress-bar progress-bar-striped", {startProgress: startProgress})}role="progressbar"></div>
            </div>
            <div className="position-relative py-1">Please wait, API3 is rolling the quantum dice</div>
          </div> : <>
            {prize ? <h3 className='text-center'>Congratulations!</h3> : <h3 className='text-center'>Get your Prize</h3>}
          </>}
        </div>
      </div>

      <div style={{height: '400px', pointerEvents: 'none'}} key={chain?.id}>
        <BoxScene name='Basket_Chests_LP_oneReward' debug={false} chainId={chain?.id} />
      </div>
      {isSignedIn && isSupportedChain && chain ? <>
        <div className='row' style={{margin: '-30px 0 0 0'}}>
            {chain.id == 137 && <>
              <div className='col-md-4 col-12'>
                <BuyBox boxType={BoxType.Cheap} chainId={chain.id} />
              </div>
              <div className='col-md-4 col-12'>
                <BuyBox boxType={BoxType.Good} chainId={chain.id} />
              </div>
              <div className='col-md-4 col-12'>
                <BuyBox boxType={BoxType.Great} chainId={chain.id} />
              </div>
            </>}
            {chain.id !== 137 && <>
              <div className='col-md-3 col-6'>
                {address && <BuyBattleBox chainId={chain.id} address={address} />}
              </div>
              <div className='col-md-3 col-6'>
                <BuyBox boxType={BoxType.Cheap} chainId={chain.id} />
              </div>
              <div className='col-md-3 col-6'>
                <BuyBox boxType={BoxType.Good} chainId={chain.id} />
              </div>
              <div className='col-md-3 col-6'>
                <BuyBox boxType={BoxType.Great} chainId={chain.id} />
              </div>
            </>}
        </div>
      </> : <>
        <div className='row justify-content-center'>
          <div className='col-md-4 col-sm-6 mb-3'>
            <SignInButton />
          </div>
        </div>
      </>}

      {symbol !== 'Matic' && <p className="mx-3 rounded-3 mb-4" style={{borderLeft: '5px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.1)', padding: '8px 15px', fontSize: '15px'}}>
      70% of the funds collected from the sale of “golden keys” will go to the LXP-Learning pool, most of which will be distributed among BP holders
      </p>}

      <div>
        <div className="row px-3">
          {chain?.id !== 137 && <>
            <div className="col-sm-3">
              <div className="w-100 px-2 py-2 rounded-3 mb-3" style={{background: 'rgba(0,0,0,0.3)'}}>
                <div className="px-2 py-2"><strong>Possible rewards <span className='d-md-none'>for {Cheap} {symbol}</span>:</strong></div>
                <div className="d-flex">
                  <div className="col col-auto">
                    <img className="img-fluid" src={chain?.name.includes('lygon') ? '/images/rewards/Reward_MTK_small.png' : '/images/rewards/Reward_ETH_small.png'}alt="Reward_ETH_big" style={{height: '40px', width: '40px'}} />
                  </div>
                  <div className="col pt-2">
                    {chain?.name.includes('lygon') ? <>30 Matic</> : <>0.008 Eth</>}
                  </div>
                </div>
                <div className="d-flex">
                  <div className="col col-auto">
                    <img className="img-fluid" src="/images/rewards/Reward_Pts_small.png" alt="Reward_Pts_small" style={{height: '40px', width: '40px'}} />
                  </div>
                  <div className="col pt-2">
                    <Tippy html={<div>Battlemon Points (BP)<br />TBA exchange for BTLN token</div>}>
                      25 BP
                    </Tippy>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="col col-auto">
                    <img className="img-fluid" src="/images/rewards/Reward_Pts_med.png" alt="Reward_Pts_small" style={{height: '40px', width: '40px'}} />
                  </div>
                  <div className="col pt-2">
                    <Tippy html={<div>Battlemon Points (BP)<br />TBA exchange for BTLN token</div>}>
                      50 BP
                    </Tippy>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="col col-auto">
                    <img className="img-fluid" src="/images/rewards/Reward_Sticker.png" alt="Reward_Sticker" style={{height: '40px', width: '40px'}} />
                  </div>
                  <div className="col pt-2">
                    <Tippy html={<div>Collect 4 stickers and<br />exchange it for an Item</div>}>
                      Sticker
                    </Tippy>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="col col-auto">
                    <img className="img-fluid" src="/images/rewards/Reward_IcePick_1.png" alt="Reward_IcePick_1" style={{height: '40px', width: '40px'}} />
                  </div>
                  <div className="col pt-2">
                    <Tippy html={<div>Visit NFT Hub for mining<br />Gem using Pickaxe</div>}>
                      Pickaxe 1 Lvl
                    </Tippy>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="col col-auto">
                    <img className="img-fluid" src="/images/rewards/Reward_Lemon.png" alt="Reward_Lemon" style={{height: '40px', width: '40px'}} />
                  </div>
                  <div className="col pt-2">
                    <Tippy html={<div>Total supply 3333 Alfa NFTs</div>}>
                      Lemon
                    </Tippy>
                  </div>
                </div>
              </div>
            </div>
          </>}
          <div className={chain?.id !== 137 ? `col-sm-3` : `col-sm-4`}>
            <div className="w-100 px-2 py-2 rounded-3 mb-3" style={{background: 'rgba(0,0,0,0.3)'}}>
              <div className="px-2 py-2"><strong>Possible rewards <span className='d-md-none'>for {Cheap} {symbol}</span>:</strong></div>
              <div className="d-flex">
                <div className="col col-auto">
                  <img className="img-fluid" src={chain?.name.includes('lygon') ? '/images/rewards/Reward_MTK_small.png' : '/images/rewards/Reward_ETH_small.png'}alt="Reward_ETH_big" style={{height: '40px', width: '40px'}} />
                </div>
                <div className="col pt-2">
                  {chain?.name.includes('lygon') ? <>30 Matic</> : <>0.008 Eth</>}
                </div>
              </div>
              <div className="d-flex">
                <div className="col col-auto">
                  <img className="img-fluid" src="/images/rewards/Reward_Pts_small.png" alt="Reward_Pts_small" style={{height: '40px', width: '40px'}} />
                </div>
                <div className="col pt-2">
                  <Tippy html={<div>Battlemon Points (BP)<br />TBA exchange for BTLN token</div>}>
                    25 BP
                  </Tippy>
                </div>
              </div>
              <div className="d-flex">
                <div className="col col-auto">
                  <img className="img-fluid" src="/images/rewards/Reward_Sticker.png" alt="Reward_Sticker" style={{height: '40px', width: '40px'}} />
                </div>
                <div className="col pt-2">
                  <Tippy html={<div>Collect 4 stickers and<br />exchange it for an Item</div>}>
                    Sticker
                  </Tippy>
                </div>
              </div>
              <div className="d-flex">
                <div className="col col-auto">
                  <img className="img-fluid" src="/images/rewards/Reward_IcePick_1.png" alt="Reward_IcePick_1" style={{height: '40px', width: '40px'}} />
                </div>
                <div className="col pt-2">
                  <Tippy html={<div>Visit NFT Hub for mining<br />Gem using Pickaxe</div>}>
                    Pickaxe 1 Lvl
                  </Tippy>
                </div>
              </div>
            </div>
          </div>
          <div className={chain?.id !== 137 ? `col-sm-3` : `col-sm-4`}>
            <div className="w-100 px-2 py-2 rounded-3 mb-3" style={{background: 'rgba(0,0,0,0.3)'}}>
              <div className="px-2 py-2"><strong>Possible rewards <span className='d-md-none'>for {Good} {symbol}</span>:</strong></div>
              <div className="d-flex">
                <div className="col col-auto">
                  <img className="img-fluid" src={chain?.name.includes('lygon') ? '/images/rewards/Reward_MTK_small.png' : '/images/rewards/Reward_ETH_small.png'}alt="Reward_ETH_big" style={{height: '40px', width: '40px'}} />
                </div>
                <div className="col pt-2">
                  {chain?.name.includes('lygon') ? <>30 Matic</> : <>0.008 Eth</>}
                </div>
              </div>
              <div className="d-flex">
                <div className="col col-auto">
                  <img className="img-fluid" src={chain?.name.includes('lygon') ? '/images/rewards/Reward_MTK_med.png' : '/images/rewards/Reward_ETH_med.png'}alt="Reward_ETH_big" style={{height: '40px', width: '40px'}} />
                </div>
                <div className="col pt-2">
                  {chain?.name.includes('lygon') ? <>90 Matic</> : <>0.025 Eth</>}
                </div>
              </div>
              <div className="d-flex">
                <div className="col col-auto">
                  <img className="img-fluid" src="/images/rewards/Reward_Pts_small.png" alt="Reward_Pts_small" style={{height: '40px', width: '40px'}} />
                </div>
                <div className="col pt-2">
                  <Tippy html={<div>Battlemon Points (BP)<br />TBA exchange for BTLN token</div>}>
                    25 BP
                  </Tippy>
                </div>
              </div>
              <div className="d-flex">
                <div className="col col-auto">
                  <img className="img-fluid" src="/images/rewards/Reward_Pts_med.png" alt="Reward_Pts_small" style={{height: '40px', width: '40px'}} />
                </div>
                <div className="col pt-2">
                  <Tippy html={<div>Battlemon Points (BP)<br />TBA exchange for BTLN token</div>}>
                    50 BP
                  </Tippy>
                </div>
              </div>
              <div className="d-flex">
                <div className="col col-auto">
                  <img className="img-fluid" src="/images/rewards/Reward_Sticker.png" alt="Reward_Sticker" style={{height: '40px', width: '40px'}} />
                </div>
                <div className="col pt-2">
                  <Tippy html={<div>Collect 4 stickers and<br />exchange it for an Item</div>}>
                    Sticker
                  </Tippy>
                </div>
              </div>
              <div className="d-flex">
                <div className="col col-auto">
                  <img className="img-fluid" src="/images/rewards/Reward_Item.png" alt="Reward_Item" style={{height: '40px', width: '40px'}} />
                </div>
                <div className="col pt-2">
                  <Tippy html={<div>Visit NFT Hub for equip<br />an Item on Lemon NFT</div>}>
                    Item
                  </Tippy>
                </div>
              </div>
              <div className="d-flex">
                <div className="col col-auto">
                  <img className="img-fluid" src="/images/rewards/Reward_IcePick_2.png" alt="Reward_IcePick_1" style={{height: '40px', width: '40px'}} />
                </div>
                <div className="col pt-2">
                  <Tippy html={<div>Visit NFT Hub for mining<br />Gem using Pickaxe</div>}>
                    Pickaxe 2 Lvl
                  </Tippy>
                </div>
              </div>
            </div>
          </div>
          <div className={chain?.id !== 137 ? `col-sm-3` : `col-sm-4`}>
            <div className="w-100 px-2 py-2 rounded-3 mb-3" style={{background: 'rgba(0,0,0,0.3)'}}>
              <div className="px-2 py-2"><strong>Possible rewards <span className='d-md-none'>for {Great} {symbol}</span>:</strong></div>
              <div className="d-flex">
                <div className="col col-auto">
                  <img className="img-fluid" src={chain?.name.includes('lygon') ? '/images/rewards/Reward_MTK_med.png' : '/images/rewards/Reward_ETH_med.png'}alt="Reward_ETH_big" style={{height: '40px', width: '40px'}} />
                </div>
                <div className="col pt-2">
                  {chain?.name.includes('lygon') ? <>90 Matic</> : <>0.025 Eth</>}
                </div>
              </div>
              <div className="d-flex">
                <div className="col col-auto">
                  <img className="img-fluid" src="/images/rewards/Reward_Pts_med.png" alt="Reward_Pts_small" style={{height: '40px', width: '40px'}} />
                </div>
                <div className="col pt-2">
                  <Tippy html={<div>Battlemon Points (BP)<br />TBA exchange for BTLN token</div>}>
                    50 BP
                  </Tippy>
                </div>
              </div>
              <div className="d-flex">
                <div className="col col-auto">
                  <img className="img-fluid" src="/images/rewards/Reward_Pts_big.png" alt="Reward_Pts_small" style={{height: '40px', width: '40px'}} />
                </div>
                <div className="col pt-2">
                  <Tippy html={<div>Battlemon Points (BP)<br />TBA exchange for BTLN token</div>}>
                    100 BP
                  </Tippy>
                </div>
              </div>
              <div className="d-flex">
                <div className="col col-auto">
                  <img className="img-fluid" src="/images/rewards/Reward_Sticker.png" alt="Reward_Sticker" style={{height: '40px', width: '40px'}} />
                </div>
                <div className="col pt-2">
                  <Tippy html={<div>Collect 4 stickers and<br />exchange it for an Item</div>}>
                    Sticker
                  </Tippy>
                </div>
              </div>
              <div className="d-flex">
                <div className="col col-auto">
                  <img className="img-fluid" src="/images/rewards/Reward_Item.png" alt="Reward_Item" style={{height: '40px', width: '40px'}} />
                </div>
                <div className="col pt-2">
                  <Tippy html={<div>Visit NFT Hub for equip<br />an Item on Lemon NFT</div>}>
                    Item
                  </Tippy>
                </div>
              </div>
              <div className="d-flex">
                <div className="col col-auto">
                  <img className="img-fluid" src="/images/rewards/Reward_Lemon.png" alt="Reward_Lemon" style={{height: '40px', width: '40px'}} />
                </div>
                <div className="col pt-2">
                  <Tippy html={<div>Total supply 3333 Alfa NFTs</div>}>
                    Lemon
                  </Tippy>
                </div>
              </div>
              <div className="d-flex">
                <div className="col col-auto">
                  <img className="img-fluid" src="/images/rewards/Reward_IcePick_3.png" alt="Reward_IcePick_3" style={{height: '40px', width: '40px'}} />
                </div>
                <div className="col pt-2">
                  <Tippy html={<div>Visit NFT Hub for mining<br />Gem using Pickaxe</div>}>
                    Pickaxe 3 Lvl
                  </Tippy>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </>);
};