import styles from './inventory.module.css'
import cn from "classnames";
import { useGemStore } from './store/gemStore';
import GemStart from './stages/GemStart';
import { useGemBalance } from 'hooks/useGemBalance';
import useWindowSize from 'hooks/useWindowSize';
import { useEffect, useState } from 'react';

export default function GemsTab() {
  const { selectedGems, stage, mergeStatus, mergeSuccessResult, mergeErrorResult } = useGemStore()
  const size = useWindowSize()
  const { balance } = useGemBalance()

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
        {!selectedGems?.length && mergeStatus == 'success' && <div className="text-center pt-5 mt-5 px-3 position-absolute w-100" style={{fontSize: '25px', lineHeight: '40px;'}}>Congrats!<br />You are successfull!</div>}
        {!selectedGems?.length && mergeStatus == 'error' && <div className="text-center pt-5 mt-5 px-3 position-absolute w-100" style={{fontSize: '25px', lineHeight: '40px;'}}>Sorry...<br />Your gem is lost...</div>}
        <img src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' width='1000' height='1000' className='img-fluid' />
        {selectedGems[0] && <img style={{position: 'absolute', left: '15%', top: '50%', marginTop: '-128px'}} src={selectedGems[0].image} /> }
        {selectedGems[1] && <img style={{position: 'absolute', right: '15%', top: '50%', marginTop: '-128px'}} src={selectedGems[1].image} /> }
      </div>
    </div>}

    <div className={cn('col-lg-7 col-12 position-relative mx-0', styles.inventoryContainer)}>
      {stage == 'Start' && <GemStart balance={balance} />}
    </div>
  </div>)
}