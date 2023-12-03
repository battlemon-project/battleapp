import { NftMetaData } from 'lemon';
import styles from '../inventory.module.css';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getFromStorage } from 'utils/fetcher';

interface NextTokenProps {
  onClick: (token: NftMetaData) => void
  token: NftMetaData
  isSelected: boolean
}

export default function TokenLink({ onClick, token, isSelected }: NextTokenProps) {
  const [ loader, setLoader ] = useState(false)
  const [ image, setImage ] = useState(token.image)

  const { data } = useSWR(() => image.includes('shadow-lemon.png') ? {
    contract: process.env.NEXT_PUBLIC_CONTRACT_LEMONS!,
    tokenId: token.tokenId 
  } : null, getFromStorage, loader ? {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 1000
  } : {})

  useEffect(() => {
    if (!image.includes('/lemons/')) return
    if (image.includes('shadow-lemon.png')) {
      setLoader(true)
    } else {
      setLoader(false)
    }
  }, [image])

  useEffect(() => {
    if (!data?.image) return;
    if (!data.image.includes('/lemons/')) return
    if (!data?.image.includes('shadow-lemon.png')) {
      setImage(data?.image)
    }
  }, [data?.image])

  useEffect(() => {
    if (!token.image.includes('/lemons/')) return
    if (token.image.includes('shadow-lemon.png')) {
      setImage(token.image)
    }
  }, [token.image])

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