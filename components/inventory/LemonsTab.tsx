import { useLemons } from "hooks/useLemons";
import TabsLayout from "./TabsLayout";
import styles from './inventory.module.css'
import { Fragment } from "react";
import { allItems } from "utils/items";

export default function LemonTab() {
  const { lemonTokens, refreshLemonTokens } = useLemons()

  return (<div className={styles.lemonTab}>
    <TabsLayout>
      <div className="row gx-1">
        {lemonTokens?.map((token, idx)=> {
          return <Fragment key={idx}>
            <div className="col-4">
              <img src={token.image} className="img-fluid" />
            </div>
          </Fragment>
        })}
        
      </div>
    </TabsLayout>
    <div className="d-flex mt-2">
      <a className={`col col-auto position-relative`} href={'#'}>
        <b className="position-absolute" style={{color: '#4a5480', padding: '19px 15px 0 16px', fontSize: '14px'}}>ALL</b>
        <img className={styles.filterIcon} src={`/images/hub/icon_empty_64.png`} />
      </a>
      {Object.keys(allItems).map(name => {
        return <a className={`col col-auto`} href={'#'} key={name}>
          <img className={styles.filterIcon} src={`/images/hub/icon_${name}_64.png`} />
        </a>
      })}
    </div>
    <div className="row gx-2 ">
      <div className="col-12 col-sm-6 col-lg-4 mt-2">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Level up</button>
      </div>
      <div className="col-12 col-sm-6 col-lg-4 mt-2">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Dress</button>
      </div>
      <div className="col-12 col-sm-6 col-lg-4 mt-2">
        <button className="btn btn-lg btn-default fs-13 text-uppercase w-100">Undress</button>
      </div>
    </div>
  </div>)
}