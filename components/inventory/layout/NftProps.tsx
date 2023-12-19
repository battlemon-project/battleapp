import cn from "classnames"
import styles from '../inventory.module.css'
import { NftMetaData } from "lemon"

interface NftProps {
  token: NftMetaData
}

export default function NftProps({ token }: NftProps) {

  const getPercents = (prop: 'agility' | 'speed' | 'luck') => {
    return (token.properties[prop] / Math.max(token.properties.agility, token.properties.speed, token.properties.luck))*100
  }

  return (<>
    <div className={cn(styles.nftProps)}>
      <div className='d-flex fs-13 justify-content-between'>
        <div className='text-end' style={{minWidth: '50px'}}>Level</div>
        <div className='d-flex w-100 ms-2 flex-column justify-content-center'>
          <div className="progress w-100" style={{height: '10px'}}>
            <div className="progress-bar bg-danger" role="progressbar" style={{width: `${token.properties.level * 10}%`}}>{}</div>
          </div>
        </div>
        <div className="text-center">
          <div style={{width: '20px'}}>{token.properties.level}</div>
        </div>
      </div>
      <div className='d-flex fs-13 text-end'>
        <div style={{minWidth: '50px'}}>Agility</div>
        <div className='d-flex w-100 ms-2 flex-column justify-content-center'>
          <div className="progress w-100" style={{height: '10px'}}>
            <div className="progress-bar bg-success" role="progressbar" style={{width: `${getPercents('agility')}%`}}>{}</div>
          </div>
        </div>
        <div className="text-center">
          <div style={{width: '20px'}}>{token.properties.agility}</div>
        </div>
      </div>
      <div className='d-flex fs-13 text-end'>
        <div style={{minWidth: '50px'}}>Speed</div>
        <div className='d-flex w-100 ms-2 flex-column justify-content-center'>
          <div className="progress w-100" style={{height: '10px'}}>
            <div className="progress-bar bg-info" role="progressbar" style={{width: `${getPercents('speed')}%`}}></div>
          </div>
        </div>
        <div className="text-center">
          <div style={{width: '20px'}}>{token.properties.speed}</div>
        </div>
      </div>
      <div className='d-flex fs-13 text-end'>
        <div style={{minWidth: '50px'}}>Luck</div>
        <div className='d-flex w-100 ms-2 flex-column justify-content-center'>
          <div className="progress w-100" style={{height: '10px'}}>
            <div className="progress-bar bg-warning" role="progressbar" style={{width: `${getPercents('luck')}%`}}></div>
          </div>
        </div>
        <div className="text-center">
          <div style={{width: '20px'}}>{token.properties.luck}</div>
        </div>
      </div>
    </div>
  </>)
}