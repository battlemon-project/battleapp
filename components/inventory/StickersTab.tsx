import styles from './inventory.module.css'
import cn from "classnames";
import { useStickerStore } from './store/stickerStore';
import StickerStart from './stages/StickerStart';
import { useStickerBalance } from 'hooks/useStickerBalance';
import useWindowSize from 'hooks/useWindowSize';
import { useEffect, useState } from 'react';

export default function StickersTab() {
  const { selectedStickers, stage, mergeStatus, mergeSuccessResult, mergeErrorResult } = useStickerStore()
  const size = useWindowSize()
  const { balance } = useStickerBalance()

  useEffect(() => {
    if (mergeStatus == 'success') {
       mergeSuccessResult()
       return
    }
    if (mergeStatus == 'error') {
       mergeErrorResult()
       return
    }
  }, [mergeStatus])

  return (<div className="row">
  {size.width > 992 && <div className="col-5">
    <div className="position-relative">
      {!selectedStickers?.length && mergeStatus == 'success' && <div className="text-center pt-5 mt-5 px-3 position-absolute w-100" style={{fontSize: '25px', lineHeight: '40px'}}>Congrats!<br />You received the item.</div>}
      {!selectedStickers?.length && mergeStatus == 'error' && <div className="text-center pt-5 mt-5 px-3 position-absolute w-100" style={{fontSize: '25px', lineHeight: '40px'}}>Sorry...<br />We catch some error...</div>}
      <img src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' width='1000' height='1000' className='img-fluid' />
      {selectedStickers[0] && <img style={{position: 'absolute', left: '10%', top: '35%', marginTop: '-128px'}} src={selectedStickers[0].image} /> }
      {selectedStickers[1] && <img style={{position: 'absolute', right: '10%', top: '35%', marginTop: '-128px'}} src={selectedStickers[1].image} /> }
      {selectedStickers[2] && <img style={{position: 'absolute', left: '10%', top: '65%', marginTop: '-128px'}} src={selectedStickers[2].image} /> }
      {selectedStickers[3] && <img style={{position: 'absolute', right: '10%', top: '65%', marginTop: '-128px'}} src={selectedStickers[3].image} /> }
    </div>
  </div>}

    <div className={cn('col-lg-7 col-12 position-relative mx-0', styles.inventoryContainer)}>
      {stage == 'Start' && <StickerStart balance={balance} />}
    </div>
  </div>)
}