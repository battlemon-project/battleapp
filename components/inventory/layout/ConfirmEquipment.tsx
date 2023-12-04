import { useLemonEquipment } from "hooks/useLemonEquipment"
import { NftMetaData } from "lemon"
import cn from 'classnames'
import { versionItemsPlaces, getVersion } from "utils/properties"
import { useEffect, useState } from "react"
import { useLemonStore } from "../store/lemonStore"
import { SWRResponse, useSWRConfig } from 'swr'
import { UseFetcherResult, getFromStorage } from "utils/fetcher"
import BattlemonLoader from "components/layout/BattlemonLoader"

interface ConfirmEquipmentProps {
  lemon: NftMetaData
  items: (NftMetaData | undefined)[]
  disabled: boolean
}

export default function ConfirmEquipment({ lemon, items, disabled }: ConfirmEquipmentProps) {
  const [ globalLoader, setGlobalLoader ] = useState(false)
  const contract = process.env.NEXT_PUBLIC_CONTRACT_LEMONS!
  const { selectLemon, clearSelectItems } = useLemonStore()
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
    const _lemon = await getFromStorage({ contract, tokenId: lemon.tokenId })
    data.tokens[indexOf] = _lemon
    await mutate(contract, {
      ...data
    }, {
      revalidate: false
    })
    return _lemon
  }

  const updateLemonJson = async (lemon: NftMetaData) => {
    const { data } = cache.get(contract) as SWRResponse<UseFetcherResult>

    if (!data?.tokens?.length) return;

    const index = data.tokens.findIndex(token => {
      return token.tokenId == lemon.tokenId
    })

    if (index < 0) return;

    setTimeout(async () => {
      mutate(process.env.NEXT_PUBLIC_CONTRACT_ITEMS!)
      setGlobalLoader(false)
      const _lemon = await refetchLemonData(data, index, lemon)
      selectLemon(_lemon)
    }, 1000)

  }

  useEffect(() => {
    if (changeEquipmentStatus == 'success') {
      clearSelectItems();
      lemon.original = structuredClone(lemon);
      selectLemon(lemon)
      updateLemonJson(lemon)
    }
    if (changeEquipmentStatus == 'process') {
      setGlobalLoader(true)
    }
  }, [changeEquipmentStatus])

  return (<>
    <button className={cn('btn btn-lg btn-primary fs-13 text-uppercase w-100', { disabled: disabled || changeEquipmentStatus == 'loading'})} onClick={() => changeEquipment()}>
      &nbsp;{ changeEquipmentStatus == 'loading' ? 
        <div className="spinner-border spinner-border-sm position-absolute" role="status" style={{margin: '-2px 0 0 -8px'}}></div> :
        <>Confirm {false && JSON.stringify(itemsIds)}</>
      }&nbsp;
    </button>
    {globalLoader && <BattlemonLoader />}
  </>)
}