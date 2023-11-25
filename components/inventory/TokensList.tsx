import styles from './inventory.module.css'
import { Fragment } from "react";
import cn from 'classnames';
import { NftMetaData } from "lemon";

interface TokensListProps {
  tokens: NftMetaData[] | undefined
  isLoading: boolean
  height: number
  colWidth?: number
  selectedToken: NftMetaData | undefined
  onClick: (...args: any) => React.MouseEventHandler
}

export default function TokensList({ tokens, isLoading, colWidth = 20, height, selectedToken, onClick }: TokensListProps) {
  if (isLoading) {
    return <div className='d-flex flex-column justify-content-center' style={{height}}>
      <div className="spinner-border text-light mx-auto" style={{ width: '3rem', height: '3rem' }} />
    </div>
  }
  if (!tokens?.length) {
    return <div className='d-flex flex-column justify-content-center' style={{height}}>
      <p className='fs-14 text-center'>YOU HAVE NO TOKENS YET</p>
    </div>
  }

  return (<>
    <div className={styles.inventoryScollable} style={{height: height + 'px'}}>
      <div className={styles.inventoryContent}>
        <div className="row gx-2">
          {tokens.map((token, idx)=> {
            return <Fragment key={idx}>
              <div className='col-auto mb-2' style={{width: colWidth + '%'}}>
                <div className={cn('rounded-4', styles.itemBg, { [styles.itemBgActive]: selectedToken?.tokenId === token.tokenId })} onClick={onClick(token)}>
                  <img src={token.image} className="img-fluid" height="512" width="512" />
                </div>
              </div>
            </Fragment>
          })}
        </div>
      </div>
    </div>
  </>)
}