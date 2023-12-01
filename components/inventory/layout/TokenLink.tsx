import { NftMetaData } from 'lemon';
import styles from '../inventory.module.css';
import cn from 'classnames';
import { useEffect, useState } from 'react';

interface NextTokenProps {
  onClick: (...args: any) => any
  token: NftMetaData
  isSelected: boolean
}

export default function TokenLink({ onClick, token, isSelected }: NextTokenProps) {
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (token.image.includes('shadow-lemon.png')) {
      setLoader(true)
    } else {
      setLoader(false)
    }
  }, [token.image])

  return (<>
    <div className={cn('rounded-4 position-relative', styles.itemBg, { [styles.itemBgActive]: isSelected })} onClick={onClick}>
      {false && (token.image.split('stamp=17')[1] || '')}
      <img src={token.image} className="img-fluid" height="512" width="512" />
      {loader && <div className="spinner-border spinner-border-md position-absolute" role="status" style={{margin: '-17px 0 0 -15px', left: '50%', top: '50%'}}></div>}
    </div>
  </>)
}