import TokensList from "../layout/TokensList";
import TabsLayout from '../layout/TabsLayout';
import { NftMetaData } from 'lemon';

interface MemoryStartProps {
  chainId: number,
  balance: number
}

export default function MemoryStart({ chainId, balance }: MemoryStartProps) {

  const tokens: NftMetaData[] = balance ? [
    {
      tokenId: 0,
      image: '/images/lineapark.jpg',
      properties: { dna: '', type: '', traits: {}, items: {}, name: '', dress: [], agility: 3, speed: 3, luck: 3, level: 1 }
    }
  ] : []
    
  return (<>
    <TabsLayout>
      <TokensList tokens={tokens} colWidth={33} height={410} selectedTokens={[]} onClick={() => {}} isValidating={false} contract={undefined} isNextPage={false} chainId={chainId} />
    </TabsLayout>
  </>)
}