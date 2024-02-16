import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import Lemon from '../evm-contracts/artifacts/contracts/Lemons.sol/Lemons.json'
import Item from '../evm-contracts/artifacts/contracts/Items.sol/Items.json'
import Gem from '../evm-contracts/artifacts/contracts/Gem.sol/Gem.json'
import Box from '../evm-contracts/artifacts/contracts/Box.sol/Box.json'
import PickAxe from '../evm-contracts/artifacts/contracts/PickAxe.sol/PickAxe.json'
import Points from '../evm-contracts/artifacts/contracts/Points.sol/Points.json'
import Stickers from '../evm-contracts/artifacts/contracts/Stickers.sol/Stickers.json'
import Referral from '../evm-contracts/artifacts/contracts/Referral.sol/Referral.json'
import Cap from '../evm-contracts/artifacts/contracts/merch/Cap.sol/Cap.json'
import Shirt from '../evm-contracts/artifacts/contracts/merch/Shirt.sol/Shirt.json'
import Hoodie from '../evm-contracts/artifacts/contracts/merch/Hoodie.sol/Hoodie.json'
import Raids from '../evm-contracts/artifacts/contracts/Raids.sol/Raids.json'
import { Abi } from 'viem'

export default defineConfig({
  out: 'hooks/generated.ts',
  contracts: [
    {
      name: 'Lemon',
      abi: Lemon.abi as Abi,
    },
    {
      name: 'Item',
      abi: Item.abi as Abi,
    },
    {
      name: 'Gem',
      abi: Gem.abi as Abi,
    },
    {
      name: 'PickAxe',
      abi: PickAxe.abi as Abi,
    },
    {
      name: 'Box',
      abi: Box.abi as Abi,
    },
    {
      name: 'Point',
      abi: Points.abi as Abi,
    },
    {
      name: 'Sticker',
      abi: Stickers.abi as Abi,
    },
    {
      name: 'Referral',
      abi: Referral.abi as Abi,
    },
    {
      name: 'Cap',
      abi: Cap.abi as Abi,
    },
    {
      name: 'Shirt',
      abi: Shirt.abi as Abi,
    },
    {
      name: 'Hoodie',
      abi: Hoodie.abi as Abi,
    },
    {
      name: 'Raids',
      abi: Raids.abi as Abi,
    }
  ],
  plugins: [
    react({
      // usePrepareContractWrite: false,
      // usePrepareContractFunctionWrite: false
    })
  ],
})
