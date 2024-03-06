import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import Lemon from '../evm-contracts/artifacts/contracts/Battlemon.sol/Battlemon.json'
import Item from '../evm-contracts/artifacts/contracts/BattlemonItems.sol/BattlemonItems.json'
import Gem from '../evm-contracts/artifacts/contracts/BattlemonGem.sol/BattlemonGem.json'
import Box from '../evm-contracts/artifacts/contracts/BattlemonBox.sol/BattlemonBox.json'
import PickAxe from '../evm-contracts/artifacts/contracts/BattlemonPickaxe.sol/BattlemonPickaxe.json'
import Points from '../evm-contracts/artifacts/contracts/BattlemonPoints.sol/BattlemonPoints.json'
import Stickers from '../evm-contracts/artifacts/contracts/BattlemonStickers.sol/BattlemonStickers.json'
import Referral from '../evm-contracts/artifacts/contracts/BattlemonReferral.sol/BattlemonReferral.json'
import Cap from '../evm-contracts/artifacts/contracts/merch/Cap.sol/BattlemonCap.json'
import Shirt from '../evm-contracts/artifacts/contracts/merch/Shirt.sol/BattlemonShirt.json'
import Hoodie from '../evm-contracts/artifacts/contracts/merch/Hoodie.sol/BattlemonHoodie.json'
import Raids from '../evm-contracts/artifacts/contracts/BattlemonRaids.sol/BattlemonRaids.json'
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
