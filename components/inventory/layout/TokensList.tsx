import styles from '../inventory.module.css'
import { Fragment } from "react";
import cn from 'classnames';
import { NftMetaData } from "lemon";
import LoadMore from './LoadMore';
import TokenLink from './TokenLink';
import TokenLinkGenerator from './TokenLinkGenerator';

interface TokensListProps {
  tokens: NftMetaData[] | undefined
  isValidating: boolean
  height: number
  colWidth?: number
  selectedTokens: (NftMetaData | undefined)[]
  isNextPage?: boolean
  contract?: string
  withGenerator?: boolean
  onClick: (token: NftMetaData) => void
}

export default function TokensList({ tokens, isValidating, colWidth = 20, height, selectedTokens, isNextPage, contract, withGenerator, onClick }: TokensListProps) {
  if (isValidating) {
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
                {token.tokenId}
                {withGenerator ? 
                  <TokenLinkGenerator token={token} onClick={onClick} isSelected={selectedTokens.map(t => t?.tokenId).includes(token.tokenId)} />
                : 
                  <TokenLink token={token} onClick={onClick} isSelected={selectedTokens.map(t => t?.tokenId).includes(token.tokenId)} />
                }
                
              </div>
            </Fragment>
          })}
        </div>
        <div>
          {isNextPage && contract && <LoadMore contract={contract} />}
        </div>
      </div>
    </div>
  </>)
}