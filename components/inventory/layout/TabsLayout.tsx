import Link from "next/link";
import { PropsWithChildren } from "react";
import cn from 'classnames'
import { useRouter } from "next/router";
import styles from '../inventory.module.css'

interface TabsLayout {
  disableMenu?: boolean
}

export default function TabsLayout({ children, disableMenu }: PropsWithChildren<TabsLayout>) {
  const router = useRouter();

  return <div className={cn('rounded-4', styles.inventoryBg)}>
    {!disableMenu && <div className={cn('d-flex', styles.inventoryTabs)}>
      <Link className={cn(styles.inventoryTabLink, { [styles.linkActive]: router.pathname.startsWith("/hub/lemons")})} href="/hub/lemons">
        Lemons
      </Link>
      <Link className={cn(styles.inventoryTabLink, { [styles.linkActive]: router.pathname.startsWith("/hub/items")})} href="/hub/items">
        Items
      </Link>
      <Link className={cn(styles.inventoryTabLink, { [styles.linkActive]: router.pathname.startsWith("/hub/pickaxes")})} href="/hub/pickaxes">
        Pickaxes
      </Link>
    </div>}
    {children}
  </div>
}