import cn from "classnames"
import styles from '../inventory.module.css'

export default function NftProps({ sharpness = 0 }: { sharpness: number }) {


  return (<>
    <div className={cn(styles.nftProps, styles.pickaxeProps)}>
      <div className='d-flex fs-13 justify-content-between'>
        <div className='text-end' style={{minWidth: '80px'}}>Sharpness</div>
        <div className='d-flex w-100 ms-2 flex-column justify-content-center'>
          <div className="progress w-100" style={{height: '10px'}}>
            <div className="progress-bar bg-success" role="progressbar" style={{width: `${sharpness}%`}}>{}</div>
          </div>
        </div>
        <div className="text-center ps-1">
          <div style={{width: '25px'}}>{sharpness}%</div>
        </div>
      </div>
    </div>
  </>)
}