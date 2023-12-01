import { useLemonEquipment } from "hooks/useLemonEquipment"
import { NftMetaData } from "lemon"
import cn from 'classnames'
import { versionItemsPlaces, getVersion } from "utils/properties"
import { Dispatch, useEffect, useState } from "react"
import { useLemonStore } from "../store/lemonStore"
import { SWRResponse, useSWRConfig } from 'swr'
import { UseFetcherResult, getFromStorage } from "utils/fetcher"
import BattlemonLoader from "components/layout/BattlemonLoader"

interface ConfirmEquipmentProps {
  lemon: NftMetaData
  items: (NftMetaData | undefined)[]
  setDisabledBack: Dispatch<any>
}

export default function ConfirmEquipment({ lemon, items, setDisabledBack }: ConfirmEquipmentProps) {
  const [ globalLoader, setGlobalLoader ] = useState(false)
  const contract = process.env.NEXT_PUBLIC_CONTRACT_LEMONS!
  const { selectLemon } = useLemonStore()
  const { cache, mutate } = useSWRConfig()
  const version: string = getVersion(lemon.properties.dna)
  const places = (versionItemsPlaces as {[key: string]: string[]})[version]

  const itemsIds = places.map((place, idx) => {
    const currentItemId = lemon.properties.dress[idx]
    const item = items.find(i => i?.properties.type === place)
    if (item) {
      return item.tokenId
    } else if (currentItemId) {
      return currentItemId
    } else {
      return -2
    }
  }).filter(x => x);
  
  const { changeEquipment, changeEquipmentStatus } = useLemonEquipment(lemon.tokenId, itemsIds)

  const refetchLemonData = async (data: UseFetcherResult, indexOf: number, lemon: NftMetaData) => {
    const json = await getFromStorage(contract, lemon.tokenId)
    data.tokens[indexOf] = json
    mutate(contract, {
      ...data
    }, {
      revalidate: false
    })
  }

  const updateLemonJson = async (lemon: NftMetaData) => {
    const { data } = cache.get(contract) as SWRResponse<UseFetcherResult>

    if (!data?.tokens?.length) return;

    const index = data.tokens.findIndex(token => {
      return token.tokenId == lemon.tokenId
    })

    if (index < 0) return;

    setTimeout(async () => {
      await refetchLemonData(data, index, lemon)
      selectLemon(lemon)
      setGlobalLoader(false)
      mutate(process.env.NEXT_PUBLIC_CONTRACT_ITEMS!)
    }, 5000)

  }

  useEffect(() => {
    if (changeEquipmentStatus == 'success') {
      lemon.original = structuredClone(lemon);
      selectLemon(lemon)
      updateLemonJson(lemon)
    }
    if (changeEquipmentStatus == 'process') {
      setGlobalLoader(true)
    }
  }, [changeEquipmentStatus])

  return (<>
    <div className="col-12 col-sm-6 col-lg-4 mt-2 d-flex">
      <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100', { disabled: changeEquipmentStatus == 'loading'})} onClick={() => changeEquipment()}>
        &nbsp;{ changeEquipmentStatus == 'loading' ? 
          <div className="spinner-border spinner-border-sm position-absolute" role="status" style={{margin: '-2px 0 0 -8px'}}></div> :
          <>Confirm {false && JSON.stringify(itemsIds)}</>
        }&nbsp;
      </button>
    </div>
    {globalLoader && <BattlemonLoader />}
  </>)
}