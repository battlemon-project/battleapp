import { MouseEventHandler, PropsWithChildren } from "react";
import cn from 'classnames'
import styles from '../inventory.module.css'
import { useLemonStore } from "../store/lemonStore";

interface TabsLayout {
  disableMenu?: boolean
}

export default function TabsLemonItems({ children }: PropsWithChildren<TabsLayout>) {
  const { stage, changeStage } = useLemonStore();

  const handleChangeStage = (_stage: typeof stage): MouseEventHandler => (e) => {
    e.preventDefault();
    changeStage(_stage);
  }

  return <div className={cn('rounded-4', styles.inventoryBg)}>
    <div className={cn('d-flex', styles.inventoryTabs)}>
      <a className={cn(styles.inventoryTabLink, { [styles.linkActive]: stage == 'AllItems' })} href="" onClick={handleChangeStage('AllItems')}>
        All Items
      </a>
      <a className={cn(styles.inventoryTabLink, { [styles.linkActive]: stage == 'EquipedItems' })} href="" onClick={handleChangeStage('EquipedItems')}>
        Equiped
      </a>
    </div>
    
    {children}
  </div>
}