import { ItemType } from 'lemon';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import TabsLayout from './TabsLayout';

export default function ItemsTab() {

  const [ currentItemsFilter, setCurrentItemsFilter ] = useState<string | undefined>()
  const [ inventoryLoader, setInventoryLoader ] = useState<boolean>(true);
  const [ lemonItems, setLemonItems ] = useState<ItemType[]>([]);
  const [ selectedItem, setSelectedItem ] = useState<ItemType | undefined>();
  const { address, isConnected } = useAccount()

  const filterOutifts = (type: string) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (type == 'all') {
      setCurrentItemsFilter(undefined)
    } else {
      setCurrentItemsFilter(type)
    }
  }

  const clickToItem = (item: ItemType) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSelectedItem(item);
  }

  const handleWearItem = () => {
    alert('wear')
  }

  const handleDressedMode = () => {
    setSelectedItem(undefined)
    if (currentItemsFilter == 'dressed') {
      setCurrentItemsFilter(undefined)
    } else {
      setCurrentItemsFilter('dressed')
    }
  }

  const handleMintItem = async () => {
    alert('mint')
  }

  return (<>
    <TabsLayout>
      <div className="inventory-left-buttons d-flex flex-column">
        
        <div className="col d-flex py-1" style={{height: '33.33%'}}>
          <a href={'#'} className={`button justify-content-center w-100 d-flex`} onClick={handleMintItem}>
            <span className="justify-content-center align-self-center text-center w-100">
              Mint random item
              </span>
          </a>
        </div>
        <div className="col d-flex py-1" style={{height: '33.33%'}}>
          <a href={'#'} className={`button justify-content-center w-100 d-flex`} onClick={handleDressedMode}>
            <span className={`justify-content-center align-self-center text-center w-100`}>
              { currentItemsFilter == 'dressed' ? 'Back' : 'Dressed items' }
            </span>
          </a>
        </div>
        <div className="col d-flex py-1" style={{height: '33.33%'}}>
          <a href={'#'} className={`button justify-content-center w-100 d-flex ${selectedItem ? '' : 'disabled'}`} onClick={handleWearItem}>
            <span className="justify-content-center align-self-center text-center w-100">
              { currentItemsFilter == 'dressed' ? 'Take Off' : 'Confirm' }
            </span>
          </a>
        </div>      
      </div>
      <div className="inventory-scroll d-flex">
        { inventoryLoader ? 
          <div className="w-100 d-flex align-items-center">
            <div className="w-100 text-center pt-4 mt-2" style={{fontSize: '19px'}}>
              {"Loading"}
            </div>
          </div>
          :
          <div className="row align-self-start w-100">
            <div className={`col col-3 border px-1 px-1`}>
              <div className="link text-center py-2" onClick={() => {}}>
                <img src={`/assets/128/Icon_128.png`} alt={'item.type'} className="img-fluid" />
              </div>
            </div>
            <div className={`col col-3 border px-1 px-1`}>
              <div className="link text-center py-2" onClick={() => {}}>
                <img src={`/assets/128/Icon_128.png`} alt={'item.type'} className="img-fluid" />
              </div>
            </div>
            <div className={`col col-3 border px-1 px-1`}>
              <div className="link text-center py-2" onClick={() => {}}>
                <img src={`/assets/128/Icon_128.png`} alt={'item.type'} className="img-fluid" />
              </div>
            </div>
            <div className={`col col-3 border px-1 px-1`}>
              <div className="link text-center py-2" onClick={() => {}}>
                <img src={`/assets/128/Icon_128.png`} alt={'item.type'} className="img-fluid" />
              </div>
            </div>
          </div>
        }
      </div>

      <div className="position-absolute" style={{bottom: '-70px'}}>
        { currentItemsFilter != 'dressed' && <div className="d-flex mt-2 bottom-buttons">
          <a className={`col col-auto position-relative ${ currentItemsFilter == undefined && 'active' }`} href={'#'} onClick={filterOutifts('all')}>
            <b className="position-absolute" style={{color: '#4a5480', padding: '19px 15px 0 16px', fontSize: '17px'}}>ALL</b>
            <img src={`${process.env.NEXT_PUBLIC_STATIC}/assets/tiny/icon_hand_empty.png`} />
          </a>
          <a className={`col col-auto ${lemonItems.find(item => item.type == 'cap') ? 'enabled' : 'disabled' } ${ currentItemsFilter == 'cap' ? 'active' : '' }`} href={'#'} onClick={filterOutifts('cap')}>
            <img src={`${process.env.NEXT_PUBLIC_STATIC}/assets/tiny/icon_cap_64.png`} />
          </a>
          <a className={`col col-auto ${lemonItems.find(item => item.type == 'belt') ? 'enabled' : 'disabled' } ${ currentItemsFilter == 'belt' ? 'active' : '' }`} href={'#'} onClick={filterOutifts('belt')}>
            <img src={`${process.env.NEXT_PUBLIC_STATIC}/assets/tiny/icon_belt_64.png`} />
          </a>
          {/* <a className={`col col-auto ${lemonItems.find(item => item.type == 'hand' && !item.attachedTo) ? 'enabled' : 'disabled' } ${ currentItemsFilter == 'hand' ? 'active' : '' }`} href={'#'} onClick={filterOutifts('hand')}>
            <img src={`${process.env.NEXT_PUBLIC_STATIC}/assets/tiny/icon_hand_l_64.png`} />
          </a> */}
          <a className={`col col-auto ${lemonItems.find(item => item.type == 'cloth') ? 'enabled' : 'disabled' } ${ currentItemsFilter == 'cloth' ? 'active' : '' }`} href={'#'} onClick={filterOutifts('cloth')}>
            <img src={`${process.env.NEXT_PUBLIC_STATIC}/assets/tiny/icon_cloth_64.png`} />
          </a>
          <a className={`col col-auto ${lemonItems.find(item => item.type == 'mask') ? 'enabled' : 'disabled' } ${ currentItemsFilter == 'mask' ? 'active' : '' }`} href={'#'} onClick={filterOutifts('mask')}>
            <img src={`${process.env.NEXT_PUBLIC_STATIC}/assets/tiny/icon_mask_64.png`} />
          </a>
          <a className={`col col-auto ${lemonItems.find(item => item.type == 'glasses') ? 'enabled' : 'disabled' } ${ currentItemsFilter == 'glasses' ? 'active' : '' }`} href={'#'} onClick={filterOutifts('glasses')}>
            <img src={`${process.env.NEXT_PUBLIC_STATIC}/assets/tiny/icon_face_64.png`} />
          </a>
          <a className={`col col-auto ${lemonItems.find(item => item.type == 'shoes') ? 'enabled' : 'disabled' } ${ currentItemsFilter == 'shoes' ? 'active' : '' }`} href={'#'} onClick={filterOutifts('shoes')}>
            <img src={`${process.env.NEXT_PUBLIC_STATIC}/assets/tiny/icon_foot_64.png`} />
          </a>
          <a className={`col col-auto ${lemonItems.find(item => item.type == 'back') ? 'enabled' : 'disabled' } ${ currentItemsFilter == 'back' ? 'active' : '' }`} href={'#'} onClick={filterOutifts('back')}>
            <img src={`${process.env.NEXT_PUBLIC_STATIC}/assets/tiny/icon_back_128.png`} />
          </a>
          <a className={`col col-auto ${lemonItems.find(item => item.type == 'fire_arms') ? 'enabled' : 'disabled' } ${ currentItemsFilter == 'fire_arms' ? 'active' : '' }`} href={'#'} onClick={filterOutifts('fire_arms')}>
            <img src={`${process.env.NEXT_PUBLIC_STATIC}/assets/tiny/icon_hand_r_64.png`} />
          </a>
          <a className={`col col-auto ${lemonItems.find(item => item.type == 'cold_arms') ? 'enabled' : 'disabled' } ${ currentItemsFilter == 'cold_arms' ? 'active' : '' }`} href={'#'} onClick={filterOutifts('cold_arms')}>
            <img src={`${process.env.NEXT_PUBLIC_STATIC}/assets/tiny/icon_cold_arms_64.png`} />
          </a>
        </div>}
      </div>
    </TabsLayout>
  </>)
}