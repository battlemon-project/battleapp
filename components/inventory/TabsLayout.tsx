import Link from "next/link";
import { PropsWithChildren } from "react";
import cn from 'classnames'
import { useRouter } from "next/router";
import styles from './inventory.module.css'

export default function TabsLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  return <div className={cn('rounded-4', styles.inventoryContainer)}>
    <div className={cn('d-flex', styles.inventoryTabs)}>
      <Link className={cn(styles.inventoryTabLink, { [styles.linkActive]: router.pathname.startsWith("/hub/lemons")})} href="/hub/lemons">
        <img src="/images/hub/tab_lemons.png" />
      </Link>
      <Link className={cn(styles.inventoryTabLink, { [styles.linkActive]: router.pathname.startsWith("/hub/items")})} href="/hub/items">
        <img src="/images/hub/tab_items.png" />
      </Link>
      <Link className={cn(styles.inventoryTabLink, { [styles.linkActive]: router.pathname.startsWith("/hub/gems")})} href="/hub/gems">
        <img src="/images/hub/tab_gems.png" />
      </Link>
    </div>
    {children}
  </div>
}