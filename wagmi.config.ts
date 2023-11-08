import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import Gem from '../evm-contracts/artifacts/contracts/Gem.sol/Gem.json'
import Lemon from '../evm-contracts/artifacts/contracts/Lemons.sol/Lemons.json'
import Item from '../evm-contracts/artifacts/contracts/Items.sol/Items.json'
import { Abi } from 'viem'

export default defineConfig({
  out: 'hooks/generated.ts',
  contracts: [
    {
      name: 'Gem',
      abi: Gem.abi as Abi,
    },
    {
      name: 'Lemon',
      abi: Lemon.abi as Abi,
    },
    {
      name: 'Item',
      abi: Item.abi as Abi,
    }
  ],
  plugins: [
    react()
  ],
})
