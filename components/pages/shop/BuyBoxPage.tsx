import cn from 'classnames';
import styles from './shop.module.css'
import Link from 'next/link';
import BuyBox from './buttons/BuyBox';
import useAuth from 'context/AuthContext';
import { truncate } from 'utils/misc';
import { BoxType, PrizeType, prizes, prizesChance } from 'hooks/useBuyBox';
import { SignInButton } from './buttons/SignInButton';
import BoxScene from './scenes/BoxScene';
import { useState } from 'react';

export default function BuyBoxPage() {
  const { isSignedIn, isSupportedChain } = useAuth();
  const [ prizeTypes, setPrizeTypes ] = useState<{ [key in BoxType]?: number }>({
    [BoxType.Cheap]: -1,
    [BoxType.Good]: -1,
    [BoxType.Great]: -1
  })

  const changePrizeType = (boxType: BoxType) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setPrizeTypes({
      ...prizeTypes,
      [boxType]: value
    })
  }

  return (<>
    <div className="container py-3 mb-auto">
      <Link href="/shop">
        <button className='btn btn-outline-light'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left mb-05" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          <span className='ps-2'>Back to Shop</span>
        </button>
      </Link>
      <br /><br /><br />
      {(() => {
        if (!isSignedIn || !isSupportedChain) {
          return <div className='row justify-content-center'>
            <div className='col-4'>
              <SignInButton />
            </div>
          </div>
        } else {
          return <div className='row'>
            <div className='col-4'>
              <br />
              <select className="form-select form-select-sm mb-1" onChange={changePrizeType(BoxType.Cheap)} value={prizeTypes?.[BoxType.Cheap] || -1}>
                <option value={-1}>none</option>
                {Object.keys(prizesChance.Cheap).map(k => 
                  <option value={Number(k)} key={k}>{prizes[Number(k)]}</option>
                )}
              </select>
              <BuyBox boxType={BoxType.Cheap} prizeType={prizeTypes?.[BoxType.Cheap] || -1} disabled={!prizeTypes?.[BoxType.Cheap] || prizeTypes?.[BoxType.Cheap] < 0} />
              <select className="form-select form-select-sm mb-1" onChange={changePrizeType(BoxType.Good)} value={prizeTypes?.[BoxType.Good] || -1}>
                <option value={-1}>none</option>
                {Object.keys(prizesChance.Good).map(k =>
                  <option value={Number(k)} key={k}>{prizes[Number(k)]}</option>
                )}
              </select>
              <BuyBox boxType={BoxType.Good} prizeType={prizeTypes?.[BoxType.Good] || -1} disabled={!prizeTypes?.[BoxType.Good] || prizeTypes?.[BoxType.Good] < 0} />
              <select className="form-select form-select-sm mb-1" onChange={changePrizeType(BoxType.Great)} value={prizeTypes?.[BoxType.Great] || -1}>
                <option value={-1}>none</option>
                {Object.keys(prizesChance.Great).map(k =>
                  <option value={Number(k)} key={k}>{prizes[Number(k)]}</option>
                )}
              </select>
              <BuyBox boxType={BoxType.Great} prizeType={prizeTypes?.[BoxType.Great] || -1} disabled={!prizeTypes?.[BoxType.Great] || prizeTypes?.[BoxType.Great] < 0} />
            </div>
            <div className='col-8'>
              <div style={{width: '360px', height: '500px'}} className='m-auto'>
                <BoxScene name='Basket_Chests_LP_oneReward' debug={false} />
              </div>
            </div>
          </div>
        }
      })()}

    </div>
  </>);
};