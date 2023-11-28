import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import Gem from '../evm-contracts/artifacts/contracts/Gem.sol/Gem.json'
import Lemon from '../evm-contracts/artifacts/contracts/Lemons.sol/Lemons.json'
import Item from '../evm-contracts/artifacts/contracts/Items.sol/Items.json'
import Box from '../evm-contracts/artifacts/contracts/Box.sol/Box.json'
import PickAxe from '../evm-contracts/artifacts/contracts/PickAxe.sol/PickAxe.json'
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
    },
    {
      name: 'PickAxe',
      abi: PickAxe.abi as Abi,
    },
    {
      name: 'Box',
      abi: Box.abi as Abi,
    }
  ],
  plugins: [
    react({
      // usePrepareContractWrite: false,
      // usePrepareContractFunctionWrite: false
    })
  ],
})
