import { useLemonEquipment } from "hooks/useLemonEquipment"
import { NftMetaData } from "lemon"
import cn from 'classnames'
import { versionItemsPlaces, getVersion } from "utils/properties"

interface ConfirmEquipmentProps {
  lemon: NftMetaData
  items: (NftMetaData | undefined)[]
}

export default function ConfirmEquipment({ lemon, items }: ConfirmEquipmentProps) {
  const version: string = getVersion(lemon?.properties?.dna)
  const places = (versionItemsPlaces as {[key: string]: string[]})[version]

  const itemsIds = places.map(place => {
    const item = items.find(i => i?.properties?.type === place)
    if (item) {
      return item.tokenId
    } else {
      return -2
    }
  }).filter(x => x);
  
  const { changeEquipment, changeEquipmentStatus } = useLemonEquipment(lemon.tokenId, itemsIds)

  return (<>
    <div className="col-12 col-sm-6 col-lg-4 mt-2 d-flex">
      <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100', { disabled: changeEquipmentStatus == 'loading'})} onClick={() => changeEquipment()}>
        &nbsp;{ changeEquipmentStatus == 'loading' ? 
          <div className="spinner-border spinner-border-sm position-absolute" role="status" style={{margin: '-2px 0 0 -8px'}}></div> :
          <>Confirm</>
        }&nbsp;
      </button>
    </div>
  </>)
}