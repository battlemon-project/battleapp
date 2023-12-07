import Link from "next/link";
import { PropsWithChildren } from "react";
import cn from 'classnames'
import { useRouter } from "next/router";
import styles from '../inventory.module.css'

export default function TabsLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  return <div className={cn('rounded-4', styles.inventoryBg)}>
    <div className={cn('d-flex', styles.inventoryTabs)}>
      <Link className={cn(styles.inventoryTabLink, { [styles.linkActive]: router.pathname.startsWith("/hub/lemons")})} href="/hub/lemons">
        Lemons
      </Link>
      <Link className={cn(styles.inventoryTabLink, { [styles.linkActive]: router.pathname.startsWith("/hub/items")})} href="/hub/items">
        Items
      </Link>
    </div>
    {children}
  </div>
}