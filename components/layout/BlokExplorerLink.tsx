import { blockExplorer, truncate } from "utils/misc";

export default function BlokExplorerLink({ address, num, chain_id }: { address: string | undefined, num: number, chain_id: number | undefined }) {
  return (<>
    {chain_id ? <a href={`${blockExplorer[chain_id]}/address/${address}`} target='_blank' style={{color: '#fff', textDecoration: 'underline'}}>{truncate(address, num)}</a> :
    <>{truncate(address, num)}</>}
  </>
  );
}