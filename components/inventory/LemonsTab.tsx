import TabsLayout from "./TabsLayout";
import styles from './inventory.module.css'

export default function LemonTab() {
  return (<div className={styles.lemonTab}>
    <TabsLayout>
      <div>
        <h4>Brand New Lemon</h4>
        <h5>Characters:</h5>
        <div>
          <strong className='text-uppercase'>Teeth</strong>:&nbsp;
          Ghost
        </div>
        <div>
          <strong className='text-uppercase'>Eyes</strong>:&nbsp;
          Ghost
        </div>
        <div>
          <strong className='text-uppercase'>Head</strong>:&nbsp;
          Ghost
        </div>
        <div>
          <strong className='text-uppercase'>Teeth</strong>:&nbsp;
          Ghost
        </div>
        <div>
          <strong className='text-uppercase'>Eyes</strong>:&nbsp;
          Ghost
        </div>
        <div>
          <strong className='text-uppercase'>Head</strong>:&nbsp;
          Ghost
        </div>
      </div>
    </TabsLayout>
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