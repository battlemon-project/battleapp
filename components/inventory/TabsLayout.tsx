import Link from "next/link";
import { PropsWithChildren } from "react";
import cn from 'classnames'
import { useRouter } from "next/router";

export default function TabsLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  return <div>
    <ul className="nav nav-pills">
      <li className="nav-item">
        <Link className={cn("nav-link", { active: router.pathname.startsWith("/hub/lemons")})} href="/hub/lemons">Lemons</Link>
      </li>
      <li className="nav-item">
        <Link className={cn("nav-link", { active: router.pathname.startsWith("/hub/items")})} href="/hub/items">Items</Link>
      </li>
      <li className="nav-item">
        <Link className={cn("nav-link", { active: router.pathname.startsWith("/hub/gems")})} href="/hub/gems">Gems</Link>
      </li>
    </ul>
    {children}
  </div>
}