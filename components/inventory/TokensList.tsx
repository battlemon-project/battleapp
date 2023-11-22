import styles from './inventory.module.css'
import { Fragment } from "react";
import cn from 'classnames';
import { TokenIpfsType } from "lemon";

interface TokensListProps {
  tokens: TokenIpfsType[] | undefined
  width?: number
  filter?: boolean
}

export default function TokensList({ tokens, width = 20, filter }: TokensListProps) {
  return (<>
    <div className={styles.inventoryScollable} style={{height: filter ? '350px' : '410px'}}>
      <div className={styles.inventoryContent}>
        <div className="row gx-2">
          {tokens?.map((token, idx)=> {
            return <Fragment key={idx}>
              <div className='col-auto mb-2' style={{width: width + '%'}}>
                <div className={cn('rounded-4', styles.itemBg)}>
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