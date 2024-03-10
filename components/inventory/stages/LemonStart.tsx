import TabsLayout from "../layout/TabsLayout";
import TokensList from "../layout/TokensList";
import styles from '../inventory.module.css'
import cn from 'classnames';
import Link from "next/link";
import { useLemonStore } from "../store/lemonStore";
import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "utils/fetcher";
import LemonStartDungeonButton from "../buttons/LemonStartDungeonButton";
import LemonDungeonButton from "../buttons/LemonDungeonButton";


interface LemonStartProps {
  balance: number
  contract: string,
  chainId: number
}

export default function LemonStart({ balance, contract, chainId }: LemonStartProps) {
  const { selectedLemons, selectLemon, changeStage, stage } = useLemonStore();

  const { data, mutate, isValidating } = useSWR(
    contract, 
    fetcher({ type: 'lemon', pageSize: 100, chainId })
  )

  useEffect(() => {
    if (stage !== 'Start') return;
    mutate();
  }, [stage])
  
  return (<>
    <TabsLayout>
      <TokensList tokens={data?.tokens} colWidth={25} height={410} selectedTokens={selectedLemons} onClick={selectLemon} isValidating={isValidating} contract={contract} isNextPage={!!data?.pageKey} withGenerator={true} chainId={chainId} />
    </TabsLayout>
    {!data?.tokens?.length && <>
      <div className="col-12 mt-2">
        <Link href="/shop" className="btn btn-lg btn-default fs-14 text-uppercase w-100">
          Buy Box in the Shop
        </Link>
      </div>
    </>}
    {!!data?.tokens?.length && <div className={styles.inventoryButtonsRow}>
      <div className='row gx-2'>
        <div className="col-6 col-lg-4 mt-2 d-flex">
          <button className={cn("btn btn-lg btn-default fs-13 text-uppercase w-100", { disabled: !selectedLemons.length })} onClick={() => changeStage('AllItems')}>Inventory</button>
        </div>
        <div className="col-6 col-lg-4 mt-2 d-flex">
          <button className={cn("btn btn-lg btn-default fs-13 text-uppercase w-100", { disabled: !selectedLemons.length })} onClick={() => changeStage('Gems')}>Level up</button>
        </div>
        <div className="col-6 col-lg-4 mt-2 d-flex">
          {selectedLemons[0] && !selectedLemons[0]?.dungeonSenderId && <LemonStartDungeonButton lemonId={selectedLemons[0].tokenId} level={0}/>}
          {selectedLemons[0] && !selectedLemons[0]?.dungeonSenderId && <LemonStartDungeonButton lemonId={selectedLemons[0].tokenId} level={1}/>}
          {selectedLemons[0] && !selectedLemons[0]?.dungeonSenderId && <LemonStartDungeonButton lemonId={selectedLemons[0].tokenId} level={2}/>}
          {selectedLemons[0] && selectedLemons[0]?.dungeonSenderId && <LemonDungeonButton lemonId={selectedLemons[0].tokenId} key={selectedLemons[0].tokenId} />}
          {!selectedLemons[0] && <button className="btn btn-lg btn-default fs-13 text-uppercase w-100 disabled">Dungeon</button>}
        </div>
        <div className="col-6 col-lg-4 mt-2 d-flex">
          <Link href="/shop" className="btn btn-lg btn-default fs-13 text-uppercase w-100">Buy Box</Link>
        </div>
        <div className="col-6 col-lg-4 mt-2 d-flex">
          <Link target="_blank" href={`https://dew.gg/sell?contract=${contract}`} className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100', { disabled: !selectedLemons[0]})}>Sell</Link>
        </div>
        <div className="col-6 col-lg-4 mt-2 d-flex">
          <button className={cn('btn btn-lg btn-default fs-13 text-uppercase w-100', { disabled: !selectedLemons[0]})} onClick={() => changeStage('Bridge')}>Bridge</button>
        </div>
      </div>
    </div>}
  </>)
}