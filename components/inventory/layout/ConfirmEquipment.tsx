import { useLemonEquipment } from "hooks/useLemonEquipment"
import { NftMetaData } from "lemon"
import cn from 'classnames'
import { versionItemsPlaces, getVersion } from "utils/properties"
import { useEffect, useState } from "react"
import { useLemonStore } from "../store/lemonStore"
import BattlemonLoader from "components/layout/BattlemonLoader"

interface ConfirmEquipmentProps {
  lemon: NftMetaData
  items: (NftMetaData | undefined)[]
  disabled: boolean
  refresh: (...args: any) => any
}

export default function ConfirmEquipment({ lemon, items, disabled, refresh }: ConfirmEquipmentProps) {
  const [ globalLoader, setGlobalLoader ] = useState(false)
  const { confirmDressLemon } = useLemonStore()
  const version: string = getVersion(lemon.properties.dna)
  const places = (versionItemsPlaces as {[key: string]: string[]})[version]
  const itemsIds = places.map((place, idx) => {
    const currentItemId = lemon.properties.dress[idx]
    const item = items.find(i => i?.properties.type === place)
    if (item) {
      return item.tokenId
    } else if (currentItemId !== undefined) {
      return currentItemId
    } else {
      return -1
    }
  })
  
  const { changeEquipment, changeEquipmentStatus } = useLemonEquipment(lemon.tokenId, itemsIds)

  useEffect(() => {
    if (changeEquipmentStatus == 'success') {
      setTimeout(() => {
        setGlobalLoader(false)
        confirmDressLemon(itemsIds);
        refresh();
      }, 1000)
    }
    if (changeEquipmentStatus == 'process') {
      setGlobalLoader(true)
    }
  }, [changeEquipmentStatus])

  return (<>
    <button className={cn('btn btn-lg btn-primary fs-13 text-uppercase w-100', { disabled: disabled || changeEquipmentStatus == 'loading'})} onClick={() => changeEquipment()}>
      &nbsp;{ changeEquipmentStatus == 'loading' ? 
        <div className="spinner-border spinner-border-sm position-absolute" role="status" style={{margin: '-2px 0 0 -8px'}}></div> :
        <>Confirm {true && JSON.stringify(itemsIds)}</>
      }&nbsp;
    </button>
    {globalLoader && <BattlemonLoader />}
  </>)
}