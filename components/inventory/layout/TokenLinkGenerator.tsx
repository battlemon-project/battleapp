import { NftMetaData } from 'lemon';
import styles from '../inventory.module.css';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import useSWR, { SWRResponse, useSWRConfig } from 'swr';
import { UseFetcherResult, getFromStorage } from 'utils/fetcher';
import { useLemonStore } from '../store/lemonStore';

interface NextTokenProps {
  onClick: (token: NftMetaData) => void
  token: NftMetaData
  isSelected: boolean
}

export default function TokenLinkGenerator({ onClick, token, isSelected }: NextTokenProps) {
  const { cache, mutate } = useSWRConfig()
  const { stage } = useLemonStore()
  const [ loader, setLoader ] = useState(false)
  const [ image, setImage ] = useState(token.image)

  const checkShadowLemon = (image: string) => {
    if (!image.includes('shadow-lemon.png')) return false;
    const time = Number(image.split('timestamp=')[1])
    const MINUTES_5 = 5*60*1000;
    const duration = Date.now() - time;
    if (duration < MINUTES_5) {
      return true
    }
    return false
  }

  const checkLast20sec = (image: string) => {
    const time = Number(image.split('timestamp=')[1])
    const SECONDS_20 = 20*1000;
    const duration = Date.now() - time;
    if (duration < SECONDS_20) {
      return true
    }
    return false
  }

  const { data } = useSWR(() => checkShadowLemon(image) || checkLast20sec(image) ? {
    contract: process.env.NEXT_PUBLIC_CONTRACT_LEMONS!,
    tokenId: token.tokenId 
  } : null, getFromStorage, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 2000
  })

  useEffect(() => {
    if (image.includes('shadow-lemon.png')) {
      setLoader(true)
    } else {
      setLoader(false)
    }
  }, [image])

  useEffect(() => {
    if (!data?.image) return;
    setImage(data?.image)
  }, [data?.image])

  useEffect(() => {
    setImage(token.image)
  }, [token.image])

  
  const refetchLemonData = async (contract: string, lemon: NftMetaData) => {
    const { data } = cache.get(contract) as SWRResponse<UseFetcherResult>
    if (!data) return
    const index = data?.tokens.findIndex(token => {
      return token.tokenId == lemon.tokenId
    })
    const _lemon = await getFromStorage({ contract, tokenId: lemon.tokenId })
    data.tokens[index] = _lemon
    await mutate(contract, {
      ...data
    }, {
      revalidate: false
    })
  }

  useEffect(() => {
    if (!isSelected) return;
    refetchLemonData(process.env.NEXT_PUBLIC_CONTRACT_LEMONS!, token)
  }, [stage, isSelected])

  const handleClick = (token: NftMetaData) => (e: React.MouseEvent) => {
    e.preventDefault();
    onClick(token)
  }

  return (<>
    <div className={cn('rounded-4 position-relative', styles.itemBg, { [styles.itemBgActive]: isSelected })} onClick={handleClick(token)}>
      {false && (token.image.split('stamp=17')[1] || '')}
      <img src={image} className="img-fluid" height="512" width="512" />
      {loader && <div className="spinner-border spinner-border-md position-absolute" role="status" style={{margin: '-17px 0 0 -15px', left: '50%', top: '50%'}}></div>}
    </div>
  </>)
}