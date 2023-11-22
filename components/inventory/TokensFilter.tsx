import cn from 'classnames'
import { allItems } from "utils/properties";
import styles from './inventory.module.css'

export default function TokensFilter() {
  return <>
    <div className={cn('d-flex', styles.filterBlock)}>
      <a className={`col col-auto position-relative`} style={{color: '#4a5480'}} href={'#'}>
        <b className="position-absolute w-100 fs-12 text-center pt-3">ALL</b>
        <img className={styles.filterIcon} src={`/images/hub/icon_empty_64.png`} />
      </a>
      {Object.keys(allItems).map(name => {
        return <a className={`col col-auto`} href={'#'} key={name}>
          <img className={styles.filterIcon} src={`/images/hub/icon_${name}_64.png`} />
        </a>
      })}
    </div>
  </>
}