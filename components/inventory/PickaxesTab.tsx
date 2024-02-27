import styles from './inventory.module.css'
import cn from "classnames";
import { usePickaxeStore } from './store/pickaxeStore';
import PickaxeStart from './stages/PickaxeStart';
import { usePickaxeBalance } from 'hooks/usePickaxeBalance';
import useWindowSize from 'hooks/useWindowSize';
import PickaxeScene from './scenes/PickaxeScene';
import { useEffect, useState } from 'react';
import PickaxeProps from './layout/PickaxeProps';
import { useSharpnessOf } from 'hooks/useSharpnessOf';
import { useNetwork } from 'wagmi';

export default function PickaxesTab() {
  const { chain } = useNetwork()
  const { selectedPickaxe, stage, miningStatus, repairStatus } = usePickaxeStore()
  const [ sharpness, setSharpness ] = useState<number | undefined>()
  const size = useWindowSize()
  const { getSharpnessOf } = useSharpnessOf()
  const { balance } = usePickaxeBalance()

  useEffect(() => {
    if (selectedPickaxe?.tokenId == undefined) return
    getSharpnessOf(selectedPickaxe.tokenId).then((sharp: number) => {
      setSharpness(sharp)
    })
  }, [selectedPickaxe?.tokenId])

  useEffect(() => {
    console.log('test 5')
    if (selectedPickaxe?.tokenId == undefined || (miningStatus !== 'success' && miningStatus !== 'error')) return
    getSharpnessOf(selectedPickaxe.tokenId).then((sharp: number) => {
      setSharpness(sharp)
    })
  }, [miningStatus])

  
  useEffect(() => {
    if (selectedPickaxe?.tokenId == undefined || repairStatus !== 'success') return
    getSharpnessOf(selectedPickaxe.tokenId).then((sharp: number) => {
      setSharpness(sharp)
    })
  }, [repairStatus])

  return (<div className="row">
    {size.width > 992 && <div className="col-5">
      <div className="position-relative">
        <img src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' width='1000' height='1000' className='img-fluid' />
        <div className={styles.miningContainer}>
          <PickaxeScene pickaxeType={ Number(selectedPickaxe?.image.split('/').pop()?.split('.')[0])} debug={false} />
        </div>
      </div>
    </div>}

    <div className={cn('col-lg-7 col-12 position-relative mx-0', styles.inventoryContainer)}>
      {chain && sharpness !== undefined && <PickaxeProps sharpness={sharpness} />}
      {chain && stage == 'Start' && <PickaxeStart balance={balance} chainId={chain.id} />}
    </div>
  </div>)
}