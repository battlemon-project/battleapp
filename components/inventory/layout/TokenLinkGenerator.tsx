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

export default function TokenLinkGenerator({ onClick, token: defaultToken, isSelected }: NextTokenProps) {
  const { cache, mutate } = useSWRConfig()
  const { stage, selectLemon } = useLemonStore()
  const [ loader, setLoader ] = useState(false)
  const [ token, setToken ] = useState(defaultToken)

  const checkShadowLemon = (token: NftMetaData) => {
    if (!token.image.includes('shadow-lemon.png')) return false;
    const time = Number(token.image.split('timestamp=')[1])
    const MINUTES_5 = 5*60*1000;
    const duration = Date.now() - time;
    if (duration < MINUTES_5) {
      return true
    }
    return false
  }

  // const checkLast10sec = (token: NftMetaData) => {
  //   const time = Number(token.image.split('timestamp=')[1])
  //   const SECONDS_20 = 20*1000;
  //   const duration = Date.now() - time;
  //   if (duration < SECONDS_20) {
  //     return true
  //   }
  //   return false
  // }

  const { data } = useSWR(() => checkShadowLemon(token) ? {
    contract: process.env.NEXT_PUBLIC_CONTRACT_LEMONS!,
    tokenId: token.tokenId 
  } : null, getFromStorage, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 1000
  })

  useEffect(() => {
    if (data && !data.image.includes('shadow-lemon.png')) {
      setToken(data)
    }
  }, [data?.image])

  useEffect(() => {
    if (token.image?.includes('shadow-lemon.png')) {
      setLoader(true)
    } else {
      setLoader(false)
    }
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
    setToken(_lemon);
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
      <img src={token.image} className="img-fluid" height="512" width="512" />
      {loader && <div className="spinner-border spinner-border-md position-absolute" role="status" style={{margin: '-17px 0 0 -15px', left: '50%', top: '50%'}}></div>}
    </div>
  </>)
}