import styles from './inventory.module.css'
import cn from "classnames";
import { useStickerStore } from './store/stickerStore';
import StickerStart from './stages/StickerStart';
import { useStickerBalance } from 'hooks/useStickerBalance';
import useWindowSize from 'hooks/useWindowSize';
import { useEffect, useState } from 'react';

export default function StickersTab() {
  const { selectedStickers, stage, mergeStatus } = useStickerStore()
  const size = useWindowSize()
  const { balance } = useStickerBalance()

  useEffect(() => {
    if (mergeStatus !== 'success') return
  }, [mergeStatus])

  return (<div className="row">
    {size.width > 992 && <div className="col-5">
      <div className="position-relative">
        <img src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' width='1000' height='1000' className='img-fluid' />
      </div>
    </div>}

    <div className={cn('col-lg-7 col-12 position-relative mx-0', styles.inventoryContainer)}>
      {stage == 'Start' && <StickerStart balance={balance} />}
    </div>
  </div>)
}